import { Icons, Text } from "@/components";
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
      {publications.map((pub, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Text.BodySmall className="font-semibold text-main-blue">
            {pub.publication_title}
          </Text.BodySmall>
          <Text.BodySmall className="text-tornado">
            ({pub.publication_end_date}). {pub.publication_identifier}
          </Text.BodySmall>
        </div>
      ))}
    </div>
  );
};

export { OtherPublications };
