import { API } from "@/api";
import { User } from "@/model";
import { useState } from "react";

export const useTieringData = (orcidId: string | null) => {
  const [tiering, setTiering] = useState<User.Search.Schema["tiering"] | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTiering = async () => {
    if (!orcidId) return;

    setLoading(true);
    try {
      const tieringData = await API.User.getTieringProfile(orcidId);
      setTiering(tieringData.tiering);
    } catch (err) {
      setError("Failed to fetch tiering data");
      console.error("Tiering API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { tiering, loading, error, fetchTiering };
};
