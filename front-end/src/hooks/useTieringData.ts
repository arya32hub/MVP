import { useState, useEffect, useCallback } from "react";
import { API } from "@/api";
import { User } from "@/model";

export const useTieringData = (orcidId: string | null) => {
  const [tiering, setTiering] = useState<User.Search.FullTier | null>(
    null,
  );  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Define fetchTiering as a reusable function
  const fetchTiering = async () => {
    if (!orcidId) return;

    setLoading(true);
    try {
      const tieringData = await API.User.getTieringProfile(orcidId);
      setTiering(tieringData);
    } catch (err) {
      setError("Failed to fetch tiering data");
      console.error("Tiering API Error:", err);
    } finally {
      setLoading(false);
    }
  };
  return { tiering, loading, error, fetchTiering };
};