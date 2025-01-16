import { User } from "@/model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "/userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000` }),
  tagTypes: ["search-user", "get_user_data"],
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
    getCandidateProfile: builder.query<User.Search.Schema, { orcidId: string }>(
      {
        query: ({ orcidId }) => ({
          url: "get_user_data",
          method: "POST",
          body: { text: orcidId },
        }),
        providesTags: (result, error, { orcidId }) => [
          { type: "get_user_data", id: orcidId },
        ],
      },
    ),
  }),
});

export { userApi };
export const { useSearchUserQuery, useGetCandidateProfileQuery } = userApi; // Export the generated hook
