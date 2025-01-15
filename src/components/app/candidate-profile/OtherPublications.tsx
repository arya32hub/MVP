import { CandidateProfile, Icons, Text } from "@/components";
import { User } from "@/model";

const OtherPublications = ({
  publications,
  title,
}: {
  publications: User.Search.Schema["level_two_data"]["other_publications"];
  title: string;
}) => {
  if (!publications.length) return null;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.FileSearch /> {title}
      </Text.H3>
      {publications
        .map((pub) => ({
          date: `${new Date(pub.publication_end_date).getFullYear()}
                  `,
          heading: pub.publication_title,
          // accomplishments: [pub.publication_identifier],
        }))
        .map((props, index) => (
          <CandidateProfile.CareerTimelineItem {...props} key={index} />
        ))}
    </div>
  );
};

export { OtherPublications };
