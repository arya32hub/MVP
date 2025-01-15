import { Icons, Text } from "@/components";
import { User } from "@/model";

const ReviewerRoles = ({
  roles,
}: {
  roles: User.Search.Schema["level_two_data"]["reviewer_role"];
}) => {
  if (!roles.length) return null;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.FileSearch /> Reviewer Roles
      </Text.H3>
      {roles.map((role, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Text.BodySmall className="font-semibold text-main-blue">
            {role.reviewer_role}
          </Text.BodySmall>
          <Text.BodySmall className="text-tornado">
            {role.reviewer_organization}, {role.reviewer_end_date}
          </Text.BodySmall>
        </div>
      ))}
    </div>
  );
};

export { ReviewerRoles };
