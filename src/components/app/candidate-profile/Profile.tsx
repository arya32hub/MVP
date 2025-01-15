import { Icons } from "@/components";
import { Button, Text } from "@/components/common";
import { User } from "@/model";
import { generateAvatar } from "@/utils";
import Image from "next/image";

const Profile = ({ user }: { user: User.Search.Schema["data"] }) => {
  const firstName = user.first_name || "";
  const lastName = user.last_name || "";
  const initials =
    (firstName.charAt(0).toUpperCase() || "") +
    (lastName.charAt(0).toUpperCase() || "");

  // Generate dynamic avatar with initials
  const avatarSrc = generateAvatar(initials);

  return (
    <div>
      <div className="w-[306px] rounded-2xl bg-white px-6 pb-6 pt-12 shadow-md">
        <div className="flex flex-col items-center justify-center">
          <Image
            alt="Profile Picture"
            src={avatarSrc}
            width={75}
            height={75}
            className="h-[75px] w-[75px] rounded-xl object-cover"
          />
        </div>
        <div className="mt-5 flex flex-col">
          <Text.H2 className="text-gray-900">
            {user.first_name} {user.last_name}
          </Text.H2>
          <div className="my-5 border-b-[1px] border-smoke" />
          <div className="flex flex-col gap-4">
            {user.contact_address.length > 0 ? (
              <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
                <Icons.Location /> {user.contact_address.join(", ")}
              </Text.BodyMedium>
            ) : (
              <></>
            )}

            <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
              <div>
                <Icons.Briefcase />
              </div>

              {user.keywords.join(", ")}
            </Text.BodyMedium>
            <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
              <div>
                <Icons.Language />
              </div>
              EN
            </Text.BodyMedium>
          </div>
          <Button.PrimaryBig className="mt-5">Save</Button.PrimaryBig>
        </div>
      </div>
    </div>
  );
};

export { Profile };
