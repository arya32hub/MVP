import { Icons, Text } from "@/components";

const ListsHeader = () => (
  <div className="flex flex-row justify-between">
    <div className="flex flex-row items-center gap-1">
      <Icons.LefToRightListBullet />
      <Text.H3 className="text-gray-900">Lists</Text.H3>
    </div>
    <Icons.PencilEdit />
  </div>
);

export { ListsHeader };
