import { CandidateProfile, Icons, Text } from "@/components";
import { User } from "@/model";

const BookPublications = ({
  publications,
  title,
}: {
  publications: User.Search.Schema["level_two_data"]["book_publications"];
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
          date: new Date(pub.book_publication_end_date).getFullYear(),
          heading: pub.book_publication_title,
          accomplishments: [pub.book_publication_bookname],
        }))
        .map((props, index) => (
          <CandidateProfile.CareerTimelineItem key={index} {...props} />
        ))}
    </div>
  );
};

export { BookPublications };
