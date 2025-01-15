import { CandidateProfile, Icons, Text } from "@/components";
import { User } from "@/model";

const Education = ({
  education,
}: {
  education: User.Search.Schema["level_two_data"]["education"];
}) => {
  if (!education.length) return null;
  return (
    <>
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.Student /> Education
      </Text.H3>
      {education
        .map((edu) => {
          return {
            date: `${new Date(edu.education_start_date).getFullYear()} - ${new Date(edu.education_end_date).getFullYear()}`,
            heading: edu.education_institution,
            accomplishments: [edu.education_department],
          };
        })
        .map((props, index) => (
          <CandidateProfile.CareerTimelineItem {...props} key={index} />
        ))}
    </>
  );
};

export { Education };
