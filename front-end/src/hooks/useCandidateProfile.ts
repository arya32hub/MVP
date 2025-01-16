import { API } from "@/api";
import { User } from "@/model";
import { useState, useEffect } from "react";

export const useCandidateProfile = (orcidId: string | null) => {
  const [profile, setProfile] = useState<User.Search.Schema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orcidId) {
      API.User.getCandidateProfile(orcidId)
        .then((data) => {
          setProfile(data);
        })
        .catch(() => {
          setError("Failed to load profile");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orcidId]);

  return { profile, loading, error };
};
