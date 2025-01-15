import { Button, Checkbox, Icons, Text } from "@/components";

const Lists = () => (
  <div className="flex w-[306px] flex-col rounded-2xl p-4 shadow-md">
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center gap-1">
        <Icons.LefToRightListBullet />
        <Text.H3 className="text-gray-900">Lists</Text.H3>
      </div>
      <Icons.PencilEdit />
    </div>
    <div className="mt-[21px] flex flex-col gap-3">
      <div className="flex flex-col rounded-2xl bg-mountain-lake px-4 py-3">
        <Text.Body className="text-white">List 1</Text.Body>
      </div>
      <div className="flex flex-col rounded-2xl bg-[#F7F9FE] px-4 py-3">
        <Text.Body className="text-main-blue">List 2</Text.Body>
      </div>
      <div className="flex flex-col rounded-2xl bg-[#F7F9FE] px-4 py-3">
        <Text.Body className="text-main-blue">List 3</Text.Body>
      </div>
      <button className="items center flex flex-row justify-center px-4 py-3">
        <Icons.PlusSignSquare />
      </button>
    </div>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="mx-16 flex flex-row gap-4 px-[131px]">
      <Lists />
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-row items-center justify-between rounded-2xl bg-white p-2 shadow-md">
          <div className="flex flex-row gap-1">
            <Checkbox.All />
            <Text.Body className="text-gray-500">Select All</Text.Body>
          </div>
          <Button.GraySmall>Remove</Button.GraySmall>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
