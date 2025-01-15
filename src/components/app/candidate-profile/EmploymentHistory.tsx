import { CandidateProfile, Icons, Text } from "@/components";
import { User } from "@/model";

const EmploymentHistory = ({
  careerItems,
}: {
  careerItems: User.Search.Schema["level_two_data"]["career_item"];
}) => {
  if (!careerItems.length) return null;
  return (
    <>
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.PermanentJob /> Employment History
      </Text.H3>
      {careerItems
        .map((career) => {
          const startDate = `${new Date(career.career_start_date).getFullYear()}`;
          const endDate =
            career.career_end_date &&
            career.career_end_date.toLowerCase() !== "n/a"
              ? ` - ${new Date(career.career_end_date).getFullYear()}`
              : ` - Present`;
          const date = `${startDate}${endDate}`;
          const heading = career.career_role;
          const accomplishments = [career.career_institution];

          return { date, heading, accomplishments };
        })
        .map((props, index) => (
          <CandidateProfile.CareerTimelineItem key={index} {...props} />
        ))}
    </>
  );
};

export { EmploymentHistory };
