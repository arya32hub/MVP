import { Dashboard } from "@/components";

const DashboardPage = () => {
  return (
    <div className="mx-16 flex flex-row gap-4 px-[131px]">
      <Dashboard.Lists />
      <Dashboard.ActionBar />
    </div>
  );
};

export default DashboardPage;
