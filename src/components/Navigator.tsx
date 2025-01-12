import { CompanyLogo, DashboardSquareSetting, UserSearch } from "@/assets/svg";
import Image from "next/image";
import React from "react";

const Navigator: React.FC = () => {
  return (
    <div className="flex h-[60px] flex-row items-center gap-4 rounded-2xl bg-white shadow-sm">
      <div>
        <Image
          src={CompanyLogo}
          width={43}
          height={43}
          alt={"company logo small"}
        />
      </div>
      <div className="h-[48px] border border-[#F1F7FF]" />

      <div className="flex h-12 w-12 flex-row items-center justify-center rounded-xl bg-[#F1F7FF]">
        <Image
          src={UserSearch}
          width={24}
          height={24}
          alt={"Search People logo"}
        />
      </div>
      <div className="flex h-12 w-12 flex-row items-center justify-center rounded-xl">
        <Image
          src={DashboardSquareSetting}
          width={24}
          height={24}
          alt={"Search People logo"}
        />
      </div>
    </div>
  );
};

export { Navigator };
