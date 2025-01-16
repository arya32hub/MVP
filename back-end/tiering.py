import json
import os
import concurrent
from typing import Any, Dict
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()
from classes.cv_types import (CV, AwardsRecognitions, BookPublications,
                              CareerItems, CertificationLicenses,
                              CommitteeBoardPositions, CommunityServices,
                              Educations, GrantResearches, JournalPublications,
                              LeadershipActivities, LeadershipEditorialScore,
                              MDEmploymentHistoryScore,
                              NonMDAssociationsJournalsScore,
                              NonMDEmploymentHistoryScore,
                              NonMDPublicationTrialsScore,
                              NonMDSpeakingEngagementScore, OtherPublications,
                              PeerReviewPublications, PublicationTrialsScore,
                              ResearchClinicalExperiences, ReviewerRoles,
                              SpeakingEngagementPresentations,
                              SpeakingEngagementScore, TeachingLectureCourses)

from prompts.cv_prompts import (leadership_editorial_score_prompt,
                                md_employment_history_score_prompt,
                                non_md_associations_journals_score_prompt,
                                non_md_employment_history_score_prompt,
                                non_md_publication_trials_score_prompt,
                                non_md_speaking_engagement_score_prompt,
                                publication_trials_score_prompt,
                                speaking_engagement_score_prompt)

SCORE_CONFIG = {
    'md_employment_history': {
        'prompt_func': md_employment_history_score_prompt,
        'response_format': MDEmploymentHistoryScore,
    },
    'publication_trials': {
        'prompt_func': publication_trials_score_prompt,
        'response_format': PublicationTrialsScore,
    },
    'speaking_engagement': {
        'prompt_func': speaking_engagement_score_prompt,
        'response_format': SpeakingEngagementScore,
    },
    'leadership_editorial': {
        'prompt_func': leadership_editorial_score_prompt,
        'response_format': LeadershipEditorialScore,
    },
    'non_md_employment_history': {
        'prompt_func': non_md_employment_history_score_prompt,
        'response_format': NonMDEmploymentHistoryScore,
    },
    'non_md_publication_trials': {
        'prompt_func': non_md_publication_trials_score_prompt,
        'response_format': NonMDPublicationTrialsScore,
    },
    'non_md_speaking_engagement': {
        'prompt_func': non_md_speaking_engagement_score_prompt,
        'response_format': NonMDSpeakingEngagementScore,
    },
    'non_md_associations_journals': {
        'prompt_func': non_md_associations_journals_score_prompt,
        'response_format': NonMDAssociationsJournalsScore,
    },
}

def calculate_score(openai_client, score_type, relevant_data):
    config = SCORE_CONFIG.get(score_type)
    if not config:
        raise ValueError(f"Unknown score type: {score_type}")

    prompt = config['prompt_func'](relevant_data)
    response_format = config['response_format']
    try:
        response = openai_client.beta.chat.completions.parse(
            model="o1",
            messages=[
                {"role": "system", "content": f"You are an AI assistant tasked with analyzing CV data and assigning scores based on specific criteria for {score_type}."},
                {"role": "user", "content": prompt}
            ],
            response_format=response_format,
        )

        result = response.choices[0].message.content
        if isinstance(result, response_format):
            return result
        elif isinstance(result, str):
            try:
                parsed_result = json.loads(result)
                return response_format(**parsed_result)
            except json.JSONDecodeError:
                return response_format(analysis=f"Error parsing result for {score_type}", score=0)
    except Exception as e:
        print(f"Error in calculate_score for {score_type}: {str(e)}")
        return response_format(analysis=f"Error: {str(e)}", score=0)

def calculate_total_score(scores: Dict[str, Any]) -> int:
    return sum(score['score'] for score in scores.values())

import concurrent.futures

def tiering(user, openai_client):
    print("Starting the tiering function")
    tier = 0
    scores = {}

    user = user.get('level_two_data', {})
    if user == {}:
        print("No level_two_data found for the user, returning empty scores")
        return scores

    print("Processing education data")
    education = user.get('education', [])
    is_md = any('M.D.' in edu.get('education_degree', '') for edu in education)
    print(f"is_md: {is_md}")

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        print("Initializing ThreadPoolExecutor")
        future_to_score = {}

        career_items = user.get('career_item', [])
        print(f"Career items: {len(career_items)} items found")

        if is_md:
            print("User is an MD, assigning MD-specific tasks")
            future_to_score['employment_history'] = executor.submit(calculate_score, openai_client, 'md_employment_history', career_items)
            future_to_score['publication_trials'] = executor.submit(calculate_score, openai_client, 'publication_trials', user)
            future_to_score['speaking_engagement'] = executor.submit(calculate_score, openai_client, 'speaking_engagement', user)
            future_to_score['leadership_editorial'] = executor.submit(calculate_score, openai_client, 'leadership_editorial', user)
        else:
            print("User is not an MD, assigning non-MD-specific tasks")
            future_to_score['employment_history'] = executor.submit(calculate_score, openai_client, 'non_md_employment_history', career_items)
            future_to_score['publication_trials'] = executor.submit(calculate_score, openai_client, 'non_md_publication_trials', user)
            future_to_score['speaking_engagement'] = executor.submit(calculate_score, openai_client, 'non_md_speaking_engagement', user)
            future_to_score['associations_journals'] = executor.submit(calculate_score, openai_client, 'non_md_associations_journals', user)

        for score_type, future in future_to_score.items():
            try:
                print(f"Waiting for result of {score_type}")
                result = future.result()
                print(f"Result for {score_type} obtained successfully")
                
                if isinstance(result, (MDEmploymentHistoryScore, PublicationTrialsScore, SpeakingEngagementScore, LeadershipEditorialScore,
                                       NonMDEmploymentHistoryScore, NonMDPublicationTrialsScore, NonMDSpeakingEngagementScore, NonMDAssociationsJournalsScore)):
                    scores[score_type] = {
                        'analysis': result.analysis,
                        'score': result.score
                    }
                elif isinstance(result, dict):
                    scores[score_type] = result
                else:
                    raise ValueError(f"Unexpected result type for {score_type}: {type(result)}")
            except Exception as exc:
                print(f"Exception occurred while calculating {score_type}: {exc}")
                scores[score_type] = {
                    'analysis': f"Error: {str(exc)}",
                    'score': 0
                }

    print("Calculating total score")
    scores['total_score'] = calculate_total_score(scores)
    print("Tiering function completed successfully")

    return scores

