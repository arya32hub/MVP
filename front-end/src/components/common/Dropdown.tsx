"use client";


import { DownArrow } from "@/assets/svg";
import { Text } from "@/components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useState } from "react";

interface IProps {
  svgLeft?: string | StaticImport | null;
  text: string;
  options: string[]; // List of dropdown options
  className?: string;
  textClassName?: string; // Custom class for text
  isOpen?: boolean; // Optional: externally control visibility
  onToggle?: () => void; // Optional: external toggle callback
  onSelect?: (value: string) => void; // Callback when an option is selected
}

const Dropdown: React.FC<IProps> = ({
  svgLeft,
  text = "-select-",
  options,
  className,
  textClassName,
  isOpen: isOpenProp,
  onToggle,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isControlled = typeof isOpenProp === "boolean";

  const handleToggle = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: string) => {
    if (onSelect) onSelect(option);
    if (isControlled && onToggle) {
      onToggle(); // Close dropdown externally
    } else {
      setIsOpen(false); // Close dropdown internally
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Dropdown Toggle */}
      <div
        className={`flex h-[58px] flex-row items-center justify-between rounded-2xl border-[1px] border-[#DDE0E3F4] py-[17.5px] pl-4 pr-2 cursor-pointer`}
        onClick={handleToggle}
        aria-expanded={isControlled ? isOpenProp : isOpen}
      >
        <div className="mr-[6px] flex flex-row items-center">
          {svgLeft && <Image src={svgLeft} alt="left svg" />}
          <Text.Body
            className={`ml-[6px] ${text === "-select-" ? "text-gray-500" : "text-black"} ${textClassName}`}
          >
            {text}
          </Text.Body>
        </div>
        <Image src={DownArrow} alt="Down arrow" />
      </div>

      {/* Dropdown Options */}
      {(isControlled ? isOpenProp : isOpen) && (
        <div className="absolute z-10 mt-2 w-full rounded-2xl border-[1px] border-[#DDE0E3F4] bg-white shadow-lg">
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 text-sm">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
