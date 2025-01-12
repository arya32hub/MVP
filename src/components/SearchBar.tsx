import { RightArrow, SearchFocus } from "@/assets/svg";
import Image from "next/image";

const AdvancedSearchButton = () => {
  return (
    <div className="flex-2 flex h-[54px] flex-row items-center justify-center gap-[11px] rounded-2xl bg-[#F1F7FF] px-[14px] text-sm">
      <Image
        src={SearchFocus}
        alt={"search icon"}
        width={16.67}
        height={16.67}
      />
      <div className="text-sm font-normal leading-4 text-[#00236C]">
        Advanced Search
      </div>
    </div>
  );
};

const SearchField = () => {
  return (
    <div className="flex-3 ml-2 flex flex-1 flex-row items-center rounded-2xl border-[1px] pl-4">
      <input
        className="flex-1 px-4 py-2 text-black focus:outline-none"
        type="text"
        placeholder="Type here..."
      />
      <div className="m-[6px] flex h-[42px] w-[92px] items-center justify-center rounded-[10px] bg-[#00236C]">
        <Image src={RightArrow} alt={"Search Button"} className="h-6 w-6" />
      </div>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="mt-6 flex flex-row rounded-2xl bg-white p-2 shadow-sm">
      <AdvancedSearchButton />
      <SearchField />
    </div>
  );
};

export { SearchBar };
