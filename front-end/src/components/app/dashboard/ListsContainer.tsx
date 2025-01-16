import { PropsWithChildren } from "react";

const ListsContainer: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="flex w-[306px] flex-col rounded-2xl p-4 shadow-md">
    {children}
  </div>
);

export { ListsContainer };
