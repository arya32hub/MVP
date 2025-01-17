import { User } from "@/model";

import axios from "axios";

type TSearch = (keyword: string) => Promise<User.Search.ISearchApiResponse>;
type TGetCandidateProfile = (orcidId: string) => Promise<User.Search.Schema>;
type TTieringProfile = (orcidId: string) => Promise<User.Search.FullTier>;

const search: TSearch = async (keyword: string) => {
  console.log("Searching for:", keyword);
  const response = await axios.post(
    `http://localhost:8000/process_input`,
    {
      text: keyword,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

const getCandidateProfile: TGetCandidateProfile = async (orcidId: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/get_user_data`,
      {
        text: orcidId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log("API ERROR \n", error);
    throw new Error("Failed to fetch candidate profile");
  }
};

const getTieringProfile: TTieringProfile = async (orcidId: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/get_tier`,
      {
        text: orcidId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log("API ERROR \n", error);
    throw new Error("Failed to fetch candidate profile");
  }
};

export { getCandidateProfile, getTieringProfile, search };
