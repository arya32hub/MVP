import React, { PropsWithChildren } from "react";
import { Text } from ".";

const Chips: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Text.BodySmallMedium className="flex flex-row justify-center rounded-[58px] bg-ice-cube px-2 py-1 text-mountain-lake">
      {children}
    </Text.BodySmallMedium>
  );
};

export { Chips };
