import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

interface IProps {
  text: string;
  className?: string;
}

interface ISvgProps {
  svgLeft?: string | StaticImport;
}

interface IActiveProps {
  isActive?: boolean;
}

const Secondary: React.FC<IProps & IActiveProps> = ({
  text,
  className,
  isActive = true,
}) => {
  return (
    <button
      className={`${isActive ? "text-[#87AEEE]" : "text-[#A0AEBC]"} flex flex-1 flex-row items-center justify-center rounded-lg border-[1px] ${
        isActive ? "border-[#87AEEE]" : "border-[#A0AEBC]"
      } px-[14px] py-2 font-[Inter] text-sm font-medium leading-[16.94px] ${className}`}
    >
      {text}
    </button>
  );
};

const Primary: React.FC<IProps & IActiveProps> = ({ text, className }) => {
  return (
    <button
      className={`flex flex-1 flex-row items-center justify-center rounded-lg border-[1px] border-[#87AEEE] bg-[#87AEEE] px-[14px] py-2 font-[Inter] text-sm font-medium leading-[16.94px] text-white ${className} `}
    >
      {text}
    </button>
  );
};

const IceCube: React.FC<IProps & ISvgProps> = ({
  text,
  svgLeft,
  className,
}) => {
  return (
    <div
      className={`flex-2 flex h-[54px] flex-row items-center justify-center gap-[11px] rounded-2xl bg-[#F1F7FF] px-[14px] text-sm ${className}`}
    >
      {svgLeft !== undefined ? (
        <Image src={svgLeft} alt={"search icon"} width={16.67} height={16.67} />
      ) : (
        <></>
      )}
      <div className="text-sm font-normal leading-4 text-[#00236C]">{text}</div>
    </div>
  );
};

export { IceCube, Primary, Secondary };
