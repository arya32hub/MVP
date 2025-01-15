"use client";


import { Button, Icons, Text } from "@/components";
import React, { useEffect, useState } from "react";
import { API } from "@/api";
import { User } from "@/model";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";


// const UserBio = ({ user }: { user: User.Search.Schema["data"] }) => {
//   return (
//     <div className="flex flex-col gap-4">
//       <Text.H3 className="flex flex-row gap-3 text-gray-900">
//         <Icons.FileSearch /> User Bio
//       </Text.H3>
//       <Text.Body className="text-tornado">{user.bio}</Text.Body>
//     </div>
//   );
// }


const CareerItem = ({ careerItems }: { careerItems: User.Search.Schema["level_two_data"]["career_item"] }) => {
  if (!careerItems.length) return null;
  return (
    <>
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.PermanentJob /> Employment History
      </Text.H3>
      {careerItems.map((career, index) => (
        <div key={index} className="flex flex-row gap-3">
          <Text.BodySmall className="flex h-[33px] w-[155px] flex-col items-center justify-center rounded-[32px] border-[1px] border-mountain-lake px-[6px] text-[#7B7C7E]">
            {career.career_start_date}-{career.career_end_date}
          </Text.BodySmall>
          <div>
            <div className="mt-[13px] h-[6px] w-[6px] self-center rounded-full bg-mountain-lake" />
          </div>
          <div className="flex w-full flex-col pt-1">
            <Text.H3 className="flex h-full flex-row border-b-[1px] border-smoke pb-2 font-normal text-main-blue">
              {career.career_role}
            </Text.H3>
            <Text.Body className="mt-2 text-tornado">{career.career_institution}</Text.Body>
          </div>
        </div>
      ))}
    </>
  );
};


const Achievements = ({ education }: { education: User.Search.Schema["level_two_data"]["education"] }) => {
  if (!education.length) return null;
  return (
    <>
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.Student /> Education
      </Text.H3>
      {education.map((edu, index) => (
        <div key={index} className="flex flex-row gap-3">
          <Text.BodySmall className="flex h-[33px] w-[155px] flex-col items-center justify-center rounded-[32px] border-[1px] border-mountain-lake px-[6px] text-[#7B7C7E]">
            {edu.education_start_date}-{edu.education_end_date}
          </Text.BodySmall>
          <div>
            <div className="mt-[13px] h-[6px] w-[6px] self-center rounded-full bg-mountain-lake" />
          </div>
          <div className="flex w-full flex-col pt-1">
            <Text.H3 className="flex h-full flex-row border-b-[1px] border-smoke pb-2 font-normal text-main-blue">
              {edu.education_institution}
            </Text.H3>
            <Text.Body className="mt-2 text-tornado">{edu.education_department}</Text.Body>
          </div>
        </div>
      ))}
    </>
  );
};

const Profile = ({ user }: { user: User.Search.Schema["data"] }) => {
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
        <Text.H2 className="text-gray-900">
          {user.first_name} {user.last_name}
        </Text.H2>
        <div className="my-5 border-b-[1px] border-smoke" />
        <div className="flex flex-col gap-4">
          <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
            <Icons.Location /> {user.contact_address.join(", ")}
          </Text.BodyMedium>
          <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
            <Icons.Briefcase /> {user.keywords.join(", ")}
          </Text.BodyMedium>
          <Text.BodyMedium className="flex flex-row items-center gap-[9px] text-tornado">
            <Icons.Language /> {user.emails.join(", ")}
          </Text.BodyMedium>
        </div>
        <Button.PrimaryBig className="mt-5">Save</Button.PrimaryBig>
      </div>
    </div>
  );
};

const BookPublications = ({ publications, title }: { publications: User.Search.Schema["level_two_data"]["book_publications"], title: string }) => {
  if (!publications.length) return null;
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.FileSearch /> {title}
      </Text.H3>
      {publications.map((pub, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Text.BodySmall className="text-main-blue font-semibold">{pub.book_publication_title}</Text.BodySmall>
          <Text.BodySmall className="text-tornado">
            ({pub.book_publication_end_date}). {pub.book_publication_bookname}
          </Text.BodySmall>
        </div>
      ))}
    </div>
  );
};

const JournalPublications = ({ publications, title }: { publications: User.Search.Schema["level_two_data"]["journal_publications"], title: string }) => {
  if (!publications.length) return null;
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.FileSearch /> {title}
      </Text.H3>
      {publications.map((pub, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Text.BodySmall className="text-main-blue font-semibold">{pub.journal_publication_title}</Text.BodySmall>
          <Text.BodySmall className="text-tornado">
            ({pub.journal_publication_end_date}). {pub.journal_publication_journal_name}
          </Text.BodySmall>
        </div>
      ))}
    </div>
  );
};

const OtherPublications = ({ publications, title }: { publications: User.Search.Schema["level_two_data"]["other_publications"], title: string }) => {
  if (!publications.length) return null;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.FileSearch /> {title}
      </Text.H3>
      {publications.map((pub, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Text.BodySmall className="text-main-blue font-semibold">{pub.publication_title}</Text.BodySmall>
          <Text.BodySmall className="text-tornado">
            ({pub.publication_end_date}). {pub.publication_identifier}
          </Text.BodySmall>
        </div>
      ))}
    </div>
  );
};

const Grants = ({ grants }: { grants: User.Search.Schema["level_two_data"]["grant_research"] }) => {
  if (!grants.length) return null;
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.Certificate /> Grants Received
      </Text.H3>
      {grants.map((grant, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Text.BodySmall className="text-main-blue font-semibold">{grant.grant_title}</Text.BodySmall>
          <Text.BodySmall className="text-tornado">
            {grant.grant_agency}, {grant.grant_end_date}
          </Text.BodySmall>
        </div>
      ))}
    </div>
  );
};

const ReviewerRoles = ({ roles }: { roles: User.Search.Schema["level_two_data"]["reviewer_role"] }) => {
  if (!roles.length) return null;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.FileSearch /> Reviewer Roles
      </Text.H3>
      {roles.map((role, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Text.BodySmall className="text-main-blue font-semibold">{role.reviewer_role}</Text.BodySmall>
          <Text.BodySmall className="text-tornado">
            {role.reviewer_organization}, {role.reviewer_end_date}
          </Text.BodySmall>
        </div>
      ))}
    </div>
  );
};

const TieringSection = ({ tiering }: { tiering: User.Search.Schema["tiering"] | null }) => {
  if (!tiering) return null;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Text.H3 className="flex flex-row gap-3 text-gray-900">
        <Icons.FileSearch /> Tiering Data
      </Text.H3>
      {Object.entries(tiering).map(([key, value]) => (
        key !== "total_score" && value ? (
          <div key={key} className="flex flex-col gap-2">
            <Text.BodySmall className="text-main-blue font-semibold">
              {key.replace(/_/g, " ").toUpperCase()}
            </Text.BodySmall>
            <Text.BodySmall className="text-tornado">
              Analysis: {value.analysis}, Score: {value.score}
            </Text.BodySmall>
          </div>
        ) : null
      ))}
      {tiering.total_score && (
        <div className="flex flex-col gap-2">
          <Text.BodySmall className="text-green-600 font-bold text-xl">
            Total Score: {tiering.total_score}
          </Text.BodySmall>
        </div>
      )}
    </div>
  );
};

const Bio = ({ levelTwoData, tiering }: { levelTwoData: User.Search.Schema["level_two_data"], tiering: User.Search.Schema["tiering"] | null }) => {
  return (
    <div className="flex w-full flex-col gap-[50px] rounded-2xl bg-white px-6 pb-11 pt-6 shadow-md">
      <CareerItem careerItems={levelTwoData.career_item} />
      <Achievements education={levelTwoData.education} />

      <JournalPublications publications={levelTwoData.journal_publications} title="Journal Publications" />
      <BookPublications publications={levelTwoData.book_publications} title="Book Publications" />
      <OtherPublications publications={levelTwoData.other_publications} title="Other Publications" />
      <Grants grants={levelTwoData.grant_research} />
      <ReviewerRoles roles={levelTwoData.reviewer_role} />
      <TieringSection tiering={tiering} />
    </div>
  );
};

const CandidateProfile = () => {
  const [profile, setProfile] = useState<User.Search.Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tiering, setTiering] = useState<User.Search.Schema["tiering"] | null>(null); // State for tiering data
  const [tieringLoading, setTieringLoading] = useState<boolean>(false); // Loading state for button
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const orcidId = searchParams.get("orcid_id");

  useEffect(() => {
    if (orcidId) {
      API.User.getCandidateProfile(orcidId)
        .then((data) => {
          setProfile(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to load profile");
          setLoading(false);
        });
    }
  }, [orcidId]);

  const handleGetTiering = async () => {
    if (!orcidId) return;

    setTieringLoading(true);
    try {
      const tieringData = await API.User.getTieringProfile(orcidId);
      setTiering(tieringData.tiering); // Assuming `tiering` is the new field in the response
    } catch (error) {
      setError("Failed to fetch tiering data");
    } finally {
      setTieringLoading(false);
    }
  };

  if (loading) {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <Text.Body className="text-red-500">{error}</Text.Body>;
  }

  if (!profile) {
    return <Text.Body className="text-gray-500">Profile not found.</Text.Body>;
  }

  return (
    <div className="mx-16 flex flex-row gap-4 px-[131px]">
      <div className="absolute top-4 right-4">
        <Button.PrimarySmall onClick={handleGetTiering}>
          {tieringLoading ? "Loading..." : "Get Tiering"}
        </Button.PrimarySmall>
      </div>

      <Profile user={profile.data} />
      <Bio levelTwoData={profile.level_two_data} tiering={tiering} />
    </div>
  );
};

export default CandidateProfile;