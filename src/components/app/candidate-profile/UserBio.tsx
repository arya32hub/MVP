import { Icons, Text } from "@/components";
import { User } from "@/model";

const UserBio = ({ user }: { user: User.Search.Schema["data"] }) => {
  return (
    <div className="flex flex-col gap-4">
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.FileSearch /> User Bio
      </Text.H3>
      <Text.Body className="text-tornado">{user["bio"]}</Text.Body>
    </div>
  );
};

export { UserBio };
