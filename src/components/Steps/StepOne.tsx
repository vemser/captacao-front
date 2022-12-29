import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { FormGrid } from "../FormGrid";
import {
  nextStep,
  changeData,
} from "../../shared/features/subscription/stepsSlice";
import { useDispatch } from "react-redux";
import { IFormQuery, SubscribeData } from "shared/interfaces";
import { estadosBrasileiros } from "shared/utils/states";
import { stepOneSchema } from "shared/schemas/subscription";
import { useGetInputsQuery } from "shared/features/api/subscription/formSlice";
import InputMask from "react-input-mask";

export const StepOne: React.FC = () => {
  const [neurodiversidade, setNeurodiversidade] = useState("F");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscribeData>({
    resolver: yupResolver(stepOneSchema),
  });

  const dispatch = useDispatch();
  const { data } = useGetInputsQuery();
  const formulario = data?.data.formulario;

  const onSubmit = (data: SubscribeData) => {
    dispatch(nextStep());
    dispatch(changeData(data));
  };

  const FormName: React.FC<IFormQuery> = ({ nome }) => {
    return <>{nome ? nome : <CircularProgress size={22} />}</>;
  };

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={<FormName nome={formulario?.nome} />}
          error={!!errors.nome}
          helperText={errors.nome?.message}
          id="step-1-nome"
          {...register("nome")}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          label={<FormName nome={formulario?.email} />}
          error={!!errors.email}
          helperText={errors.email?.message}
          id="step-1-email"
          {...register("email")}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          label={<FormName nome={formulario?.rg} />}
          error={!!errors.rg}
          helperText={errors.rg?.message}
          id="step-1-rg"
          {...register("rg")}
        />
      </Grid>
      <Grid item xs={6}>
        <InputMask mask="999.999.999-99" maskChar=" " {...register("cpf")}>
          {
            // @ts-ignore
            (inputProps) => (
              <TextField
                {...inputProps}
                label={<FormName nome={formulario?.cpf} />}
                variant="outlined"
                id="step-1-cpf"
                helperText={errors.cpf?.message}
                error={!!errors.cpf}
                sx={{
                  width: "100%",
                }}
              />
            )
          }
        </InputMask>
      </Grid>
      <Grid item xs={6} display="flex" flexDirection="column">
        <InputMask mask="(99)99999-9999" maskChar=" " {...register("telefone")}>
          {
            // @ts-ignore
            (inputProps) => (
              <TextField
                {...inputProps}
                label={<FormName nome={formulario?.telefone} />}
                variant="outlined"
                error={!!errors.telefone}
                helperText={errors.telefone?.message}
                id="step-1-telefone"
              />
            )
          }
        </InputMask>
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          label={<FormName nome={formulario?.dataNascimento} />}
          type="date"
          error={!!errors.dataNascimento}
          helperText={errors.dataNascimento?.message}
          id="step-1-dataNascimento"
          InputLabelProps={{ shrink: true }}
          {...register("dataNascimento")}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          label={<FormName nome={formulario?.cidade} />}
          error={!!errors.cidade}
          helperText={errors.cidade?.message}
          id="step-1-cidade"
          {...register("cidade")}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select
            label={<FormName nome={formulario?.estado} />}
            error={!!errors.estado}
            defaultValue="AC"
            id="step-1-estado"
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
            <InputLabel>
              {<FormName nome={formulario?.neurodiversidade} />}
            </InputLabel>
            <Select
              label={<FormName nome={formulario?.neurodiversidade} />}
              defaultValue="F"
              onChange={() => {
                setNeurodiversidade(neurodiversidade === "F" ? "T" : "F");
              }}
              id="step-1-neurodiversidade"
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
            id="step-1-neurodiversidade"
            {...register("neurodiversidade")}
          />
        </Grid>
      )}

      <Grid item xs={12}>
        <Button type="submit" variant="contained" id="step-1-enviar">
          Próximo
        </Button>
      </Grid>
    </FormGrid>
  );
};
