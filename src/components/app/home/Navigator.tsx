"use client";
import { Icons } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigator: React.FC = () => {
  const pathName = usePathname();
  console.log("pathName", pathName);
  return (
    <div className="flex h-[60px] flex-row items-center gap-4 rounded-2xl bg-white shadow-md transition-all duration-200 hover:scale-110">
      <Link href={"/"}>
        <Image
          src={"/logo-small.png"}
          width={43}
          height={43}
          alt={"company logo small"}
          className="transition-transform duration-200 hover:scale-110"
        />
      </Link>

      <div className="h-[48px] border border-[#F1F7FF]" />

      <Link href={"/search"}>
        <div
          className={`flex h-12 w-12 flex-row items-center justify-center rounded-xl ${pathName === "/search" ? "bg-[#F1F7FF]" : "bg-white"} transition-all duration-200 hover:scale-110`}
        >
          <Icons.UserSearch />
        </div>
      </Link>
      <Link href={"/dashboard"}>
        <div
          className={`flex h-12 w-12 flex-row items-center justify-center rounded-xl ${pathName === "/dashboard" ? "bg-[#F1F7FF]" : "bg-white"} transition-all duration-200 hover:scale-110`}
        >
          <Icons.DashboardSquareSetting />
        </div>
      </Link>
    </div>
  );
};

export { Navigator };
