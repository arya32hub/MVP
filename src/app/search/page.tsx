"use client";

import {
  BookOpen,
  FilterMailSquare,
  Location,
  SearchFocus,
} from "@/assets/svg";
import {
  Button,
  Candidate,
  Checkbox,
  Dropdown,
  SearchBar,
  Text,
} from "@/components";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  return (
    <div>
      <div className="flex min-w-[306px] flex-col rounded-2xl bg-white p-4 shadow-md">
        <div className="flex flex-row items-center gap-1">
          <Image src={FilterMailSquare} alt={"filter mail"} />

          <Text.H3 className="my-[2px] items-center text-gray-900">
            Filter
          </Text.H3>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <Dropdown text={"Select the region"} svgLeft={Location} />
          <Dropdown text={"Education"} svgLeft={BookOpen} />
        </div>
        <div className="mt-5 border-[1px] border-[#F4F4F4F4]" />
        <div className="my-[20px] flex flex-col">
          <div className="flex flex-row items-center gap-1.5 px-[18px] py-[5.5px]">
            <Checkbox.Default />
            <Text.Body className="text-gray-500">Lorem Ipsum</Text.Body>
          </div>
          <div className="flex flex-row items-center gap-1.5 px-[18px] py-[5.5px]">
            <Checkbox.Default />
            <Text.Body className="text-gray-500">Lorem Ipsum</Text.Body>
          </div>
        </div>

        <div className="mt-5 border-[1px] border-[#F4F4F4F4]" />
        <div className="mt-5 flex flex-row gap-[10px]">
          <Button.Secondary text="Reset" />
          <Button.Primary text="Apply" />
        </div>
      </div>
    </div>
  );
};

const SearchSection = () => {
  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const Footer: React.FC = () => (
    <div className="mx-[9px] mt-3 flex flex-row items-center justify-between">
      <Checkbox.All isChecked />
      <Button.Secondary
        isActive={false}
        text={"Save"}
        className="max-w-[79px]"
      />
    </div>
  );
  return (
    <SearchBar.Container Footer={Footer}>
      <Button.IceCube svgLeft={SearchFocus} text={"Advanced Search"} />
      <SearchBar.MountainLake
        placeHolder="Type here..."
        value={query !== null ? query : undefined}
      />
    </SearchBar.Container>
  );
};

export default function Search() {
  const router = useRouter();

  const navigateToCandidateProfile = () => {
    router.push("/candidate-profile");
  };
  return (
    <div className="mx-16 flex flex-row gap-4 px-[131px]">
      <Filter />

      <div className="flex-1">
        <SearchSection />
        <div className="mt-4">
          <Candidate onClick={navigateToCandidateProfile} />
        </div>
      </div>
    </div>
  );
}
