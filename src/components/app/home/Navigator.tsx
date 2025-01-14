import { Icons } from "@/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navigator: React.FC = () => {
  return (
    <div className="flex h-[60px] flex-row items-center gap-4 rounded-2xl bg-white shadow-md">
      <Link href={"/"}>
        <Image
          src={"/logo-small.png"}
          width={43}
          height={43}
          alt={"company logo small"}
        />
      </Link>

      <div className="h-[48px] border border-[#F1F7FF]" />

      <div className="flex h-12 w-12 flex-row items-center justify-center rounded-xl bg-[#F1F7FF]">
        <Icons.UserSearch />
      </div>
      <div className="flex h-12 w-12 flex-row items-center justify-center rounded-xl">
        <Icons.DashboardSquareSetting />
      </div>
    </div>
  );
};

export { Navigator };
