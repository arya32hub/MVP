import { Button, Icons, Text } from "@/components";
import Image from "next/image";

const Achievements = () => {
  return (
    <div className="flex flex-row gap-3">
      <Text.BodySmall className="flex h-[33px] w-[105px] flex-col items-center justify-center rounded-[32px] border-[1px] border-mountain-lake px-[6px] text-[#7B7C7E]">
        1997-2003
      </Text.BodySmall>
      <div>
        <div className="mt-[13px] h-[6px] w-[6px] self-center rounded-full bg-mountain-lake" />
      </div>

      <div className="flex w-full flex-col pt-1">
        <Text.H3 className="flex h-full flex-row border-b-[1px] border-smoke pb-2 font-normal text-main-blue">
          Cambridge University
        </Text.H3>
        <Text.Body className="mt-2 text-tornado">
          Lorem ipsum dolor sit amet consectetur. Volutpat dolor adipiscing
          laoreet vulputate nam in sed dictum.{" "}
        </Text.Body>
      </div>
    </div>
  );
};

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
        <div className="my-5 border-b-[1px] border-smoke" />
        <div className="flex flex-col gap-4">
          <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
            <Icons.Location /> United States
          </Text.BodyMedium>
          <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
            <Icons.Briefcase /> Doctor
          </Text.BodyMedium>
          <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
            <Icons.Language /> English, Russian
          </Text.BodyMedium>
          <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
            <Icons.PermanentJob /> GLINK INC
          </Text.BodyMedium>
        </div>
        <div className="my-5 border-b-[1px] border-smoke" />
        <div className="flex flex-col gap-4">
          <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
            <Icons.Call /> +1 828 600 6006
          </Text.BodyMedium>
          <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
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
      <div className="flex flex-1 flex-col gap-4">
        <Text.H3 className="flex flex-row gap-3 text-gray-900">
          <Icons.MessageUser /> Bio
        </Text.H3>
        <Text.Body className="text-tornado">
          Lorem ipsum dolor sit amet consectetur. Volutpat dolor adipiscing
          laoreet vulputate nam in sed dictum. Quam sed in magna lorem lobortis
          sed felis. Suspendisse tortor nibh feugiat ipsum sit ut malesuada. Ut
          faucibus dui ac feugiat consectetur.
        </Text.Body>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <Text.H3 className="flex flex-row gap-3 text-gray-900">
          <Icons.Student /> Educational Background
        </Text.H3>
        <Achievements />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <Text.H3 className="flex flex-row gap-3 text-gray-900">
          <Icons.Certificate /> Grants received
        </Text.H3>
        <NothingToShow />
      </div>

      <div className="flex flex-1 flex-col gap-4">
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
