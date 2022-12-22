import { Button, Chip, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { SubscribeData } from "shared/interfaces";

const columns = [
  {
    field: "tipo",
    headerName: "Tipo",
    width: 120,
    renderCell: (params: any) => {
      return (
        <Chip
          label={params.value}
          sx={{ borderRadius: 1, boxShadow: 1, width: "100%" }}
          color={
            params.value === "Pessoal"
              ? "primary"
              : params.value === "Acadêmico"
              ? "success"
              : "secondary"
          }
        />
      );
    },
  },
  {
    field: "pergunta",
    headerName: "Pergunta",
    minWidth: 180,
    flex: 1,
  },
  {
    field: "resposta",
    headerName: "Resposta",
    minWidth: 230,
    flex: 1,
  },
];

interface IResposta {
  resposta: SubscribeData;
}

export const CurriculoContainer: React.FC<IResposta> = ({ resposta }) => {
  const rows = [
    {
      id: 1,
      tipo: "Pessoal",
      pergunta: "Nome",
      resposta: resposta.nome,
    },
    {
      id: 2,
      tipo: "Pessoal",
      pergunta: "Email",
      resposta: resposta.email,
    },
    {
      id: 3,
      tipo: "Pessoal",
      pergunta: "Telefone",
      resposta: resposta.telefone,
    },
    {
      id: 4,
      tipo: "Pessoal",
      pergunta: "CPF",
      resposta: resposta.cpf,
    },
    {
      id: 5,
      tipo: "Pessoal",
      pergunta: "RG",
      resposta: resposta.rg,
    },
    {
      id: 6,
      tipo: "Pessoal",
      pergunta: "Data de Nascimento",
      resposta: resposta.dataNascimento,
    },
    {
      id: 7,
      tipo: "Pessoal",
      pergunta: "Estado",
      resposta: resposta.estado,
    },
    {
      id: 8,
      tipo: "Pessoal",
      pergunta: "Cidade",
      resposta: resposta.cidade,
    },
    {
      id: 10,
      tipo: "Pessoal",
      pergunta: "Neurodiversidade",
      resposta: resposta.neurodiversidade,
    },
    {
      id: 11,
      tipo: "Pessoal",
      pergunta: "Orientação Sexual",
      resposta: resposta.orientacao,
    },
    {
      id: 12,
      tipo: "Pessoal",
      pergunta: "Gênero",
      resposta: resposta.genero,
    },
    {
      id: 14,
      tipo: "Acadêmico",
      pergunta: "Curso",
      resposta: resposta.curso,
    },
    {
      id: 15,
      tipo: "Acadêmico",
      pergunta: "Turno",
      resposta: resposta.turno,
    },
    {
      id: 16,
      tipo: "Acadêmico",
      pergunta: "Instituição",
      resposta: resposta.instituicao,
    },
    {
      id: 17,
      tipo: "Acadêmico",
      pergunta: "Nível de Inglês",
      resposta: resposta.ingles,
    },
    {
      id: 18,
      tipo: "Acadêmico",
      pergunta: "Nível de Espanhol",
      resposta: resposta.espanhol,
    },
    {
      id: 19,
      tipo: "Outros",
      pergunta: "Motivo",
      resposta: resposta.desafiosBoolean,
    },
    {
      id: 20,
      tipo: "Outros",
      pergunta: "Gosta de resolver problemas",
      resposta: resposta.problemasBoolean,
    },
    {
      id: 21,
      tipo: "Outros",
      pergunta: "Gosta do reconhecimento da área",
      resposta: resposta.reconhecimentoBoolean,
    },
    {
      id: 22,
      tipo: "Outros",
      pergunta: "Quer ajudar as pessoas",
      resposta: resposta.altruismoBoolean,
    },
    {
      id: 23,
      tipo: "Outros",
      pergunta: "Conhecimentos básicos",
      resposta: resposta.provaBoolean,
    },
    {
      id: 24,
      tipo: "Outros",
      pergunta: "Disponibilidade de trabalho",
      resposta: resposta.efetivacaoBoolean,
    },
    {
      id: 25,
      tipo: "Outros",
      pergunta: "Disponibilidade de estudo",
      resposta: resposta.disponibilidadeBoolean,
    },
    {
      id: 26,
      tipo: "Outros",
      pergunta: "Trilhas",
      resposta: resposta.trilhas,
    },
    {
      id: 28,
      tipo: "Outros",
      pergunta: "Linkedin",
      resposta: resposta.linkedin,
    },
    {
      id: 29,
      tipo: "Outros",
      pergunta: "Github",
      resposta: resposta.github,
    },
    {
      id: 31,
      tipo: "Outros",
      pergunta: "LGPD",
      resposta: resposta.lgpdBoolean,
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      // autoHeight
      pageSize={rows.length}
      sx={{
        boxShadow: 2,
      }}
      hideFooter
    />
  );
};
