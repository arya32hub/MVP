import { DownArrow } from "@/assets/svg";
import { Text } from "@/components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

interface IProps {
  svgLeft?: string | StaticImport;
  text: string;
  className?: string;
}

const Dropdown: React.FC<IProps> = ({ svgLeft, text, className }) => {
  return (
    <div
      className={`flex h-[58px] flex-row items-center justify-between rounded-2xl border-[1px] border-[#DDE0E3F4] py-[17.5px] pl-4 pr-2 ${className}`}
    >
      <div className="mr-[6px] flex flex-row items-center">
        {svgLeft !== undefined ? (
          <Image src={svgLeft} alt={"left svg"} />
        ) : (
          <></>
        )}
        <Text.Body className="ml-[6px] text-[#A0AEBC]">{text}</Text.Body>
      </div>
      <Image src={DownArrow} alt={"Down arrow"} />
    </div>
  );
};

export { Dropdown };
