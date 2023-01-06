import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  Stack,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Chip,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  useGetCandidatosMutation,
  useGetListInscricaoByEdicaoMutation,
  useGetListInscricaoByEmailMutation,
  useGetListInscricaoByTrilhaMutation,
} from "../../shared/features/api/inscricao/inscricaoSlice";
import { IElementos, IInscricao } from "shared/features/api/inscricao/types";
import { useGetTrilhasQuery } from "shared/features/api/trilha/trilhaSlice";
import { useGetListaEdicoesQuery } from "shared/features/api/edicao/edicaoSlice";
const columns = [
  {
    field: "status",
    headerName: "Status",
    width: 140,
    renderCell: (params: any) => {
      return (
        <Chip
          label={params.value === null ? "Não avaliado" : "Avaliado"}
          sx={{ borderRadius: 1, boxShadow: 1, width: "100%" }}
        />
      );
    },
  },
  {
    field: "nome",
    headerName: "Nome",
    minWidth: 180,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 230,
    flex: 1,
  },
  {
    field: "telefone",
    headerName: "Telefone",
    minWidth: 160,
  },
  {
    field: "turno",
    headerName: "Turno",
    minWidth: 90,
  },
  {
    field: "estado",
    headerName: "Estado",
    minWidth: 90,
  },
  {
    field: "acoes",
    headerName: "Ações",
    width: 120,
    renderCell: () => {
      return (
        <Button variant="contained" id="">
          Avaliar
        </Button>
      );
    },
  },
];

export const Registers: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [getCandidatos] = useGetCandidatosMutation();

  const [trilhaResult, setTrilhaResult] = useState<IElementos[]>();
  const [getInscricaoByTrilha] = useGetListInscricaoByTrilhaMutation();
  const { data: getTrilha } = useGetTrilhasQuery();
  const { data: getEdicoes } = useGetListaEdicoesQuery();
  const [inscricoes, setInscricoes] = useState<IInscricao | null>(null);

  const [getInscricaoByEdicao] = useGetListInscricaoByEdicaoMutation();
  const [edicaoResult, setEdicaoResult] = useState<IElementos[]>();
  const [estado, setEstado] = useState(0);

  const [getInscricaoByEmail] = useGetListInscricaoByEmailMutation();
  const [email, setEmail] = useState<string>("");
  const [emailResult, setEmailResult] = useState<IElementos[]>();

  useEffect(() => {
    getCandidatos({ pagina: page })
      .unwrap()
      .then((e) => setInscricoes(e));
  }, [page]);

  const resetFiltro = () => {
    setEmail("");
    setEstado(estado + 1);
    setEdicaoResult(undefined);
    setTrilhaResult(undefined);
    getCandidatos({ pagina: page })
      .unwrap()
      .then((teste: any) => setInscricoes(teste));
  };

  const lista = inscricoes?.elementos;

  const rows = () => {
    if (trilhaResult) {
      return trilhaResult?.map((dados) => {
        return {
          id: dados.idInscricao,
          nome: dados.candidato.nome,
          email: dados.candidato.email,
          status: dados.avaliacao,
          telefone: dados.candidato.telefone,
          turno: dados.candidato.formulario?.turno,
          estado: dados.candidato.estado,
        };
      });
    } else if (edicaoResult) {
      return edicaoResult?.map((dados) => {
        return {
          id: dados.idInscricao,
          nome: dados.candidato.nome,
          email: dados.candidato.email,
          status: dados.avaliacao,
          telefone: dados.candidato.telefone,
          turno: dados.candidato.formulario?.turno,
          estado: dados.candidato.estado,
        };
      });
    } else if (emailResult) {
      return emailResult?.map((dados) => {
        return {
          id: dados.idInscricao,
          nome: dados.candidato.nome,
          email: dados.candidato.email,
          status: dados.avaliacao,
          telefone: dados.candidato.telefone,
          turno: dados.candidato.formulario?.turno,
          estado: dados.candidato.estado,
        };
      });
    } else {
      return lista?.map((dados) => {
        return {
          id: dados.idInscricao,
          nome: dados.candidato.nome,
          email: dados.candidato.email,
          status: dados.avaliacao,
          telefone: dados.candidato.telefone,
          turno: dados.candidato.formulario?.turno,
          estado: dados.candidato.estado,
        };
      });
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
        >
          <FormControl fullWidth variant="outlined">
            <InputLabel>Pesquisar por Email</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    value={email}
                    onClick={() => {
                      getInscricaoByEmail({
                        email: email,
                      })
                        .unwrap()
                        .then((data) => setEmailResult(data));
                    }}
                  >
                    <Search color="primary" />
                  </IconButton>
                </InputAdornment>
              }
              id="registros-search-by-email"
              label="Pesquisar por Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Filtrar por trilha</InputLabel>
            <Select
              label="Filtrar por trilha"
              id="registros-filter-by-trilha"
              defaultValue=""
              key={estado}
              onChange={(e) => {
                getInscricaoByTrilha({
                  trilha: e.target.value,
                })
                  .unwrap()
                  .then((data) => setTrilhaResult(data));
              }}
            >
              {getTrilha?.map((trilha) => {
                return (
                  <MenuItem
                    key={trilha.nome}
                    value={trilha.nome}
                    id={`filtro-trilha-${trilha.nome}`}
                  >
                    {trilha.nome}
                  </MenuItem>
                );
              })}
              ;
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Filtrar por edição</InputLabel>
            <Select
              label="Filtrar por edição"
              id="registros-filter-by-edition"
              defaultValue=""
              key={estado}
              onChange={(e) => {
                getInscricaoByEdicao({
                  edicao: e.target.value,
                })
                  .unwrap()
                  .then((data) => setEdicaoResult(data));
              }}
            >
              {getEdicoes?.map((edicao) => {
                return (
                  <MenuItem
                    key={edicao.nome}
                    value={edicao.nome}
                    id={`filtro-edicao-${edicao.nome}`}
                  >
                    {edicao.nome}
                  </MenuItem>
                );
              })}
              ;
            </Select>
          </FormControl>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              fullWidth
              sx={{
                height: "3rem",
              }}
              variant="contained"
              onClick={resetFiltro}
            >
              Limpar
            </Button>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ height: "calc(100vh - 211px)", width: "100%" }}>
        <DataGrid
          rows={rows() || []}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[5]}
          onRowClick={({ row }) => {
            navigate("/candidatos/curriculo", { state: row });
          }}
          sx={{
            boxShadow: 2,
          }}
          hideFooter
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Pagination
          count={inscricoes?.quantidadePaginas}
          color="primary"
          size="small"
          onChange={(_, page) => {
            setPage(page - 1);
          }}
        />
      </Grid>
    </Grid>
  );
};
