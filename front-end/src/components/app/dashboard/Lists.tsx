import { Dashboard, Icons, Text } from "@/components";

const Lists = () => (
  <Dashboard.ListsContainer>
    <Dashboard.ListsHeader />
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
  </Dashboard.ListsContainer>
);

export { Lists };
