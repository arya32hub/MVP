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
  LoadingSpinner,
  SearchBar,
  Text,
} from "@/components";
import { useSearchUserQuery } from "@/store/reducers";
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
      <Button.Primary isActive={false} text={"Save"} className="max-w-[79px]" />
    </div>
  );
  return (
    <SearchBar.Container Footer={Footer}>
      <Button.IceCube svgLeft={SearchFocus} text={"Advanced Search"} />
      <SearchBar.MainBlue
        placeHolder="Type here..."
        value={text}
        onClick={navigateToSearch}
      />
    </SearchBar.Container>
  );
};

export default function Search() {
  const router = useRouter();

  const [loadingStep, setLoadingStep] = useState(0);
  const [dots, setDots] = useState(""); // State for animated dots
  const loadingMessages = [
    { message: "Analyzing query ", duration: 6000 }, // 2 seconds
    { message: "Finding relevant users ", duration: 10000 }, // 4 seconds
    { message: "Ranking users ", duration: 4000 }, // 3 seconds
  ];

  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const { data, isFetching } = useSearchUserQuery({
    keyword: query ? query : "",
  });

  // Handle loading step transitions
  useEffect(() => {
    if (isFetching && loadingStep < loadingMessages.length - 1) {
      const timeout = setTimeout(() => {
        setLoadingStep((prev) => prev + 1);
      }, loadingMessages[loadingStep].duration);

      return () => clearTimeout(timeout);
    }
  }, [isFetching]);

  // Handle dot animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "")); // Cycle through ., .., ...
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const navigateToCandidateProfile = (orcidId: string) => {
    router.push(`/candidate-profile?orcid_id=${orcidId}`);
  };

  return (
    <div className="relative mx-16 flex flex-row gap-4 px-[131px]">
      <Filter />
      <div className="flex-1">
        <SearchSection text={query ? query : undefined} />
        <div className="relative mt-4 flex h-full flex-col gap-4">
          {!isFetching && data ? (
            <>
              {data.results.map((results) => (
                <Candidate
                  key={results.data.orcid_id}
                  onClick={() =>
                    navigateToCandidateProfile(results.data.orcid_id)
                  }
                  {...results}
                />
              ))}
            </>
          ) : (
            <></>
          )}
          {isFetching ? (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="flex animate-bounce flex-row items-center justify-center gap-4 rounded-md bg-gray-100 p-3 shadow-md transition-all duration-200">
                <LoadingSpinner />
                <Text.BodyMedium className="flex flex-row gap-1 text-gray-800">
                  {loadingMessages[loadingStep].message}
                  <p className="w-4">{dots}</p>
                </Text.BodyMedium>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
