import { CandidateProfile, Icons, Text } from "@/components";
import { User } from "@/model";

const JournalPublications = ({
  publications,
  title,
}: {
  publications: User.Search.Schema["level_two_data"]["journal_publications"];
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
          date: `${new Date(pub.journal_publication_end_date).getFullYear()}
            `,
          heading: pub.journal_publication_title,
          accomplishments: [pub.journal_publication_journal_name],
        }))
        .map((props, index) => (
          <CandidateProfile.CareerTimelineItem {...props} key={index} />
        ))}
    </div>
  );
};

export { JournalPublications };
