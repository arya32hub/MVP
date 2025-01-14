# from search.search import Search
# import json

# class PeopleSearch(Search):
#     def __init__(self):
#         super().__init__()
#         self.schema = {
#             "book_publication": [],
#             "career_item": [],
#             "contact_address": [],
#             "education": [],
#             "first_name": "",
#             "grant_research": [],
#             "journal_publications": [],
#             "last_name": "",
#             "other_publication": [],
#             "peer_review_publication": [],
#             "research_clinical_experience": [],
#             "reviewer_role": [],
#         }

#     def create_index(self):
#         """
#         Implementation of the abstract method to create an index.
#         """
#         print("Creating an index... (dummy implementation)")

#     def retrieve_document(self, id):
#         """
#         Implementation of the abstract method to retrieve a document by ID.
#         """
#         try:
#             print(f"Attempting to retrieve document with ID: {id}")
#             return self.es.get(index="candidates", id=id).get("_source")
#         except Exception as e:
#             print(f"Error retrieving document: {e}")
#             return {}

#     def chat_gpt(self, prompt):
#         try:
#             print(f"Sending prompt to GPT: {prompt}")
#             response = self.client.chat.completions.create(
#                 model="gpt-4",
#                 messages=[
#                     {"role": "system", "content": f"Break the user's prompt into searchable categories based on this schema: {json.dumps(self.schema)}. Write only the fields names as keys"
#                                                 f"Anything work related should be in career item. Return the result as a JSON dictionary where keys are schema fields and values are search terms. If several values/search terms belong to a key,combine into a single string and put as value. NEVER do lists for values."},
#                     {"role": "user", "content": prompt}
#                 ]
#             )

#             print(f"Received response from GPT: {response.choices[0].message.content}")
#             parsed_fields = json.loads(response.choices[0].message.content)

#             if isinstance(parsed_fields, dict):
#                 print(f"Parsed fields: {parsed_fields}")
#                 return {key: value for key, value in parsed_fields.items() if value}
#             else:
#                 print("GPT response is not a valid dictionary.")
#                 return {}

#         except json.JSONDecodeError:
#             print("Error parsing GPT response. Ensure GPT returns a JSON-like structure.")
#             return {}
#         except Exception as e:
#             print(f"Error in chat_gpt: {e}")
#             return {}

#     def search(self, query):
#         try:
#             print(f"Searching with query: {query}")
#             response = self.es.search(index="candidates", body=query)
#             return response
#         except Exception as e:
#             print(f"Error searching documents: {e}")
#             return {}

#     def search_all_data(self):
#         try:
#             query = {
#                 "query": {
#                     "match_all": {}
#                 }
#             }

#             print("Performing search for all data.")
#             response = self.search(query)

#             if 'hits' in response and 'hits' in response['hits']:
#                 documents = [hit['_source'] for hit in response['hits']['hits']]
#                 print(f"Found {len(documents)} documents.")
#                 return documents
#             else:
#                 print("No documents found or unexpected response structure.")
#                 return []

#         except Exception as e:
#             print(f"Error retrieving all data: {e}")
#             return []

#     def search_by_field(self, field, value):
#         try:
#             query = {
#                 "query": {
#                     "match": {
#                         field: {
#                             "query": value,
#                             "fuzziness": "AUTO",
#                             "operator": "and"
#                         }
#                     }
#                 }
#             }

#             print(f"Performing fuzzy search for field '{field}' with value '{value}'.")
#             response = self.search(query)

#             if 'hits' in response and 'hits' in response['hits']:
#                 documents = [hit['_source'] for hit in response['hits']['hits']]
#                 print(f"Found {len(documents)} documents for field '{field}' with value '{value}'.")
#                 return documents
#             else:
#                 print(f"No documents found for field '{field}' with fuzzy value '{value}'.")
#                 return []

#         except Exception as e:
#             print(f"Error performing fuzzy search by field: {e}")
#             return []

#     def search_by_fields(self, fields):
#         print(fields.keys())
#         try:
#             must_conditions = [
#                 {
#                     "match": {
#                         field: {
#                             "query": value,
#                             "fuzziness": "AUTO",
#                             "operator": "and"
#                         }
#                     }
#                 }
#                 for field, value in fields.items()
#             ]

#             query = {
#                 "query": {
#                     "bool": {
#                         "must": must_conditions
#                     }
#                 }
#             }

#             print(f"Performing multi-field search with conditions: {fields}")
#             response = self.search(query)

#             if 'hits' in response and 'hits' in response['hits']:
#                 documents = [hit['_source'] for hit in response['hits']['hits']]
#                 print(f"Found {len(documents)} documents matching the search criteria.")
#                 return documents
#             else:
#                 print("No documents found for the given fields.")
#                 return []

#         except Exception as e:
#             print(f"Error performing multi-field search: {e}")
#             return []

#     def search_with_prompt(self, prompt):
#         try:
#             print(f"Processing prompt: {prompt}")
#             parsed_fields = self.chat_gpt(prompt)
#             print(f"Parsed fields from GPT: {parsed_fields}")

#             if not parsed_fields:
#                 print("No valid fields parsed from the prompt.")
#                 return []

#             results = self.search_by_fields(parsed_fields)
#             print(f"Search results based on parsed fields: {results}")
#             return results
#         except Exception as e:
#             print(f"Error in search_with_prompt: {e}")
#             return []

# def main():
#     ps = PeopleSearch()

#     prompt = "I am looking for someone who went to Harvard medical school."

#     print("\nProcessing prompt and performing search:")
#     results = ps.search_with_prompt(prompt)

#     with open("prompt_search_results.json", "w") as file:
#         json.dump(results, file, indent=2)

#     print("Results written to prompt_search_results.json")

# if __name__ == "__main__":
#     main()

from search.search import Search
import json
from elasticsearch import Elasticsearch


class PeopleSearch(Search):
    def __init__(self):
        super().__init__()
        self.schema = {
            # "award": [],
            "book_publications": [],
            "career_item": [],
            # "certification_license": [],
            # "committee_associated_board_chair_investigator": [],
            # "community_service": [],
            "contact_address": [],
            "contact_email": [],
            # "contact_phone_number": [],
            "education": [],
            "first_name": "",
            "grant_research": [],
            "journal_publications": [],
            "last_name": "",
            # "leadership_activities": [],
            "middle_name": "",
            "other_publication": [],
            # "peer_review_publication": [],
            # "research_clinical_experience": [],
            "reviewer_role": [],
            # "speaking_engagement_presentations": [],
            # "teaching_lecture_course": []
        }

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
        """
        Return a JSON dict with a single key: 'l2'.
        The 'l2' value must be an object containing individual field-value pairs,
        e.g. {
        "award.award_date": "1983",
        "career_item.career_institution": "Harvard Medical School"
        }
        """
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are a helper that takes a user prompt and maps it to the level_two_data (L2) fields in our CV schema. "
                            "Return a JSON with EXACTLY ONE TOP-LEVEL KEY: 'l2'. The value of 'l2' must be an object.\n\n"

                            "============================================================\n"
                            "CORRECT EXAMPLE (MANY FIELDS):\n"
                            "------------------------------------------------------------\n"
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
                            "WRONG EXAMPLE (STRING INSTEAD OF KEYS):\n"
                            "------------------------------------------------------------\n"
                            "{\n"
                            "  \"l2\": \"other_publications.other_publication_end_date: 1983, career_item.career_institution: University of Chicago\"\n"
                            "}\n\n"
                            "YOU MUST NOT RETURN A SINGLE STRING IN 'l2'. Instead, return a JSON object with separate fields.\n\n"

                            "============================================================\n"
                            "L2 FIELDS (inside 'level_two_data.<FIELD_NAME>'): \n"
                            "------------------------------------------------------------\n"
                            "Below are the top-level category names and example subfields:\n\n"

                            # "1) award\n"
                            # "   - award_date\n"
                            # "   - award_field_subject\n"
                            # "   - award_item\n"
                            # "   - award_name\n"
                            # "   - award_provider_institution_organization\n\n"

                            "1) book_publications\n"
                            # "   - book_publication_author\n"
                            "   - book_publication_bookname\n"
                            # "   - book_publication_chapter\n"
                            # "   - book_publication_edition\n"
                            # "   - book_publication_editor\n"
                            "   - book_publication_end_date\n"
                            # "   - book_publication_end_page\n"
                            # "   - book_publication_identifier\n"
                            # "   - book_publication_issue\n"
                            # "   - book_publication_item\n"
                            "   - book_publication_publisher\n"
                            # "   - book_publication_publisher_city_state\n"
                            # "   - book_publication_start_page\n"
                            "   - book_publication_title\n\n"
                            # "   - book_publication_volume\n\n"

                            "2) career_item\n"
                            "   - career_city\n"
                            "   - career_country_state\n"
                            "   - career_end_date\n"
                            "   - career_institution\n"
                            "   - career_role\n"
                            "   - career_start_date\n\n"
                            # "   - career_sub_department\n"
                            # "   - career_time\n"
                            # "   - career_type\n\n"

                            # "4) certification_license\n"
                            # "   - certification_license_city_state\n"
                            # "   - certification_license_country\n"
                            # "   - certification_license_date_issued\n"
                            # "   - certification_license_date_reissued\n"
                            # "   - certification_license_identification\n"
                            # "   - certification_license_item\n"
                            # "   - certification_license_name\n"
                            # "   - certification_license_provider_institution\n"
                            # "   - certification_license_role\n"
                            # "   - certification_license_start_date\n"
                            # "   - certification_license_title_description\n\n"

                            # "5) committee_associated_board_chair_investigator\n"
                            # "   - committee_end_date\n"
                            # "   - committee_item\n"
                            # "   - committee_name\n"
                            # "   - committee_organization\n"
                            # "   - committee_role\n"
                            # "   - committee_start_date\n"
                            # "   - committee_type\n\n"

                            # "6) community_service\n"
                            # "   - community_service_description\n"
                            # "   - community_service_end_date\n"
                            # "   - community_service_item\n"
                            # "   - community_service_organization\n"
                            # "   - community_service_role\n"
                            # "   - community_service_start_date\n\n"

                            "3) education\n"
                            "   - education_country_state_city\n"
                            "   - education_degree\n"
                            "   - education_department\n"
                            "   - education_end_date\n"
                            # "   - education_field\n"
                            # "   - education_grade_honor\n"
                            "   - education_institution\n"
                            "   - education_start_date\n\n"
                            # "   - education_sub_field\n\n"

                            "4) grant_research\n"
                            "   - grant_agency\n"
                            # "   - grant_amount\n"
                            "   - grant_end_date\n"
                            # "   - grant_item\n"
                            # "   - grant_role\n"
                            "   - grant_start_date\n"
                            "   - grant_title\n\n"

                            "5) journal_publications\n"
                            # "   - journal_publication_author\n"
                            "   - journal_publication_end_date\n"
                            # "   - journal_publication_end_page\n"
                            # "   - journal_publication_identifier\n"
                            # "   - journal_publication_issue\n"
                            # "   - journal_publication_item\n"
                            "   - journal_publication_journal_name\n"
                            # "   - journal_publication_start_page\n"
                            "   - journal_publication_title\n\n"
                            # "   - journal_publication_volume\n\n"

                            # "10) leadership_activities\n"
                            # "   - leadership_description\n"
                            # "   - leadership_end_date\n"
                            # "   - leadership_item\n"
                            # "   - leadership_organization\n"
                            # "   - leadership_role\n"
                            # "   - leadership_start_date\n\n"

                            # "11) peer_review_publication\n"
                            # "   - peer_review_publication_end_date\n"
                            # "   - peer_review_publication_end_page\n"
                            # "   - peer_review_publication_identifier\n"
                            # "   - peer_review_publication_issue\n"
                            # "   - peer_review_publication_publisher_name\n"
                            # "   - peer_review_publication_role\n"
                            # "   - peer_review_publication_start_page\n"
                            # "   - peer_review_publication_title\n"
                            # "   - peer_review_publication_type\n"
                            # "   - peer_review_publication_volume\n\n"

                            # "12) research_clinical_experience\n"
                            # "   - research_agency\n"
                            # "   - research_costs\n"
                            # "   - research_country\n"
                            # "   - research_department_laboratory\n"
                            # "   - research_description_goal\n"
                            # "   - research_end_date\n"
                            # "   - research_field_subject\n"
                            # "   - research_foundation_sponsor\n"
                            # "   - research_funding_amount\n"
                            # "   - research_identification\n"
                            # "   - research_institution\n"
                            # "   - research_item\n"
                            # "   - research_percent_effort\n"
                            # "   - research_publisher\n"
                            # "   - research_role\n"
                            # "   - research_start_date\n"
                            # "   - research_state_city\n"
                            # "   - research_supervisor\n"
                            # "   - research_title_name\n\n"

                            "6) reviewer_role\n"
                            "   - reviewer_end_date\n"
                            # "   - reviewer_field\n"
                            # "   - reviewer_item\n"
                            "   - reviewer_organization\n"
                            "   - reviewer_role\n\n"
                            # "   - reviewer_start_date\n\n"

                            # "14) speaking_engagement_presentations\n"
                            # "   - speaking_engagement_audience\n"
                            # "   - speaking_engagement_city\n"
                            # "   - speaking_engagement_country_state\n"
                            # "   - speaking_engagement_date\n"
                            # "   - speaking_engagement_event_name\n"
                            # "   - speaking_engagement_event_title_topic\n"
                            # "   - speaking_engagement_institution\n"
                            # "   - speaking_engagement_item\n"
                            # "   - speaking_engagement_type\n\n"
                            "7) other_publications\n"
                            "   - other_publication_end_date\n"
                            "   - other_publication_title\n\n"
                            "   - other_publication_type\n"
                            "   - other_publication_publisher\n\n"
                            
                            # "15) teaching_lecture_course\n"
                            # "   - lecture_city_state\n"
                            # "   - lecture_country\n"
                            # "   - lecture_end_date\n"
                            # "   - lecture_institution\n"
                            # "   - lecture_institution_sub_department\n"
                            # "   - lecture_item\n"
                            # "   - lecture_name_title\n"
                            # "   - lecture_role\n"
                            # "   - lecture_start_date\n"
                            # "   - lecture_type\n\n"

                            "============================================================\n"
                            "RULES:\n"
                            "1) Output only an object under 'l2'.\n"
                            "2) Each key must be <CATEGORY>.<SUBFIELD>, e.g. 'other_publications.other_publications_end_date'.\n"
                            "3) If there is a topic that can be in multiple categories, write all categories that apply.\n"
                            "4) Combine multiple references in the user prompt into multiple keys.\n"
                            "5) Never return a single big string in 'l2'.\n"
                            "6) Return strictly valid JSON with exactly one top-level key: 'l2'.\n"
                            "7) Write full correct names and terminologies (e.g., 'University of Chicago' instead of 'UChicago').\n"
                        )
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )

            parsed_fields = json.loads(response.choices[0].message.content)

            # If we didn't get a dict at all, return empty
            if not isinstance(parsed_fields, dict):
                print("GPT response is not a valid dictionary.")
                return {}

            # Ensure "l2" is present and is a dict
            if "l2" not in parsed_fields:
                parsed_fields["l2"] = {}
            elif not isinstance(parsed_fields["l2"], dict):
                # If GPT messed up and gave a string, forcibly make it a dict
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
            response = self.es.search(index="candidates", body=query)
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

    def search_by_field(self, field, value):
        try:
            query = {
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

            response = self.search(query)

            if 'hits' in response and 'hits' in response['hits']:
                documents = [hit['_source'] for hit in response['hits']['hits']]
                return documents
            else:
                print(f"No documents found for field '{field}' with fuzzy value '{value}'.")
                return []

        except Exception as e:
            print(f"Error performing fuzzy search by field: {e}")
            return []

    def search_by_fields(self, fields):
        try:
            must_conditions = [
                {
                    "match": {
                        field: {
                            "query": value,
                            "fuzziness": "AUTO",
                            "operator": "and"
                        }
                    }
                }
                for field, value in fields.items()
            ]

            query = {
                "query": {
                    "bool": {
                        "must": must_conditions
                    }
                }
            }

            response = self.search(query)

            if 'hits' in response and 'hits' in response['hits']:
                documents = [hit['_source'] for hit in response['hits']['hits']]
                return documents
            else:
                print("No documents found for the given fields.")
                return []

        except Exception as e:
            print(f"Error performing multi-field search: {e}")
            return []

    def search_in_level_two_data(self, fields):
        """
        Search for values in one or more fields within `level_two_data`.

        Example:
            fields = {
                "career_item.career_institution": "University of Chicago",
                "education.education_institution": "MIT"
            }
        will search documents where:
            level_two_data.career_item.career_institution == "University of Chicago" AND
            level_two_data.education.education_institution == "MIT"

        Args:
            fields (dict): A dictionary of {field_path: value} pairs.
                        field_path should omit the 'level_two_data.' prefix.
                        e.g. "career_item.career_institution": "University of Chicago"

        Returns:
            list: Documents matching all the given field-value pairs.
        """
        try:
            must_conditions = []

            for field_path, value in fields.items():
                print(f"Searching for field '{field_path}' with value '{value}'")

                # Add a nested match query for each field in `level_two_data`
                nested_path = field_path.split(".")[0]  # Extract top-level nested path
                must_conditions.append({
                    "nested": {
                        "path": f"level_two_data.{nested_path}",
                        "query": {
                            "match": {
                                f"level_two_data.{field_path}": {
                                    "query": value,
                                    "fuzziness": "AUTO",  # Enable fuzzy search
                                    "operator": "and"  # Ensures all terms in query must match
                                }
                            }
                        }
                    }
                })

            # Build the final query
            query = {
                "query": {
                    "bool": {
                        "must": must_conditions
                    }
                }
            }

            # Execute the query
            response = self.search(query)

            # Parse and return the results
            if 'hits' in response and 'hits' in response['hits']:
                return [hit['_source'] for hit in response['hits']['hits']]
            else:
                print("No documents found for the given fields in level_two_data.")
                return []

        except Exception as e:
            print(f"Error during search: {e}")
            return []


        except Exception as e:
            print(f"Error performing multi-field search in `level_two_data`: {e}")
            return []

    def search_with_prompt(self, prompt):
        """
        Example usage:
        prompt = "I want a user who earned an award in 2015"
        -> GPT => {
            "l2": {
                "award.award_date": "2015"
            }
            }
        -> Then we run search_in_level_two_data({"award.award_date": "2015"})
        """
        try:
            parsed_fields = self.chat_gpt(prompt)
            print(f"Parsed fields: {parsed_fields}")

            if not parsed_fields or not parsed_fields.get("l2"):
                print("No valid fields parsed from the prompt.")
                return []

            # Just do an L2 search
            l2_results = self.search_in_level_two_data(parsed_fields["l2"])
            print(f"L2 results: Found {len(l2_results)} documents.")

            return l2_results

        except Exception as e:
            print(f"Error in search_with_prompt: {e}")
            return []

def main():
    ps = PeopleSearch()
    prompt = "I want someone who has worked on protein abundance"

    results = ps.search_with_prompt(prompt)
    print("FINAL SEARCH RESULTS:")

    with open("l2_results.json", "w") as file:
        json.dump(results, file, indent=2)

if __name__ == "__main__":
    main()
