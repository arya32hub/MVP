from search.search import Search
import json
import re
import concurrent.futures

class PeopleSearch(Search):
    def __init__(self):
        super().__init__()

    def create_index(self):
        """
        Implementation of the abstract method to create an index.
        """
        print("Creating an index... (dummy implementation)")

    def retrieve_document(self, id):
        """
        Implementation of the abstract method to retrieve a document by ID.
        """
        try:
            return self.es.get(index="candidates", id=id).get("_source")
        except Exception as e:
            print(f"Error retrieving document: {e}")
            return {}

    def retrieve_user_level_2_cv(self, id):
        return self.es.get(index='candidates', id=id).get('_source')['level_two_data']

    def chat_gpt(self, prompt):
        try:
            response = self.client.chat.completions.create(
                model="chatgpt-4o-latest",
                messages=[
                   {
                    "role": "system",
                    "content": (
                        "You are a helper that takes a user prompt and maps it to the level_two_data (L2) fields in our CV schema. "
                        "Return a JSON with EXACTLY ONE TOP-LEVEL KEY: 'l2'. The value of 'l2' must be an object.\n\n"

                        "============================================================\n"
                        "CORRECT EXAMPLES (MANY FIELDS):\n"
                        "------------------------------------------------------------\n"
                        "Single fields:\n"
                        "{\n"
                        "  \"l2\": {\n"
                        "    \"other_publications.other_publication_end_date\": \"1983\",\n"
                        "    \"other_publications.other_publication_title\": \"Award, award_recognition_national\",\n"
                        "    \"career_item.career_institution\": \"University of Chicago\",\n"
                        "    \"career_item.career_role\": \"Associate Professor\",\n"
                        "    \"education.education_degree\": \"Ph.D.\",\n"
                        "    \"education.education_institution\": \"Mayo Graduate School\"\n"
                        "  }\n"
                        "}\n\n"

                        "Multiple fields:\n"
                        "{\n"
                        "    \"l2\": {\n"
                        "        \"journal_publications.journal_publication_title\": [\"Gene Therapy Research\", \"],\n"
                        "        \"journal_publications.journal_publication_date\": \"2019\",\n"
                        "        \"education.education_degree\": \"MD\",\n"
                        "        \"career_item.career_institution\": \"Johns Hopkins University\"\n"
                        "    }\n"
                        "}\n\n"

                        "============================================================\n"
                        "L2 FIELDS (inside 'level_two_data.<FIELD_NAME>'): \n"
                        "------------------------------------------------------------\n"
                        "Below are the top-level category names and example subfields:\n\n"

                        "other_publications:\n"
                        "  - publication_title (str)\n"
                        "  - publication_end_date (str)\n"
                        "  - publication_type (str)\n"
                        "  - publication_publisher (str)\n"
                        "  - publication_identifier (str)\n\n"

                        "education:\n"
                        "  - education_institution (str)    <== can be a list if user said 'Harvard and MIT'\n"
                        "  - education_city (str)\n"
                        "  - education_state (str)\n"
                        "  - education_country_state_city (str)\n"
                        "  - education_department (str)\n"
                        "  - education_degree (str)\n"
                        "  - education_start_date (object)\n"
                        "  - education_end_date (object)\n\n"

                        "career_item:\n"
                        "  - career_institution (str)\n"
                        "  - career_city (str)\n"
                        "  - career_state (str)\n"
                        "  - career_country_state (str)\n"
                        "  - career_role (str)\n"
                        "  - career_start_date (object)\n"
                        "  - career_end_date (object)\n\n"

                        "grant_research:\n"
                        "  - grant_title (str)\n"
                        "  - grant_agency (str)\n"
                        "  - grant_start_date (object)\n"
                        "  - grant_end_date (object)\n\n"

                        "journal_publications:\n"
                        "  - journal_publication_title (str)\n"
                        "  - journal_publication_date (object)\n"
                        "  - journal_publication_name (str)\n\n"

                        "book_publications:\n"
                        "  - book_publication_title (str)\n"
                        "  - book_publication_bookname (str)\n"
                        "  - book_publication_end_date (object)\n"
                        "  - book_publication_publisher (str)\n\n"

                        "reviewer_role:\n"
                        "  - reviewer_role (str)\n"
                        "  - reviewer_end_date (object)\n"
                        "  - reviewer_organization (str)\n\n"

                        "============================================================\n"
                        "RULES:\n"
                        "1) Return strictly valid JSON with exactly one top-level key: 'l2'.\n"
                        "2) Each key must be <CATEGORY>.<SUBFIELD>, e.g. 'other_publications.other_publication_end_date'.\n"
                        "3) Apply to as many as applies of book_publications, journal_publications, and other_publications. \n"
                        "   (If the user explicitly mentions a second publication type, choose the most relevant single type for their request.)\n"
                        "4) Combine multiple references in the user prompt into multiple keys.\n"
                        "5) Never return a single big string in 'l2'. Each field must be an individual key-value.\n"
                        "6) Include only terms that are essential for searching (e.g., 'breast cancer' instead of 'research on breast cancer').\n"
                        "7) Use correct institution or city names (no abbreviations like 'UChicago').\n"
                        "8) Do not include extra words in the value, only relevant for the search.\n"
                        "9) To improve search, add additional keywords similar to the user search for all experience or research related topics.\n"
                        "9) Any work or experience topic or research-related phrase must be placed in a publication and 'grant_research' field and 'career_iterm' field.\n"
                        "10) A single field can hold several comma-separated or array-based entries if the user says 'and.' E.g.\n"
                        "    education.education_institution: [\"Harvard University\", \"Massachusetts Institute of Technology\"]\n\n"
                        "11) Write as many fields as possible to improve the search results.\n"
                    )
                    }
                    ,
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )
            gpt_return = response.choices[0].message.content
            start_json = gpt_return.find("{")
            end_json = gpt_return.rfind("}") + 1 
            gpt_return = gpt_return[start_json:end_json]
            print("GPT response:", response.choices[0].message.content)

            parsed_fields = json.loads(gpt_return)

            if not isinstance(parsed_fields, dict):
                print("GPT response is not a valid dictionary.")
                return {}

            if "l2" not in parsed_fields:
                parsed_fields["l2"] = {}
            elif not isinstance(parsed_fields["l2"], dict):
                parsed_fields["l2"] = {}

            return parsed_fields

        except json.JSONDecodeError:
            print("Error parsing GPT response. Ensure GPT returns valid JSON.")
            return {}
        except Exception as e:
            print(f"Error in chat_gpt: {e}")
            return {}



    def search(self, query):
        try:
            response = self.es.search(index="candidates", body=query, size=10000)
            return response
        except Exception as e:
            print(f"Error searching documents: {e}")
            return {}

    def search_all_data(self):
        try:
            query = {
                "query": {
                    "match_all": {}
                }
            }


            response = self.search(query)

            if 'hits' in response and 'hits' in response['hits']:
                documents = [hit['_source'] for hit in response['hits']['hits']]
                return documents
            else:
                print("No documents found or unexpected response structure.")
                return []

        except Exception as e:
            print(f"Error retrieving all data: {e}")
            return []

    def detect_publication_type(self, prompt: str) -> str:
        p = prompt.lower()
        if "journal" in p:
            return "journal_publications"
        if "book" in p:
            return "book_publications"
        if "other" in p:
            return "other_publications"
        if "grant" in p:  # <--- allow specifically requesting "grant"
            return "grant_research"
        if "research" in p or "publication" in p or "paper" in p:
            return "all"
        return "all"

    def search_in_level_two_data(self, fields):
        """
        Search for values in one or more fields within `level_two_data`.

        Now supports multiple values for the SAME field:
            e.g. { "education.education_institution": ["Harvard", "MIT"] }
        This will create two `nested` queries in a must array:
            must: [ {match -> "Harvard"}, {match -> "MIT"} ]
        thus requiring BOTH to match in the top-level doc.
        """
        try:
            must_conditions = []

            for field_path, value in fields.items():
                # field_path e.g. "education.education_institution"
                nested_path = field_path.split(".")[0]  # e.g. "education"

                # If 'value' is a list of strings => create multiple must sub-queries
                if isinstance(value, list):
                    for val in value:
                        must_conditions.append({
                            "nested": {
                                "path": f"level_two_data.{nested_path}",
                                "query": {
                                    "match": {
                                        f"level_two_data.{field_path}": {
                                            "query": val,
                                            "fuzziness": "AUTO",
                                            "operator": "and"
                                        }
                                    }
                                }
                            }
                        })
                # If 'value' is a single string
                elif isinstance(value, str):
                    must_conditions.append({
                        "nested": {
                            "path": f"level_two_data.{nested_path}",
                            "query": {
                                "match": {
                                    f"level_two_data.{field_path}": {
                                        "query": value,
                                        "fuzziness": "AUTO",
                                        "operator": "and"
                                    }
                                }
                            }
                        }
                    })
                else:
                    print(f"Ignoring field '{field_path}' because its value is neither list nor string: {value}")

            # Build final bool query
            query = {
                "query": {
                    "bool": {
                        "must": must_conditions
                    }
                }
            }

            response = self.search(query)

            # Parse and return the results
            if 'hits' in response and 'hits' in response['hits']:
                return [hit['_source'] for hit in response['hits']['hits']]
            else:
                print("No documents found for the given fields in level_two_data.")
                return []

        except Exception as e:
            print(f"Error during search_in_level_two_data: {e}")
            return []

    def search_with_prompt(self, prompt):
        """
        If detect_publication_type == 'all', replicate the parsed publication fields
        across multiple publication categories (journal, book, other),
        while still including the non-publication fields (like career_item, education, etc.)
        in each search. Then combine results.
        """
        try:
            publication_type = self.detect_publication_type(prompt)
            parsed_fields = self.chat_gpt(prompt)

            print("Parsed fields (GPT):", parsed_fields)

            if not parsed_fields or "l2" not in parsed_fields or not parsed_fields["l2"]:
                print("No valid fields parsed from the prompt.")
                return []

            publication_prefixes = {"journal_publications", "book_publications", "other_publications", "grant_research"}

            publication_fields = {}     # e.g. "journal_publications.journal_publication_title": "Breast cancer"
            non_publication_fields = {} # e.g. "career_item.career_institution": "Harvard Medical School"

            for field_path, value in parsed_fields["l2"].items():
                top_category = field_path.split(".")[0]  # e.g. "career_item"
                if top_category in publication_prefixes:
                    publication_fields[field_path] = value
                else:
                    non_publication_fields[field_path] = value


            if publication_type != "all":
                print(f"\nUser specifically mentioned '{publication_type}'; searching only in that category.\n")

                l2_results = self.search_in_level_two_data(parsed_fields["l2"])
                print(f"L2 results: Found {len(l2_results)} documents for {publication_type}.")
                return l2_results

            print("\nUser was vague => replicate across [journal_publications, book_publications, other_publications].\n")

            subfield_map = {
                "journal_publications": "journal_publication_title",
                "book_publications": "book_publication_title",
                "other_publications": "publication_title",
                "grant_research": "grant_title"
            }

            categories = list(subfield_map.keys())
            all_combined_results = []

            pub_values = list(publication_fields.values())

            for cat in categories:
                l2_for_cat = dict(non_publication_fields)


                for pub_val in pub_values:
                    new_key = f"{cat}.{subfield_map[cat]}"
                    l2_for_cat[new_key] = pub_val

                cat_results = self.search_in_level_two_data(l2_for_cat)
                print(f"  -> Found {len(cat_results)} docs for {cat}")
                all_combined_results.extend(cat_results)

            unique_docs = {
                json.dumps(doc, sort_keys=True): doc
                for doc in all_combined_results
            }
            final_results = list(unique_docs.values())

            print(f"\nCombined L2 results: Found {len(final_results)} unique documents across all publication types.")
            return final_results

        except Exception as e:
            print(f"Error in search_with_prompt: {e}")
            return []
        
    def search_by_field(self, field, value):
        try:
            nested_path = ".".join(field.split(".")[:-1])

            # Specialized handling for education institution and other sensitive fields
            if "education_institution" in field:
                if isinstance(value, list):
                    query = {
                        "query": {
                            "nested": {
                                "path": nested_path,
                                "query": {
                                    "bool": {
                                        "should": [
                                            {
                                                "match_phrase": {
                                                    field: {
                                                        "query": v,
                                                        "slop": 2  # Allow reordering
                                                    }
                                                }
                                            } for v in value
                                        ],
                                        "minimum_should_match": 1
                                    }
                                }
                            }
                        }
                    }
                else:
                    query = {
                        "query": {
                            "nested": {
                                "path": nested_path,
                                "query": {
                                    "bool": {
                                        "must": {
                                            "match_phrase": {
                                                field: {
                                                    "query": value,
                                                    "slop": 2
                                                }
                                            }
                                        },
                                        "should": {
                                            "match": {
                                                field: {
                                                    "query": value,
                                                    "fuzziness": "AUTO"
                                                }
                                            }
                                        },
                                        "minimum_should_match": 1
                                    }
                                }
                            }
                        }
                    }
            else:  # Default behavior for other fields
                if isinstance(value, list):
                    query = {
                        "query": {
                            "nested": {
                                "path": nested_path,
                                "query": {
                                    "bool": {
                                        "should": [
                                            {
                                                "match": {
                                                    field: {
                                                        "query": v,
                                                        "fuzziness": "AUTO",
                                                        "operator": "or"
                                                    }
                                                }
                                            } for v in value
                                        ],
                                        "minimum_should_match": 1
                                    }
                                }
                            }
                        }
                    }
                else:
                    query = {
                        "query": {
                            "nested": {
                                "path": nested_path,
                                "query": {
                                    "match": {
                                        field: {
                                            "query": value,
                                            "fuzziness": "AUTO",
                                            "operator": "and"
                                        }
                                    }
                                }
                            }
                        }
                    }

            response = self.search(query)
            return [hit['_source'] for hit in response.get('hits', {}).get('hits', [])]

        except Exception as e:
            print(f"Error searching by field '{field}': {e}")
            return []



    def search_with_prompt(self, prompt):
        try:
            parsed_fields = self.chat_gpt(prompt)

            if not parsed_fields or "l2" not in parsed_fields or not parsed_fields["l2"]:
                print("No valid fields parsed from the prompt.")
                return []

            parsed_fields = parsed_fields["l2"]
            field_matches = {}
            # relevant_career_and_publication_fields = [
            #     "career_item.career_institution", 
            #     "career_item.career_role", 
            #     "journal_publications.journal_publication_title",
            #     "book_publications.book_publication_title",
            #     "other_publications.other_publication_title",
            # ]

            # Search each field individually and track matches
            for field, value in parsed_fields.items():
                documents = self.search_by_field(f"level_two_data.{field}", value)
                print(f"Found {len(documents)} documents for field '{field}' with value '{value}'.")
                for doc in documents:
                    doc_id = doc.get("data", {}).get("orcid_id")
                    if doc_id not in field_matches:
                        field_matches[doc_id] = {"document": doc, "matched_fields": set()}
                    field_matches[doc_id]["matched_fields"].add(field)

            print(len(field_matches.keys()), "documents found in total.")
            # Aggregate results and count matches
            primary_results = []  # Matches career/publication fields
            secondary_results = []  # Matches either career or publication fields but not both
            other_results = []  # Matches neither career nor publication fields

            for doc_id, match_info in field_matches.items():
                doc = match_info["document"]
                matched_fields = match_info["matched_fields"]
                matched_fields_count = len(matched_fields)
                doc["matched"] = matched_fields_count

                # Categorize documents based on matched fields
                has_career_match = any(field.startswith("career_item.career_role") for field in matched_fields)
                has_publication_match = any(field.startswith("journal_publications.journal_publication_title") or
                                            field.startswith("book_publications.book_publication_title") or
                                            field.startswith("grant_research.grant_title") or
                                            field.startswith("other_publications.other_publication_title") for field in matched_fields)

                if has_career_match and has_publication_match:
                    primary_results.append(doc)
                elif has_career_match or has_publication_match:
                    secondary_results.append(doc)
                else:
                    other_results.append(doc)

            # Sort each category by number of matched fields in descending order
            primary_results.sort(key=lambda x: x["matched"], reverse=True)
            secondary_results.sort(key=lambda x: x["matched"], reverse=True)
            other_results.sort(key=lambda x: x["matched"], reverse=True)

            # Combine results with primary matches first, then secondary, then others
            print(len(primary_results), "primary results")
            print(len(secondary_results), "secondary results")
            print(len(other_results), "other results")
            results = primary_results + secondary_results + other_results
            return results

        except Exception as e:
            print(f"Error in search_with_prompt: {e}")
            return []