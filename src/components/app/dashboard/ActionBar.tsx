import { Button, Checkbox, Text } from "@/components";

const ActionBar = () => (
  <div className="flex w-full flex-col gap-4">
    <div className="flex flex-row items-center justify-between rounded-2xl bg-white p-2 shadow-md">
      <div className="flex flex-row gap-1">
        <Checkbox.All />
        <Text.Body className="text-gray-500">Select All</Text.Body>
      </div>
      <Button.GraySmall>Remove</Button.GraySmall>
    </div>
  </div>
);

export { ActionBar };
