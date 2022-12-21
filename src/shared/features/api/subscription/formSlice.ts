import { IFormResponse, IFormSubscribeTextResponse } from "shared/interfaces";
import { apiSlice } from "../";

const token = "1031609a66722e535e436d70d478ce";
const formSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInputs: builder.query<IFormResponse, void>({
      query: () => ({
        url: "https://graphql.datocms.com/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
          query MyQuery {
            formulario {
              email
              nome
              estado
              cpf
              dataNascimento
              cidade
              telefone
              neurodiversidade
            }
          }
        `,
        }),
      }),
    }),
    getSubscribeText: builder.query<IFormSubscribeTextResponse, void>({
      query: () => ({
        url: "https://graphql.datocms.com/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
          query MyQuery {
            formulario {
              titulo
              content
              backgroundImage {
                url
              }
            }
          }
        `,
        }),
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetInputsQuery, useGetSubscribeTextQuery } = formSlice;
