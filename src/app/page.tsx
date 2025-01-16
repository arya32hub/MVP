"use client";

import { SearchFocus } from "@/assets/svg";
import { Button, SearchBar } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigateToSearch = (query: string) => {
    router.push(`/search?query=${query}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion); // Update search bar value with clicked suggestion
  };

  return (
    <div className="mx-16 mb-4 flex flex-col items-center justify-center px-[292px] pt-[118.25px]">
      <Image
        src="/logo-big.png"
        width={215.53}
        height={104.94}
        alt={"glink logo"}
      />
      <div className="mt-[54px] flex w-full flex-col">
        <div className="font-inter w-full text-center text-[37px] font-medium leading-[44.78px] text-[#333335]">
          What can I help you with?
        </div>
        <SearchBar.Container className="mt-6">
          <SearchBar.MainBlue
            placeHolder="Who are you looking for?"
            value={searchQuery} // Controlled value
            onClick={(query) => {
              if (query) {
                navigateToSearch(query); // Only call with a valid string
              } else {
                console.warn("Search query is undefined.");
              }
            }}
          />
        </SearchBar.Container>
        <div className="mt-4 flex flex-row items-center gap-[26.8px]">
          <div className="items-center font-[Inter] text-sm font-normal leading-4 text-[#98A0B3]">
            Suggested:
          </div>
          {[
            "We are hiring for a neurodegenerative disease research team. Search for researchers with a strong publication record in Alzheimer’s or Parkinson’s, experience leading academic or industry research groups, and connections to major academic institutions",
            "Dolor Sit",
            "Amet Consectetur",
            "Adipiscing Elit",
          ].map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)} // Set suggestion text
              className="cursor-pointer rounded-[34px] border-[1px] border-[#87AEEE] bg-white px-4 py-2 font-[Inter] text-[14px] font-normal text-[#7B7C7E] hover:bg-[#E6F1FF] truncate-box"
              title={suggestion} // Optional: Display full text on hover as tooltip
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
