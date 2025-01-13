import { Button, Icons, Text } from "@/components";
import Image from "next/image";

const Profile = () => {
  return (
    <div className="w-[306px] rounded-2xl bg-white px-6 pb-6 pt-12 shadow-md">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={"/profile-image.jpeg"}
          width={210}
          height={210}
          className="inline aspect-square rounded-xl object-cover"
          alt={"Profile Image"}
        />
      </div>
      <div className="mt-5 flex flex-col">
        <Text.H2 className="text-gray-900">Jack Jacobs</Text.H2>
        <div className="border-smoke my-5 border-b-[1px]" />
        <div className="flex flex-col gap-4">
          <Text.BodyMedium className="text-tornado flex flex-row items-center gap-[9px]">
            <Icons.Location /> United States
          </Text.BodyMedium>
          <Text.BodyMedium className="text-tornado flex flex-row items-center gap-[9px]">
            <Icons.Briefcase /> Doctor
          </Text.BodyMedium>
          <Text.BodyMedium className="text-tornado flex flex-row items-center gap-[9px]">
            <Icons.Language /> English, Russian
          </Text.BodyMedium>
          <Text.BodyMedium className="text-tornado flex flex-row items-center gap-[9px]">
            <Icons.PermanentJob /> GLINK INC
          </Text.BodyMedium>
        </div>
        <div className="border-smoke my-5 border-b-[1px]" />
        <div className="flex flex-col gap-[18.5px]">
          <Text.BodyMedium className="text-tornado flex flex-row items-center gap-[9px]">
            <Icons.Call /> +1 828 600 6006
          </Text.BodyMedium>
          <Text.BodyMedium className="text-tornado flex flex-row items-center gap-[9px]">
            <Icons.Mail />
            example@example.com
          </Text.BodyMedium>
        </div>
        <Button.PrimaryBig className="mt-5">Save</Button.PrimaryBig>
      </div>
    </div>
  );
};

const NothingToShow = () => {
  return (
    <Text.Body className="mt-4 flex h-full flex-row items-center justify-center gap-[2.5px] text-gray-500">
      <Icons.FileCorrupt /> Nothing to show
    </Text.Body>
  );
};

const Bio = () => {
  return (
    <div className="flex w-full flex-col gap-[50px] rounded-2xl bg-white px-6 pb-11 pt-6 shadow-md">
      <div className="flex flex-1 flex-col gap-3">
        <Text.H3 className="flex flex-row gap-3 text-gray-900">
          <Icons.MessageUser /> Bio
        </Text.H3>
        <NothingToShow />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Text.H3 className="flex flex-row gap-3 text-gray-900">
          <Icons.Student /> Educational Background
        </Text.H3>
        <NothingToShow />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Text.H3 className="flex flex-row gap-3 text-gray-900">
          <Icons.Certificate /> Grants received
        </Text.H3>
        <NothingToShow />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <Text.H3 className="flex flex-row gap-3 text-gray-900">
          <Icons.FileSearch /> Research Work
        </Text.H3>
        <NothingToShow />
      </div>
    </div>
  );
};

const CandidateProfile = () => {
  return (
    <div className="mx-16 flex flex-row gap-4 px-[131px]">
      <Profile />
      <Bio />
    </div>
  );
};

export default CandidateProfile;
