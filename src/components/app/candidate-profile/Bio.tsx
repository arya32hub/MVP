import { CandidateProfile } from "@/components";
import { User } from "@/model";

const Bio = ({
  levelTwoData,
  tiering,
}: {
  levelTwoData: User.Search.Schema["level_two_data"];
  tiering: User.Search.Schema["tiering"] | null;
}) => {
  return (
    <div className="flex w-full flex-col gap-[50px] rounded-2xl bg-white px-6 pb-11 pt-6 shadow-md">
      <CandidateProfile.EmploymentHistory
        careerItems={levelTwoData.career_item}
      />
      <CandidateProfile.Education education={levelTwoData.education} />

      <CandidateProfile.JournalPublications
        publications={levelTwoData.journal_publications}
        title="Journal Publications"
      />
      <CandidateProfile.BookPublications
        publications={levelTwoData.book_publications}
        title="Book Publications"
      />
      <CandidateProfile.OtherPublications
        publications={levelTwoData.other_publications}
        title="Other Publications"
      />
      <CandidateProfile.Grants grants={levelTwoData.grant_research} />
      <CandidateProfile.ReviewerRoles roles={levelTwoData.reviewer_role} />
      <CandidateProfile.TieringSection tiering={tiering} />
    </div>
  );
};

export { Bio };
