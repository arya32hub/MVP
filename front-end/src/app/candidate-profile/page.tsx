"use client";

import { Button, CandidateProfile, LoadingSpinner, Text } from "@/components";
import { useTieringData } from "@/hooks";
import { useGetCandidateProfileQuery } from "@/store/reducers";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const CandidateProfileScreen = () => {
  const searchParams = useSearchParams();
  const orcidId = searchParams.get("orcid_id") ?? "";

  const {
    data: profile,
    isFetching: loading,
    error: profileError, 
  } = useGetCandidateProfileQuery({ orcidId });
  const {
    tiering,
    loading: tieringLoading,
    error: tieringError,
    fetchTiering,
  } = useTieringData(orcidId);

  const error = useMemo(() => {
    if (profileError && tieringError) {
      return `${profileError} | ${tieringError}`;
    }
    return profileError || tieringError || null;
  }, [profileError, tieringError]);

  if (error) {
    return <Text.Body className="text-red-500">{String(error)}</Text.Body>;
  }

  return (
    <div className="mx-16 flex h-screen flex-row gap-4 px-[131px]">
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : null}

      {!tiering && (
        <div className="absolute right-4 top-4">
          <Button.PrimarySmall
            className="animate-bounce"
            onClick={fetchTiering}
          >
            {tieringLoading ? "Get Tier" : "Loading..."}
          </Button.PrimarySmall>
        </div>
      )}

      {profile && (
        <>
          {/* Profile Section (Left Side) */}
          <div className="flex w-1/3 flex-col">
            <CandidateProfile.Profile user={profile} />
          </div>

          {/* Bio and Other Sections (Right Side) */}
          <div className="flex w-2/3 flex-col gap-4">
            <div className="rounded-lg border border-gray-300 p-6 bg-white">
              <CandidateProfile.Bio
                levelTwoData={profile.level_two_data}
                tiering={tiering}
              />
            </div>
            {/* Add other sections like Journal Publications here */}
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateProfileScreen;