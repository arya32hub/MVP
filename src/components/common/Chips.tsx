import React, { PropsWithChildren } from "react";
import { Text } from ".";

const Chips: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Text.BodySmallMedium className="bg-ice-cube text-mountain-lake rounded-[58px] px-2 py-1">
      {children}
    </Text.BodySmallMedium>
  );
};

export { Chips };
