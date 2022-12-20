import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { FormGrid } from "../FormGrid";
import {
  nextStep,
  changeData,
} from "../../shared/features/subscription/stepsSlice";
import { useDispatch } from "react-redux";
import { SubscribeData } from "shared/interfaces";
import { estadosBrasileiros } from "shared/utils/states";
import { stepOneSchema } from "shared/schemas/subscription";

export const StepOne: React.FC = () => {
  const [neurodiversidade, setNeurodiversidade] = useState("F");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscribeData>({
    // resolver: yupResolver(stepOneSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data: SubscribeData) => {
    dispatch(nextStep());
    dispatch(changeData(data));
  };

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Nome"
          error={!!errors.nome}
          helperText={errors.nome?.message}
          {...register("nome")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="E-mail"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          label="CPF"
          error={!!errors.cpf}
          helperText={errors.cpf?.message}
          {...register("cpf")}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          label="Telefone"
          error={!!errors.telefone}
          helperText={errors.telefone?.message}
          {...register("telefone")}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          label="Data de Nascimento"
          type="date"
          error={!!errors.dataNascimento}
          helperText={errors.dataNascimento?.message}
          InputLabelProps={{ shrink: true }}
          {...register("dataNascimento")}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          label="Cidade"
          error={!!errors.cidade}
          helperText={errors.cidade?.message}
          {...register("cidade")}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <InputLabel
            sx={{
              color: "primary.main",
            }}
          >
            Estado
          </InputLabel>
          <Select
            label="Estado"
            error={!!errors.estado}
            defaultValue="AC"
            {...register("estado")}
          >
            {estadosBrasileiros.map((estado) => (
              <MenuItem key={estado.id} value={estado.sigla}>
                {estado.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={6}>
        <Tooltip
          title="Essa não é uma pergunta obrigatória, mas é importante para que possamos oferecer uma melhor experiência para você."
          placement="top"
          arrow
        >
          <FormControl fullWidth>
            <InputLabel
              sx={{
                color: "primary.main",
              }}
            >
              Você possui alguma neurodiversidade?
            </InputLabel>
            <Select
              label="Você possui alguma neurodiversidade?"
              defaultValue="F"
              onChange={() => {
                setNeurodiversidade(neurodiversidade === "F" ? "T" : "F");
              }}
            >
              <MenuItem value="F">Não</MenuItem>
              <MenuItem value="T">Sim</MenuItem>
            </Select>
          </FormControl>
        </Tooltip>
      </Grid>
      {neurodiversidade === "T" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Qual neurodiversidade você possui?"
            error={!!errors.neurodiversidade}
            helperText={errors.neurodiversidade?.message}
            {...register("neurodiversidade")}
          />
        </Grid>
      )}

      <Grid item xs={12}>
        <Button type="submit" variant="contained">
          Próximo
        </Button>
      </Grid>
    </FormGrid>
  );
};
