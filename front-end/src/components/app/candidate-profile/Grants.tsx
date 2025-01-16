import { Icons, Text } from "@/components";
import { User } from "@/model";

const Grants = ({
  grants,
}: {
  grants: User.Search.Schema["level_two_data"]["grant_research"];
}) => {
  if (!grants.length) return null;
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.Certificate /> Grants Received
      </Text.H3>
      {grants.map((grant, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Text.BodySmall className="font-semibold text-main-blue">
            {grant.grant_title}
          </Text.BodySmall>
          <Text.BodySmall className="text-tornado">
            {grant.grant_agency}, {grant.grant_end_date}
          </Text.BodySmall>
        </div>
      ))}
    </div>
  );
};

export { Grants };
