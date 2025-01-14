import { User } from "@/model";
import axios from "axios";

type TSearch = (keyword: string) => Promise<User.Search.ISearchApiResponse>;

const search: TSearch = async (keyword: string) => {
  try {
    // const response = await axios({
    //   method: "POST",
    //   url: `http://localhost:8000/process_input`,
    //   data: {
    //     text: keyword,
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
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
  } catch (error) {
    console.log("API ERROR \n", error);
  }
};

export { search };
