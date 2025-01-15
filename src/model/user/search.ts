interface Publication {
  publication_title: string;
  publication_end_date: string;
  publication_identifier: string;
}

interface Tier {
  analysis: string;
  score: string;
}

interface Tiering {
  employment_history: Tier;
  publication_trials: Tier;
  speaking_engagement: Tier;
  leadership_editorial?: Tier;
  associations_journals?: Tier;
  total_score: string;
}

interface Education {
  education_institution: string;
  education_city: string;
  education_state?: string;
  education_country_state_city: string;
  education_department: string;
  education_degree: string;
  education_start_date: string;
  education_end_date: string;
}

interface CareerItem {
  career_institution: string;
  career_city: string;
  career_state?: string;
  career_country_state: string;
  career_role: string;
  career_start_date: string;
  career_end_date: string;
}

interface GrantResearch {
  grant_title: string;
  grant_agency: string;
  grant_start_date: string;
  grant_end_date: string;
}

interface JournalPublication {
  journal_publication_title: string;
  journal_publication_end_date: string;
  journal_publication_journal_name: string;
}

interface BookPublication {
  book_publication_title: string;
  book_publication_bookname: string;
  book_publication_end_date: string;
  book_publication_publisher: string;
}

interface ReviewerRole {
  reviewer_role: string;
  reviewer_end_date: string;
  reviewer_organization: string;
}

interface LevelTwoData {
  other_publications: Publication[];
  education: Education[];
  career_item: CareerItem[];
  grant_research: GrantResearch[];
  journal_publications: JournalPublication[];
  book_publications: BookPublication[];
  reviewer_role: ReviewerRole[];
}

interface Data {
  first_name: string;
  last_name: string;
  credit_name?: string | null;
  orcid_id: string;
  emails: string[];
  keywords: string[];
  contact_address: string[];
}

interface Schema {
  data: Data;
  level_two_data: LevelTwoData;
  tiering?: Tiering;
}
interface ISearchApiResponse {
  query: string;
  results: Schema[];
}
export type {
  BookPublication,
  CareerItem,
  Data,
  Education,
  GrantResearch,
  JournalPublication,
  LevelTwoData,
  Publication,
  ReviewerRole,
  Schema,
  ISearchApiResponse,
};
