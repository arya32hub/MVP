import Image from "next/image";
import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="flex h-[60px] w-[153px] flex-row items-center gap-[16px] rounded-2xl bg-white py-1.5 pl-4 pr-1.5 shadow-sm">
      <div className="font-inter decoration-skip-none text-left text-[14px] font-normal leading-[16.94px] text-[#A0AEBC]">
        My Profile
      </div>

      <Image
        src={"/profile-image.jpeg"}
        alt={"porfile image"}
        width={48}
        height={48}
        className="inline aspect-square rounded-full object-cover"
      />
    </div>
  );
};

export { Profile };
