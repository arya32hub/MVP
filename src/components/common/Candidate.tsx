import { User } from "@/model";
import Image from "next/image";
import { Bookmark, Button, Checkbox, Chips, Text } from ".";
import { Icons } from "..";

const generateAvatar = (initials: string, bgColor: string = "#6A5ACD") => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="123" height="123" style="border-radius: 16px; background: ${bgColor};">
      <text x="50%" y="50%" font-size="48" fill="white" text-anchor="middle" alignment-baseline="middle" font-family="Arial, sans-serif">
        ${initials}
      </text>
    </svg>
  `;

  // Encode the SVG as Base64 using a UTF-8 encoder
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
};

interface IOnClick {
  onClick?: () => void;
}

const Profile: React.FC<Partial<User.Search.Schema>> = (props) => {
  const firstName = props.data?.first_name || "";
  const lastName = props.data?.last_name || "";
  const initials =
    (firstName.charAt(0).toUpperCase() || "") +
    (lastName.charAt(0).toUpperCase() || "");

  // Generate dynamic avatar with initials
  const avatarSrc = generateAvatar(initials);

  return (
    <div className="flex flex-row gap-4">
      <Image
        alt="Profile Picture"
        src={avatarSrc}
        width={75}
        height={75}
        className="h-[75px] w-[75px] rounded-xl object-cover"
      />
      <div className="flex w-36 flex-col gap-[10px]">
        <div className="flex flex-row items-baseline gap-[7px]">
          <Text.H3 className="text-gray-900">
            {props.data?.first_name} {props.data?.last_name}
          </Text.H3>
          <Text.Body className="text-gray-500">24y/o</Text.Body>
        </div>
        <Text.BodySmallMedium className="flex flex-row gap-[7px] text-gray-500">
          <Icons.Briefcase />
          {props.level_two_data?.career_item?.[0]?.career_role}
        </Text.BodySmallMedium>
        <Text.BodySmallMedium className="flex flex-row gap-[7px] text-gray-500">
          <Icons.Location /> {props.key_metrics?.location?.join(", ")}
        </Text.BodySmallMedium>
        <Text.BodySmallMedium className="flex flex-row gap-[7px] text-gray-500">
          <Icons.PermanentJob />
          {props.level_two_data?.career_item?.[0]?.career_institution}
        </Text.BodySmallMedium>
      </div>
    </div>
  );
};

const Divider = () => (
  <div className="mx-[37px] h-full border-[1px] border-l border-smoke" />
);

const Candidate: React.FC<IOnClick & Partial<User.Search.Schema>> = ({
  onClick,
  ...schema
}) => {
  return (
    <div className="flex flex-row rounded-2xl bg-white p-4 text-main-blue shadow-md">
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <Checkbox.Default />
          <Profile {...schema} />
        </div>

        <Divider />

        <div className="flex h-full flex-col gap-2">
          <Chips>
            {schema.level_two_data?.grant_research.length}+ Grants received
          </Chips>
          <Chips>
            {schema.level_two_data?.journal_publications.length}+ Journal
            Publications
          </Chips>
          <Chips>{schema.key_metrics?.yoe}+ Years of Experience</Chips>
        </div>
        <Divider />
        <div className="flex h-full flex-col items-end justify-between">
          <Bookmark />
          <Button.SecondarySmall onClick={onClick}>View</Button.SecondarySmall>
        </div>
      </div>
    </div>
  );
};

export { Candidate };
