import React, { PropsWithChildren } from "react";

interface IProps {
  className?: string;
}

const H2: React.FC<PropsWithChildren & IProps> = ({ children, className }) => {
  return (
    <div
      className={`font-[Inter] text-2xl font-medium leading-[29.05px] ${className}`}
    >
      {children}
    </div>
  );
};

const H3: React.FC<PropsWithChildren & IProps> = ({ children, className }) => {
  return (
    <div
      className={`font-[Inter] text-xl font-medium leading-[24.2px] ${className}`}
    >
      {children}
    </div>
  );
};

const Body: React.FC<PropsWithChildren & IProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`font-[Inter] text-base font-normal leading-[19.36px] ${className}`}
    >
      {children}
    </div>
  );
};

const BodySmallMedium: React.FC<PropsWithChildren & IProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`font-[Inter] text-sm font-medium leading-[16.9px] ${className}`}
    >
      {children}
    </div>
  );
};

const BodyMedium: React.FC<PropsWithChildren & IProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`font-[Inter] text-base font-medium leading-[19.36px] ${className}`}
    >
      {children}
    </div>
  );
};

const BodySmall: React.FC<PropsWithChildren & IProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`font-[Inter] text-sm font-normal leading-[16.94px] ${className}`}
    >
      {children}
    </div>
  );
};

export { Body, BodyMedium, BodySmall, BodySmallMedium, H2, H3 };
