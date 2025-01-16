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
            return self.es.get(index="candidates-dev", id=id).get("_source")
        except Exception as e:
            print(f"Error retrieving document: {e}")
            return {}

    def retrieve_user_level_2_cv(self, id):
        return self.es.get(index='candidates-dev', id=id).get('_source')['level_two_data']

    def chat_gpt(self, prompt):
        try:
            response = self.client.chat.completions.create(
            model="o1",
            messages=[
                    {
                    "role": "system",
                    "content": (
                        "You are a helper that maps user queries to the `level_two_data` (L2) fields and `key_metrics` fields in our CV schema. "
                        "Return a JSON with EXACTLY TWO TOP-LEVEL KEYS: 'l2' and 'key_metrics'. Both 'l2' and 'key_metrics' must be objects.\n\n"
                        
                        "============================================================\n"
                        "IMPORTANT:\n"
                        "1) ANY query related to current employment, work, or job roles should be looked at comprehensively across the following:\n"
                        "   - ALL available publication types (`journal_publications`, `book_publications`, `other_publications`)\n"
                        "   - `grant_research` category\n"
                        "   - Relevant fields in `career_item`.\n"
                        "This ensures we map the intent to all possible fields that may pertain to employment or research roles.\n"
                        "2) If user intent includes references to years of experience, employment, or location, always include `key_metrics.yoe` and `key_metrics.location` fields.\n\n"
                        
                        "============================================================\n"
                        "CORRECT EXAMPLES (MULTIPLE FIELDS):\n"
                        "------------------------------------------------------------\n"
                        "Example with both L2 and key_metrics fields:\n"
                        "{\n"
                        "  \"l2\": {\n"
                        "    \"other_publications.other_publication_end_date\": \"1983\",\n"
                        "    \"other_publications.other_publication_title\": \"Award, award_recognition_national\",\n"
                        "    \"career_item.career_institution\": \"University of Chicago\",\n"
                        "    \"career_item.career_role\": \"Associate Professor\",\n"
                        "    \"education.education_degree\": \"Ph.D.\",\n"
                        "    \"education.education_institution\": \"Mayo Graduate School\"\n"
                        "  },\n"
                        "  \"key_metrics\": {\n"
                        "    \"location\": \"US\",\n"
                        "    \"yoe\": 10\n"
                        "  }\n"
                        "}\n\n"
                        
                        "Example with multiple publication types:\n"
                        "{\n"
                        "  \"l2\": {\n"
                        "    \"journal_publications.journal_publication_title\": [\"Gene Therapy Research\"],\n"
                        "    \"journal_publications.journal_publication_date\": \"2019\",\n"
                        "    \"book_publications.book_publication_title\": [\"Gene Therapy Research\"],\n"
                        "    \"other_publications.other_publication_title\": [\"Gene Therapy Research\"],\n"
                        "    \"education.education_degree\": \"MD\",\n"
                        "    \"career_item.career_institution\": \"Johns Hopkins University\"\n"
                        "  },\n"
                        "  \"key_metrics\": {\n"
                        "    \"location\": \"DE\",\n"
                        "    \"yoe\": 8\n"
                        "  }\n"
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
                        "KEY METRICS FIELDS: key_metrics\n"
                        "------------------------------------------------------------\n"
                        "Below are the `key_metrics` fields:\n\n"
                        "yoe:\n"
                        "  - Type: integer\n"
                        "  - Example: key_metrics.yoe = 10\n\n"
                        "location:\n"
                        "  - Type: text with keyword field\n"
                        "  - ONLY USE the country code (not full country name)\n"
                        "  - Example: key_metrics.location = 'US'\n\n"
                        
                        "============================================================\n"
                        "RULES:\n"
                        "1) Return strictly valid JSON with exactly two top-level keys: 'l2' and 'key_metrics'.\n"
                        "2) Include all applicable `key_metrics` fields when the user specifies years of experience (yoe), or location.\n"
                        "3) Use the `key_metrics.location` field as the country code (e.g., 'US', not 'United States').\n"
                        "4) For publication types (e.g., journal, book, other, grant_research), if the user specifies one type, add equivalent keys for other types to ensure comprehensive mapping.\n"
                        "5) Combine multiple references in the user prompt into multiple keys and include additional relevant fields.\n"
                        "6) Each key in 'l2' must follow the format: <CATEGORY>.<SUBFIELD> (e.g., 'career_item.career_institution').\n"
                        "7) If the user uses words like 'over', 'at least', or 'more than' for yoe, convert these into exact numbers and include them (e.g., 10 for 'over 10 years').\n"
                        "8) Map ambiguous terms as broadly as possible across the schema to improve search coverage.\n"
                        "9) Do not include unrelated fields or extra words in the values.\n"
                        "10) Always include separate fields for each matching category (e.g., all relevant types of publications).\n"
                        "11) If the query requires career_role, then also include the same value for that field accross all publication types (journal, book, other).\n"
                        "12) Add additional values for some fields to improve search of the query intent (i.e. if looking for a neurosurgeon, add several keywords in publications to cover the same field like neurosurgery and brain surgery, ...).\n"
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
            response = self.es.search(index="candidates-dev", body=query, size=10000)
            return response
        except Exception as e:
            print(f"Error searching documents: {e}")
            return {}


    def search_by_field(self, field, value, key_metrics):
        """
        Search for documents in Elasticsearch by a given field and value, 
        incorporating additional filters for key_metrics. 
        If field or value is None, the query will only include key_metrics.
        """
        fuzzy_search_fields = ["career_item.career_role", "education.education_degree", "grant_research.grant_title", 
                        "other_publications.other_publication_title", "journal_publications.journal_publication_title", 
                        "book_publications.book_publication_title", "education.education_department"]
        try:
            key_metrics_filters = []
            if key_metrics:
                if "yoe" in key_metrics:
                    key_metrics_filters.append({
                        "range": {
                            "key_metrics.yoe": {
                                "gte": key_metrics["yoe"]
                            }
                        }
                    })
                if "location" in key_metrics:
                    key_metrics_filters.append({
                        "term": {
                            "key_metrics.location.keyword": key_metrics["location"]
                        }
                    })
            print(key_metrics_filters)
            # If field or value is None, return a query with only key_metrics filters
            if field is None or value is None:
                if not key_metrics_filters:
                    return []  # No query can be constructed
                query = {
                    "query": {
                        "bool": {
                            "must": key_metrics_filters
                        }
                    }
                }
                response = self.search(query)
                return [hit['_source'] for hit in response.get('hits', {}).get('hits', [])]

            # Build the query for the provided field
            nested_path = ".".join(field.split(".")[:-1])


            print(field.split(".")[-1])
            if field in fuzzy_search_fields:
                # Use fuzzy search for allowed fields
                if isinstance(value, list):
                    query = {
                        "query": {
                            "bool": {
                                "must": key_metrics_filters + [
                                    {
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
                                                                    "operator": "and"
                                                                }
                                                            }
                                                        } for v in value
                                                    ],
                                                    "minimum_should_match": 1
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                else:
                    query = {
                        "query": {
                            "bool": {
                                "must": key_metrics_filters + [
                                    {
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
                                ]
                            }
                        }
                    }
            else:
                # Use match_phrase for exact matches for all other fields
                if isinstance(value, list):
                    query = {
                        "query": {
                            "bool": {
                                "must": key_metrics_filters + [
                                    {
                                        "nested": {
                                            "path": nested_path,
                                            "query": {
                                                "bool": {
                                                    "should": [
                                                        {
                                                            "match_phrase": {
                                                                field: {
                                                                    "query": v
                                                                }
                                                            }
                                                        } for v in value
                                                    ],
                                                    "minimum_should_match": 1
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                else:
                    query = {
                        "query": {
                            "bool": {
                                "must": key_metrics_filters + [
                                    {
                                        "nested": {
                                            "path": nested_path,
                                            "query": {
                                                "match_phrase": {
                                                    field: {
                                                        "query": value
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
            # Execute the search query
            response = self.search(query)
            return [hit['_source'] for hit in response.get('hits', {}).get('hits', [])]

        except Exception as e:
            print(f"Error searching by field '{field}': {e}")
            return []


    def search_with_prompt(self, prompt):

        sort_prestige = True
        try:
            parsed_fields = self.chat_gpt(prompt)

            key_metrics = parsed_fields.get("key_metrics", {})
            l2_fields = parsed_fields.get("l2", {})

            if not l2_fields and not key_metrics:
                print("No valid fields parsed from the prompt.")
                return []
            field_matches = {}

            if not l2_fields:
                documents = self.search_by_field(None, None, key_metrics)
                for doc in documents:
                    doc_id = doc.get("data", {}).get("orcid_id")
                    if doc_id not in field_matches:
                        field_matches[doc_id] = {"document": doc, "matched_fields": set()}
                return documents

            if l2_fields.get('education.education_institution') is not None:
                sort_prestige = True

            for field, value in l2_fields.items():
                print(value)
                if '[' in value and ']' in value:
                    value = list(map(str.strip, value[1:-1].split(',')))
                print(type(value))
                documents = self.search_by_field(f"level_two_data.{field}", value, key_metrics)
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
                doc["matched"] = matched_fields_count + doc.get('key_metrics', {}).get('prestige_score', 0) if sort_prestige else matched_fields_count

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
        
# if __name__ == '__main__':
#     ps = PeopleSearch()
#     prompt = "I am looking  for someone with over 10 years of experience who is currently in america and graduated from harvard or MIT and works as a neurosurgeon"
#     results = ps.search_with_prompt(prompt)
#     print("FINAL SEARCH RESULTS:", len(results))
#     with open("l2_results.json", "w") as file:
#         json.dump(results, file, indent=2)