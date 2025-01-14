import { User } from "@/model";
import Image from "next/image";
import { Bookmark, Button, Checkbox, Chips, Text } from ".";
import { Icons } from "..";

interface IOnClick {
  onClick?: () => void;
}

const Profile = () => {
  return (
    <div className="flex flex-row gap-4">
      <Image
        alt={"Profile Picture"}
        src={"/profile-image.jpeg"}
        width={123}
        height={123}
        className="h-[123px] w-[123px] rounded-xl object-cover"
      />
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-row items-baseline gap-[7px]">
          <Text.H3 className="text-gray-900">Jack Jacobs </Text.H3>
          <Text.Body className="text-gray-500">24y/o</Text.Body>
        </div>
        <Text.BodySmallMedium className="flex flex-row gap-[7px] text-gray-500">
          <Icons.Briefcase />
          Doctor
        </Text.BodySmallMedium>
        <Text.BodySmallMedium className="flex flex-row gap-[7px] text-gray-500">
          <Icons.Language /> English, Russian
        </Text.BodySmallMedium>
        <Text.BodySmallMedium className="flex flex-row gap-[7px] text-gray-500">
          <Icons.PermanentJob />
          GLINK INC
        </Text.BodySmallMedium>
      </div>
    </div>
  );
};

const ChipsList = () => {
  return (
    <div className="flex h-full flex-col gap-2">
      <Chips>5+ Grant received</Chips>
      <Chips>4+ Years experience</Chips>
    </div>
  );
};

const Divider = () => (
  <div className="mx-[37px] h-full border-[1px] border-l border-smoke" />
);

const Candidate: React.FC<IOnClick & Partial<User.Search.Schema>> = ({
  onClick,
}) => {
  return (
    <div className="flex flex-row rounded-2xl bg-white p-4 text-main-blue shadow-md">
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <Checkbox.Default />
          <Profile />
        </div>

        <Divider />
        <ChipsList />
        <Divider />
        <div className="flex h-full flex-col items-end justify-between">
          <Bookmark />
          <Button.SecondarySmall onClick={onClick}>
            View Profile
          </Button.SecondarySmall>
        </div>
      </div>
    </div>
  );
};

export { Candidate };
