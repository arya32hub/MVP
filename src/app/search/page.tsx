"use client";

import { API } from "@/api";
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
import { User } from "@/model";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

interface ISearchSectionProps {
  text?: string;
}
const SearchSection: React.FC<ISearchSectionProps> = ({ text }) => {
  const router = useRouter();

  const navigateToSearch = (query?: string) => {
    router.replace(`/search?query=${query}`);
  };

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
        value={text}
        onClick={navigateToSearch}
      />
    </SearchBar.Container>
  );
};

export default function Search() {
  const router = useRouter();
  const [response, setResponse] = useState<
    User.Search.ISearchApiResponse | undefined
  >();

  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchQuery, setSearchQuery] = useState(query);

  const navigateToCandidateProfile = (orcidId: string) => {
    router.push(`/candidate-profile?orcid_id=${orcidId}`);
  };
  // const response = use(API.User.search(query ? query : ""));

  useEffect(() => {
    API.User.search(query ? query : "").then((response) => {
      setResponse(response);
    });
  }, [query]);

  return (
    <div className="mx-16 flex flex-row gap-4 px-[131px]">
      <Filter />

      <div className="flex-1">
        <SearchSection text={searchQuery ? searchQuery : undefined} />
        <div className="mt-4 flex flex-col gap-4">
          {response ? (
            response.results.map((results) => (
              <Candidate
                key={results.data.orcid_id}
                onClick={() => navigateToCandidateProfile(results.data.orcid_id)}
                {...results}
              />
            ))
          ) : (
            <div role="status">
              <svg
                aria-hidden="true"
                className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
