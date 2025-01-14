from typing import List, Optional
from pydantic import BaseModel

class CV(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    contact_phone_number: list[str]
    contact_email: list[str]
    contact_address: list[str]
    research_clinical_experience: list[str]
    grant_research: list[str]
    career_item: list[str]
    education: list[str]
    certification_license: list[str]
    award: list[str]
    speaking_engagement_presentations: list[str]
    committee_associated_board_chair_investigator: list[str]
    journal_publications: list[str]
    book_publication: list[str]
    other_publication: list[str]
    peer_review_publication: list[str]
    reviewer_role: list[str]
    teaching_lecture_course: list[str]
    community_service: list[str]
    leadership_activities: list[str]

class BookPublication(BaseModel):
    book_publication_author: str
    book_publication_title: str
    book_publication_chapter: str
    book_publication_bookname: str
    book_publication_publisher: str
    book_publication_end_date: str
    book_publication_volume: str
    book_publication_edition: str
    book_publication_issue: str
    book_publication_start_page: str
    book_publication_end_page: str
    book_publication_identifier: str
    book_publication_editor: str
    book_publication_item: str
    book_publication_publisher_city_state: str

class BookPublications(BaseModel):
    book_publications: list[BookPublication]

class JournalPublication(BaseModel):
    journal_publication_author: str
    journal_publication_end_date: str
    journal_publication_title: str
    journal_publication_journal_name: str
    journal_publication_volume: str
    journal_publication_identifier: str
    journal_publication_issue: str
    journal_publication_start_page: str
    journal_publication_end_page: str
    journal_publication_item: str

class JournalPublications(BaseModel):
    journal_publications: list[JournalPublication]

class TeachingLectureCourse(BaseModel):
    lecture_institution: str
    lecture_institution_sub_department: str
    lecture_start_date: str
    lecture_end_date: str
    lecture_name_title: str
    lecture_role: str
    lecture_city_state: str
    lecture_country: str
    lecture_item: str
    lecture_type: str

class TeachingLectureCourses(BaseModel):
    teaching_lecture_courses: list[TeachingLectureCourse]

class SpeakingEngagement(BaseModel):
    speaking_engagement_date: str
    speaking_engagement_event_name: str
    speaking_engagement_event_title_topic: str
    speaking_engagement_institution: str
    speaking_engagement_city: str
    speaking_engagement_country_state: str
    speaking_engagement_type: str
    speaking_engagement_audience: str
    speaking_engagement_item: str

class SpeakingEngagementPresentations(BaseModel):
    speaking_engagement_presentations: list[SpeakingEngagement]

class ResearchClinicalExperience(BaseModel):
    research_start_date: str
    research_end_date: str
    research_agency: str
    research_title_name: str
    research_identification: str
    research_field_subject: str
    research_description_goal: str
    research_institution: str
    research_department_laboratory: str
    research_publisher: str
    research_role: str
    research_foundation_sponsor: str
    research_supervisor: str
    research_funding_amount: str
    research_costs: str
    research_percent_effort: str
    research_state_city: str
    research_country: str
    research_item: str

class ResearchClinicalExperiences(BaseModel):
    research_clinical_experiences: list[ResearchClinicalExperience]

class CertificationLicenseItem(BaseModel):
    certification_license_item_scope: str
    certification_license_item_type: str
    certification_other_value: Optional[str] = None

class CertificationLicense(BaseModel):
    certification_license_start_date: str
    certification_license_date_issued: str
    certification_license_date_reissued: str
    certification_license_name: str
    certification_license_provider_institution: str
    certification_license_role: str
    certification_license_title_description: str
    certification_license_identification: str
    certification_license_city_state: str
    certification_license_country: str
    certification_license_item: CertificationLicenseItem

class CertificationLicenses(BaseModel):
    certification_licenses: List[CertificationLicense]

class AwardRecognition(BaseModel):
    award_name: str
    award_date: str
    award_provider_institution_organization: str
    award_field_subject: str
    award_item: str

class AwardsRecognitions(BaseModel):
    awards_recognitions: list[AwardRecognition]

class CareerItem(BaseModel):
    career_start_date: str
    career_end_date: str
    career_city: str
    career_country_state: str
    career_role: str
    career_institution: str
    career_sub_department: str
    career_type: str
    career_time: str

class CareerItems(BaseModel):
    career_items: list[CareerItem]

class PeerReviewPublication(BaseModel):
    peer_review_publication_role: str
    peer_review_publication_end_date: str
    peer_review_publication_title: str
    peer_review_publication_publisher_name: str
    peer_review_publication_volume: str
    peer_review_publication_issue: str
    peer_review_publication_identifier: str
    peer_review_publication_start_page: str
    peer_review_publication_end_page: str
    peer_review_publication_type: str

class PeerReviewPublications(BaseModel):
    peer_review_publications: list[PeerReviewPublication]

class Education(BaseModel):
    education_start_date: str
    education_end_date: str
    education_degree: str
    education_grade_honor: str
    education_field: str
    education_sub_field: str
    education_institution: str
    education_department: str
    education_country_state_city: str

class Educations(BaseModel):
    educations: list[Education]

class GrantResearch(BaseModel):
    grant_start_date: str
    grant_end_date: str
    grant_title: str
    grant_agency: str
    grant_amount: str
    grant_role: str
    grant_item: str

class GrantResearches(BaseModel):
    grant_researches: list[GrantResearch]

class CommitteeBoardPosition(BaseModel):
    committee_start_date: str
    committee_end_date: str
    committee_name: str
    committee_role: str
    committee_organization: str
    committee_type: str
    committee_item: str

class CommitteeBoardPositions(BaseModel):
    committee_board_positions: list[CommitteeBoardPosition]

class OtherPublication(BaseModel):
    other_publication_date: str
    other_publication_title: str
    other_publication_type: str
    other_publication_publisher: str
    other_publication_authors: str
    other_publication_item: str

class OtherPublications(BaseModel):
    other_publications: list[OtherPublication]

class ReviewerRole(BaseModel):
    reviewer_start_date: str
    reviewer_end_date: str
    reviewer_role: str
    reviewer_organization: str
    reviewer_field: str
    reviewer_item: str

class ReviewerRoles(BaseModel):
    reviewer_roles: list[ReviewerRole]

class CommunityService(BaseModel):
    community_service_start_date: str
    community_service_end_date: str
    community_service_organization: str
    community_service_role: str
    community_service_description: str
    community_service_item: str

class CommunityServices(BaseModel):
    community_services: list[CommunityService]

class LeadershipActivity(BaseModel):
    leadership_start_date: str
    leadership_end_date: str
    leadership_role: str
    leadership_organization: str
    leadership_description: str
    leadership_item: str

class LeadershipActivities(BaseModel):
    leadership_activities: list[LeadershipActivity]

class NonMDEmploymentHistoryScore(BaseModel):
    analysis: str
    score: int

class NonMDPublicationTrialsScore(BaseModel):
    analysis: str
    score: int

class NonMDSpeakingEngagementScore(BaseModel):
    analysis: str
    score: int

class NonMDAssociationsJournalsScore(BaseModel):
    analysis: str
    score: int

class MDEmploymentHistoryScore(BaseModel):
    analysis: str
    score: int

class PublicationTrialsScore(BaseModel):
    analysis: str
    score: int

class SpeakingEngagementScore(BaseModel):
    analysis: str
    score: int

class LeadershipEditorialScore(BaseModel):
    analysis: str
    score: int