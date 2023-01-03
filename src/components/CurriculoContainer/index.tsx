import { Button, Chip, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetInscricaoByIdMutation } from "shared/features/api/inscricao/inscricaoSlice";
import { IElementos } from "shared/features/api/inscricao/types";

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

export const CurriculoContainer: React.FC = () => {
  const { state } = useLocation();
	const [getInscricaoById] = useGetInscricaoByIdMutation();
	const [inscricaoResponse, setInscricaoResponse] =
	useState<IElementos | null>(null);

	useEffect(() => {
		getInscricaoById(state.id)
			.unwrap()
			.then((res) => setInscricaoResponse(res));
	}, []);

	useEffect(() => {
		console.log(inscricaoResponse);
	}, [inscricaoResponse]);

  const rows = [
    {
      id: 1,
      tipo: "Pessoal",
      pergunta: "Nome",
      resposta: inscricaoResponse?.candidato.nome,
    },
    {
      id: 2,
      tipo: "Pessoal",
      pergunta: "Email",
      resposta: inscricaoResponse?.candidato.email,
    },
    {
      id: 3,
      tipo: "Pessoal",
      pergunta: "Telefone",
      resposta:  inscricaoResponse?.candidato.telefone,
    },
    {
      id: 4,
      tipo: "Pessoal",
      pergunta: "CPF",
      resposta: inscricaoResponse?.candidato.cpf,
    },
    {
      id: 5,
      tipo: "Pessoal",
      pergunta: "RG",
      resposta: inscricaoResponse?.candidato.rg,
    },
    {
      id: 6,
      tipo: "Pessoal",
      pergunta: "Data de Nascimento",
      resposta: inscricaoResponse?.candidato.dataNascimento,
    },
    {
      id: 7,
      tipo: "Pessoal",
      pergunta: "Estado",
      resposta: inscricaoResponse?.candidato.estado,
    },
    {
      id: 8,
      tipo: "Pessoal",
      pergunta: "Cidade",
      resposta: inscricaoResponse?.candidato.cidade,
    },
    {
      id: 10,
      tipo: "Pessoal",
      pergunta: "Neurodiversidade",
      resposta:  inscricaoResponse?.candidato.formulario?.neurodiversidade,
    },
    {
      id: 11,
      tipo: "Pessoal",
      pergunta: "Orientação Sexual",
      resposta: inscricaoResponse?.candidato.formulario?.orientacao,
    },
    {
      id: 12,
      tipo: "Pessoal",
      pergunta: "Gênero",
      resposta: inscricaoResponse?.candidato.formulario?.genero,
    },
    {
      id: 13,
      tipo: "Pessoal",
      pergunta: "PCD",
      resposta: inscricaoResponse?.candidato.pcdboolean,
    },
    {
      id: 14,
      tipo: "Acadêmico",
      pergunta: "Curso",
      resposta: inscricaoResponse?.candidato.formulario?.curso,
    },
    {
      id: 15,
      tipo: "Acadêmico",
      pergunta: "Turno",
      resposta: inscricaoResponse?.candidato.formulario?.turno,
    },
    {
      id: 16,
      tipo: "Acadêmico",
      pergunta: "Instituição",
      resposta: inscricaoResponse?.candidato.formulario?.instituicao,
    },
    {
      id: 17,
      tipo: "Acadêmico",
      pergunta: "Nível de Inglês",
      resposta:inscricaoResponse?.candidato.formulario?.ingles,
    },
    {
      id: 18,
      tipo: "Acadêmico",
      pergunta: "Nível de Espanhol",
      resposta: inscricaoResponse?.candidato.formulario?.espanhol,
    },
    {
      id: 23,
      tipo: "Outros",
      pergunta: "Conhecimentos básicos",
      resposta: inscricaoResponse?.candidato.formulario?.prova,
    },
    {
      id: 24,
      tipo: "Outros",
      pergunta: "Disponibilidade de trabalho",
      resposta: inscricaoResponse?.candidato.formulario?.efetivacao,
    },
    {
      id: 25,
      tipo: "Outros",
      pergunta: "Disponibilidade de estudo",
      resposta: inscricaoResponse?.candidato.formulario?.disponibilidade,
    },
    {
      id: 26,
      tipo: "Outros",
      pergunta: "Trilhas",
      resposta: inscricaoResponse?.candidato.formulario?.trilhas,
    },
    {
      id: 28,
      tipo: "Outros",
      pergunta: "Linkedin",
      resposta: inscricaoResponse?.candidato.formulario?.linkedin,
    },
    {
      id: 29,
      tipo: "Outros",
      pergunta: "Github",
      resposta: inscricaoResponse?.candidato.formulario?.github,
    },
    {
      id: 31,
      tipo: "Outros",
      pergunta: "LGPD",
      resposta: inscricaoResponse?.candidato.formulario?.lgpd,
    },
    {
      id: 32,
      tipo: "Outros",
      pergunta: "Interesse em TI",
      resposta: inscricaoResponse?.candidato.formulario?.resposta,
    },
    {
      id: 33,
      tipo: "Outros",
      pergunta: "Algo importante",
      resposta: inscricaoResponse?.candidato.formulario?.importancia
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
