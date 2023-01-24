import { Button, Grid, Menu, MenuItem } from "@mui/material";
import { CurriculoContainer } from "../../components/CurriculoContainer";
import React from "react";
import { useAvaliarCandidatoMutation } from "shared/features/avaliacao/avaliacaoSlice";
import { useGetLoggedUserQuery } from "shared/features/api/usuario/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CandidatesCurriculum = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [avaliarCandidato] = useAvaliarCandidatoMutation();
  const { state } = useLocation();
  console.log(state);

  const { data } = useGetLoggedUserQuery();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        xs={12}
        item
        sx={{
          mb: 2,
        }}
      >
        <Button
          id="candidatos-avaliar"
          variant="contained"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Avaliar
        </Button>
        <Menu
          id="candidatos-avaliar-options"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={async () => {
              await toast.promise(
                avaliarCandidato({
                  aprovadoBoolean: true,
                  idInscricao: state.id,
                })
                  .unwrap()
                  .then(() => {
                    navigate("/candidatos");
                  }),
                {
                  pending: "Carregando...",
                  success: "Candidato avaliado com sucesso!",
                  error: {
                    render() {
                      return "Houve um erro ao avaliar esse candidato.";
                    },
                  },
                }
              );
              handleClose();
            }}
          >
            Apto
          </MenuItem>
          <MenuItem
            onClick={async () => {
              await toast.promise(
                avaliarCandidato({
                  aprovadoBoolean: false,
                  idInscricao: state.id,
                })
                  .unwrap()
                  .then(() => {
                    navigate("/candidatos");
                  }),
                {
                  pending: "Carregando...",
                  success: "Candidato reprovado com sucesso!",
                  error: {
                    render() {
                      return "Houve um erro ao avaliar esse candidato.";
                    },
                  },
                }
              );
              handleClose();
            }}
          >
            Não apto
          </MenuItem>
        </Menu>
      </Grid>
      <CurriculoContainer />
    </Grid>
  );
};
