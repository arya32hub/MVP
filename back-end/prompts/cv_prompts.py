import json
def non_md_speaking_engagement_score_prompt(relevant_data):
    return f"""Analyze the following CV data and assign a score based on these criteria:
    - 1 point if often engaged to speak/chair sessions at national or international (i.e. EU) conferences (non-promotional speaking only)
    - 3 points if engaged to speak regularly including presenting, lectures or poster presentation, at regional conferences or programs
    - 3 points if often invited as a lecturer at an academic institution
    - 3 points if often invited as a lecturer by a continuing medical education (CME) organization
    - 6 points if none of the above criteria are met

    Note: No pharma companies services/events, risk of bias

    CV data:
    {json.dumps(relevant_data, indent=2)}

    Provide an analysis of the speaking engagements and the corresponding score.
    """

def speaking_engagement_score_prompt(relevant_data):
    return f"""Analyze the following CV data for an M.D. applicant and assign a score based on these criteria:

1 point:
- Often engaged to speak/chair sessions at national or international (i.e., EU) conferences (non-promotional speaking only)

3 points (assign if any of these are true):
- Engaged to speak regularly including presenting, lectures or poster presentation, at regional conferences or programs
- Often invited as a lecturer at an academic institution
- Often invited as a lecturer by a continuing medical education (CME) organization

6 points:
- None of the above

If multiple criteria are met, assign the lowest (best) score.

Relevant CV data:
{json.dumps(relevant_data, indent=2)}

Provide your analysis and the final score.
"""

def md_employment_history_score_prompt(career_items):
    return f"""Analyze the following employment history for an M.D. applicant and assign a score based on these criteria:

1 point:
- Employed as a department head or full-time professor at a university
- Employed as a department head at a clinical center or specialty care facility
- Employed as a full-time physician at leading national hospital/clinical center

3 points:
- Employed as a senior lecturer/lecturer/associate professor at a university
- Employed as a full-time staff physician at a large regional clinical center, hospital or special care facility

6 points:
- None of the above

If multiple criteria are met, assign the lowest (best) score.

Employment history:
{json.dumps(career_items, indent=2)}

Provide your analysis and the final score.
"""

def publication_trials_score_prompt(relevant_data):
    return f"""Analyze the following CV data for an M.D. applicant and assign a score based on these criteria:

1 point (assign if any of these are true):
- Author or editor of a leading scientific journal or textbook for the specialty/Therapeutic Area (TA)
- Work that is often published in leading journals relevant to the TA area based on high-level impact factor
- Often engaged as a principal investigator, coordinating investigator, or steering committee member for medical device, pharma, or government-sponsored, multi-centered clinical trials
- Winner/recipient of national scientific award, delivered by national bodies (excluding conferences)

3 points:
- Work that is published regularly in leading journals for the TA
- Often engaged as a sub-investigator or site-level principal investigator for medical device, pharma, or government-sponsored multi-central clinical trials

6 points:
- None of the above

If multiple criteria are met, assign the lowest (best) score.

Relevant CV data:
{json.dumps(relevant_data, indent=2)}

Provide your analysis and the final score.
"""

def leadership_editorial_score_prompt(relevant_data):
    return f"""Analyze the following CV data for an M.D. applicant and assign a score based on these criteria:

1 point (assign if any of these are true):
- Served in a leadership role of international or national medical association (including patient org), member of a scientific academy in the past 7 years
- Served as editor or board member of a leading peer-reviewed (international or national) medical journal for a TA in the past 7 years

3 points (assign if any of these are true):
- Served as a member of the medical or scientific committee for a national medical association in the past 7 years
- Served in a leadership role, or chaired a medical or scientific committee, for a regional, provincial, or sub-national medical association (including patient org) in the past 7 years
- Served as editor or editorial board member of a peer-reviewed medical journal for TA in the past 7 years

6 points:
- None of the above

If multiple criteria are met, assign the lowest (best) score.

Relevant CV data:
{json.dumps(relevant_data, indent=2)}

Provide your analysis and the final score.
"""

def non_md_employment_history_score_prompt(career_items):
    return f"""Analyze the following career items and assign a score based on these criteria:
    - 1 point if employed as an assistant lecturer, lecturer, associate professor or professor at a University
    - 1 point if 15+ years of practice in specialty (including private practice)
    - 3 points if between 7-14 years of practice in specialty (including private practice)
    - 6 points if none of the above criteria are met

    Career items:
    {json.dumps(career_items, indent=2)}

    Provide an analysis of the employment history and the corresponding score.
    """

def non_md_publication_trials_score_prompt(relevant_data):
    return f"""Analyze the following CV data and assign a score based on these criteria:
    - 1 point if author/editor of a leading textbook for specialty TA (defined as having several editions and having one of them recently issued in past 5 years)
    - 1 point if published work is often in leading journals relevant to TA based on high level impact factor
    - 1 point if often engaged as a principal investigator, coordinating investigator or steering committee member for medical device, pharma or govt sponsored, multi-centered clinical trials
    - 1 point if winner/recipient of a national scientific award (delivered by national bodies; excluding conferences)
    - 3 points if work is published regularly in leading journals for TA
    - 3 points if often engaged as a sub-investigator or site-level principal investigator for medical device, pharma or govt sponsored multi-central clinical trials
    - 6 points if none of the above criteria are met

    CV data:
    {json.dumps(relevant_data, indent=2)}

    Provide an analysis of the publications and trials involvement and the corresponding score.
    """

def non_md_associations_journals_score_prompt(relevant_data):
    return f"""Analyze the following CV data and assign a score based on these criteria:
    - 1 point if served in a leadership role of international or national nursing, pharmacy or healthcare associations
    - 1 point if served as editor or board member of a peer-reviewed nursing, pharmacy or healthcare journal for a TA in the past 7 years
    - 3 points if served in leadership role of a local/regional chapter of a nursing, pharmacy or healthcare associations in the past 7 years
    - 6 points if none of the above criteria are met

    CV data:
    {json.dumps(relevant_data, indent=2)}

    Provide an analysis of the associations and journal involvement and the corresponding score.
    """
