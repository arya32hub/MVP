"use client";
import { Text } from "@/components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { PropsWithChildren } from "react";
import { BodyMedium } from "./Text";

interface IProps {
  text: string;
  className?: string;
}

interface IClassNameProps {
  className?: string;
}

type OnClick = (keyword?: string) => void;
interface IOnClick {
  onClick?: OnClick;
}

interface ISvgProps {
  svgLeft?: string | StaticImport;
}

interface IActiveProps {
  isActive?: boolean;
}

const SmallBase: React.FC<PropsWithChildren & IClassNameProps & IOnClick> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={`h-[33px] rounded-lg border-[1px] px-3.5 py-2 ${className}`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

const BigBase: React.FC<PropsWithChildren & IClassNameProps & IOnClick> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={`h-[43px] rounded-lg border-[1px] px-3 py-5 ${className}`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};

const SecondarySmall: React.FC<
  PropsWithChildren & IClassNameProps & IOnClick
> = ({ children, className, onClick }) => {
  return (
    <SmallBase
      className={`border-mountain-lake bg-transparent ${className}`}
      onClick={onClick}
    >
      <Text.BodySmallMedium className="text-mountain-lake">
        {children}
      </Text.BodySmallMedium>
    </SmallBase>
  );
};

const GraySmall: React.FC<PropsWithChildren & IClassNameProps & IOnClick> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <SmallBase
      className={`border-gray-500 bg-transparent ${className}`}
      onClick={onClick}
    >
      <Text.BodySmallMedium className="text-gray-500">
        {children}
      </Text.BodySmallMedium>
    </SmallBase>
  );
};

const PrimarySmall: React.FC<
  PropsWithChildren & IClassNameProps & IOnClick
> = ({ children, className, onClick }) => {
  return (
    <SmallBase
      className={`border-main-blue bg-main-blue text-white ${className}`}
      onClick={onClick}
    >
      <Text.BodySmallMedium className="text-white">
        {children}
      </Text.BodySmallMedium>
    </SmallBase>
  );
};

const PrimarySmallLight: React.FC<PropsWithChildren & IClassNameProps> = ({
  children,
  className,
}) => {
  return (
    <SmallBase
      className={`border-mountain-lake bg-mountain-lake text-white ${className}`}
    >
      <Text.BodyMedium className="text-white">{children}</Text.BodyMedium>
    </SmallBase>
  );
};

const PrimaryBig: React.FC<PropsWithChildren & IClassNameProps & IOnClick> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <BigBase
      className={`flex h-[43px] flex-col items-center justify-center rounded-lg border-[1px] border-main-blue bg-main-blue px-5 py-3 ${className}`}
      onClick={onClick}
    >
      <BodyMedium className="text-center text-white">{children}</BodyMedium>
    </BigBase>
  );
};

const PrimaryBigLight: React.FC<
  PropsWithChildren & IClassNameProps & IOnClick
> = ({ children, className, onClick }) => {
  return (
    <BigBase
      className={`flex h-[43px] flex-col items-center justify-center rounded-lg border-[1px] border-mountain-lake bg-mountain-lake px-3 py-5 ${className}`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <BodyMedium className="text-white">{children}</BodyMedium>
    </BigBase>
  );
};

const SecondaryBig: React.FC<PropsWithChildren & IClassNameProps> = ({
  children,
  className,
}) => {
  return (
    <BigBase
      className={`h-[43px] rounded-lg border-[1px] border-mountain-lake bg-transparent px-3 py-5 ${className}`}
    >
      <BodyMedium className="text-mountain-lake">{children}</BodyMedium>
    </BigBase>
  );
};

const Secondary: React.FC<IProps & IActiveProps & IOnClick> = ({
  text,
  className,
  isActive = true,
  onClick,
}) => {
  return (
    <button
      className={`${isActive ? "text-[#87AEEE]" : "text-[#A0AEBC]"} flex flex-1 flex-row items-center justify-center rounded-lg border-[1px] ${
        isActive ? "border-[#87AEEE]" : "border-[#A0AEBC]"
      } px-[14px] py-2 font-[Inter] text-sm font-medium leading-[16.94px] ${className}`}
      onClick={() => {
        if (onClick) onClick();
      }}
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
      className={`flex-2 flex h-[54px] flex-row items-center justify-center gap-[11px] rounded-2xl bg-ice-cube px-[14px] text-sm ${className}`}
    >
      {svgLeft !== undefined ? (
        <Image src={svgLeft} alt={"search icon"} width={16.67} height={16.67} />
      ) : (
        <></>
      )}

      <div className="text-sm font-normal leading-4 text-main-blue">{text}</div>
    </div>
  );
};

export {
  GraySmall,
  IceCube,
  Primary,
  PrimaryBig,
  PrimaryBigLight,
  PrimarySmall,
  PrimarySmallLight,
  Secondary,
  SecondaryBig,
  SecondarySmall,
};
