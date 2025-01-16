import { User } from "@/model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "/userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000` }),
  tagTypes: ["search-user"],
  endpoints: (builder) => ({
    searchUser: builder.query<
      User.Search.ISearchApiResponse,
      { keyword: string }
    >({
      query: ({ keyword }) => ({
        url: `process_input`,
        method: "POST",
        body: { text: keyword },
      }),
      providesTags: (result, error, { keyword }) => [
        { type: "search-user", id: keyword },
      ],
    }),
  }),
});

export { userApi };
export const { useSearchUserQuery } = userApi; // Export the generated hook
