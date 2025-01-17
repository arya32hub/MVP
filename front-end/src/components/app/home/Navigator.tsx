"use client";

import { Icons } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigator: React.FC = () => {
  const pathName = usePathname();

  return (
    <div className="flex w-full items-center justify-between h-[60px] px-8">
      {/* Left Section: Logo and Navigation */}
      <div className="flex flex-row items-center gap-4 rounded-2xl bg-white shadow-md transition-all duration-200 hover:scale-110">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={"/logo-small.png"}
            width={43}
            height={43}
            alt={"company logo small"}
            className="transition-transform duration-200 hover:scale-110"
          />
        </Link>

        {/* Divider */}
        <div className="h-[48px] border border-[#F1F7FF]" />

        {/* Search Icon */}
        <Link href={"/search"}>
          <div
            className={`flex h-12 w-12 flex-row items-center justify-center rounded-xl hover:shadow-md ${
              pathName === "/search" ? "bg-[#F1F7FF]" : "bg-white"
            } transition-all duration-200 hover:scale-110`}
          >
            <Icons.UserSearch />
          </div>
        </Link>

        {/* Dashboard Icon */}
        <Link href={"/dashboard"}>
          <div
            className={`flex h-12 w-12 flex-row items-center justify-center rounded-xl hover:shadow-md ${
              pathName === "/dashboard" ? "bg-[#F1F7FF]" : "bg-white"
            } transition-all duration-200 hover:scale-110`}
          >
            <Icons.DashboardSquareSetting />
          </div>
        </Link>
      </div>

      {/* Right Section: FMV Tool */}
      <div className="flex items-center">
        {/* FMV Tool Icon */}
        <Link href="/fmv-tool">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md hover:scale-110 hover:shadow-lg transition-all duration-200">
            <Icons.FileSearch /> {/* Use FMV Icon */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export { Navigator };
