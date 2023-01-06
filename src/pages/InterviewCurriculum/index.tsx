import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { CurriculoContainer } from "../../components/CurriculoContainer";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostNewEntrevistaMutation } from "shared/features/api/entrevista/entrevistaSlice";
import { useForm } from "react-hook-form";
import { NovaEntrevistaBody } from "../../shared/features/api/entrevista/types";
import { useGetLoggedUserQuery } from "shared/features/api/usuario/authSlice";
import { toast } from "react-toastify";

export const InterviewCurriculum = () => {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = useGetLoggedUserQuery();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [postNewEntrevista] = usePostNewEntrevistaMutation();
  const { register, handleSubmit } = useForm<NovaEntrevistaBody>();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitEntrevista = async (form: NovaEntrevistaBody) => {
    isLoading === false &&
      postNewEntrevista({
        candidatoEmail: state.email,
        usuarioEmail: `admin@dbccompany.com.br`,
        dataEntrevista: form.dataEntrevista,
        avaliado: "T",
        observacoes: form.observacoes,
      })
        .unwrap()
        .then(() => {
          toast.success("Entrevista agendada com sucesso!");
          navigate("/entrevista");
        })
        .catch((err: any) => {
          console.log(err);
          toast.error(
            err.data.status === 400
              ? "Entrevista já agendada"
              : "Erro ao agendar entrevista"
          );
        });

    console.log(form);
  };

  console.log(state);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} item>
        <Button
          variant="contained"
          id="interview-curriculum-agendar"
          onClick={handleClickOpen}
        >
          Agendar entrevista
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle color="primary">Agendar entrevista</DialogTitle>
          <DialogContent>
            <Stack
              direction="column"
              component="form"
              onSubmit={handleSubmit(handleSubmitEntrevista)}
              spacing={1}
            >
              <TextField
                margin="dense"
                autoFocus
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                id="name"
                label="Data e hora da entrevista"
                {...register("dataEntrevista")}
                fullWidth
              />
              <TextField
                margin="dense"
                id="name"
                label="Observações"
                {...register("observacoes")}
                multiline
                rows={4}
                fullWidth
              />
              <Stack spacing={2} direction="row">
                <Button
                  color="error"
                  sx={{ width: "100%" }}
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button sx={{ width: "100%" }} type="submit">
                  Agendar
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      </Grid>
      <Grid item xs={12}>
        <CurriculoContainer />
      </Grid>
    </Grid>
  );
};
