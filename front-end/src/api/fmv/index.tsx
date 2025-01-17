import axios from "axios";

type TCalculateFMV = (input: {
  country: string;
  jobPosition: string;
  tiering: string;
}) => Promise<{ fmv: number }>;

const calculateFMV: TCalculateFMV = async (input) => {
  try {
    console.log("input", input);
    const response = await axios.post(
      `http://localhost:8000/calculate_fmv`,
      {
        country: input.country,
        position: input.jobPosition,
        tier: input.tiering,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("API ERROR: \n", error);
    throw new Error("Failed to calculate FMV");
  }
};

export { calculateFMV };
