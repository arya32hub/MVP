import { Text } from "@/components";
import React from "react";

interface IProps {
  date?: string | number;
  heading: string;
  accomplishments?: string[];
}

const CareerTimelineItem: React.FC<IProps> = ({
  date,
  heading,
  accomplishments,
}) => {
  return (
    <div className="flex flex-row gap-3">
      {date ? (
        <Text.BodySmall className="flex h-[33px] w-[155px] flex-col items-center justify-center rounded-[32px] border-[1px] border-mountain-lake px-[6px] text-[#7B7C7E]">
          {date}
        </Text.BodySmall>
      ) : (
        <></>
      )}
      <div>
        <div className="mt-[13px] h-[6px] w-[6px] self-center rounded-full bg-mountain-lake" />
      </div>
      <div className="flex w-full flex-col pt-1">
        <Text.H3 className="flex h-full flex-row border-b-[1px] border-smoke pb-2 font-normal text-main-blue">
          {heading}
        </Text.H3>
        <Text.Body className="mt-2 text-tornado">
          {accomplishments ? (
            accomplishments.map((accomplishment, index) => (
              <div key={index}>{accomplishment}</div>
            ))
          ) : (
            <></>
          )}
        </Text.Body>
      </div>
    </div>
  );
};

export { CareerTimelineItem };
