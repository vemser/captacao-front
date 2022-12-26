import { IUser } from "shared/interfaces";
import { apiSlice } from "../";

const authSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    authLogin: build.mutation<string, IUser>({
      query: (user) => ({
        url: "http://vemser-dbc.dbccompany.com.br:39000/vemser/usuario-back/usuario/login",
        method: "POST",
        body: user,
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAuthLoginMutation } = authSlice;
