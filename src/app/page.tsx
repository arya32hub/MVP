"use client";

import { SearchFocus } from "@/assets/svg";
import { Button, SearchBar } from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const navigateToSearch = () => {
    router.push("/search");
  };

  return (
    <div className="mx-16 mb-4 flex flex-col items-center justify-center px-[292px] pt-[118.25px]">
      <Image
        src="/public/logo-big.png"
        width={215.53}
        height={104.94}
        alt={"glink logo"}
      />
      <div className="mt-[54px] flex w-full flex-col">
        <div className="font-inter w-full text-center text-[37px] font-medium leading-[44.78px] text-[#333335]">
          What can I help you with?
        </div>
        <SearchBar.Container className="mt-6">
          <Button.IceCube svgLeft={SearchFocus} text={"Advanced Search"} />
          <SearchBar.MainBlue
            placeHolder="Type here..."
            onClick={navigateToSearch}
          />
        </SearchBar.Container>
        <div className="mt-4 flex flex-row items-center gap-[26.8px]">
          <div className="items-center font-[Inter] text-sm font-normal leading-4 text-[#98A0B3]">
            Suggested:
          </div>
          <div className="rounded-[34px] border-[1px] border-[#87AEEE] bg-white px-4 py-2 font-[Inter] text-[14px] font-normal text-[#7B7C7E]">
            Lorem Ipsum
          </div>
          <div className="rounded-[34px] border-[1px] border-[#87AEEE] bg-white px-4 py-2 font-[Inter] text-[14px] font-normal text-[#7B7C7E]">
            Lorem Ipsum
          </div>
          <div className="rounded-[34px] border-[1px] border-[#87AEEE] bg-white px-4 py-2 font-[Inter] text-[14px] font-normal text-[#7B7C7E]">
            Lorem Ipsum
          </div>
          <div className="rounded-[34px] border-[1px] border-[#87AEEE] bg-white px-4 py-2 font-[Inter] text-[14px] font-normal text-[#7B7C7E]">
            Lorem Ipsum
          </div>
        </div>
      </div>
    </div>
  );
}
