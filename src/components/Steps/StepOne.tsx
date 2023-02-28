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
  useSteps,
} from "../../shared/features/subscription/stepsSlice";
import { useDispatch, useSelector } from "react-redux";
import { IFormQuery, SubscribeData, TBoolean } from "shared/interfaces";
import { estadosBrasileiros } from "shared/utils/states";
import { stepOneSchema } from "shared/schemas/subscription";
import { useGetInputsQuery } from "shared/features/api/subscription/formSlice";
import InputMask from "react-input-mask";

export const StepOne: React.FC = () => {
  const [neurodiversidade, setNeurodiversidade] = useState<TBoolean>("F");
  const { data: formData } = useSelector(useSteps);
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
    data.neurodiversidadeBoolean === 'F' &&
      (data.neurodiversidade = "Não possui");

    dispatch(nextStep());
    dispatch(changeData(data));
  };

  const FormName: React.FC<IFormQuery> = ({ nome }) => {
    return <>{nome ? nome : <CircularProgress size={22} />}</>;
  };

  useEffect(() => {
    setNeurodiversidade(formData?.neurodiversidadeBoolean === 'T' ? 'T' : 'F');
  }, [formData]);

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          defaultValue={formData?.nome}
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
          defaultValue={formData?.email}
          label={<FormName nome={formulario?.email} />}
          error={!!errors.email}
          helperText={errors.email?.message}
          id="step-1-email"
          {...register("email")}
        />
      </Grid>

      <Grid item xs={6}>
        <InputMask
          mask="************"
          maskChar=" "
          {...register("rg")}
          defaultValue={formData?.rg}
        >
          {
            // @ts-ignore
            (inputProps) => (
              <TextField
                {...inputProps}
                label={<FormName nome={formulario?.rg} />}
                variant="outlined"
                id="step-1-rg"
                helperText={errors.rg?.message}
                error={!!errors.rg}
                sx={{
                  width: "100%",
                }}
              />
            )
          }
        </InputMask>
      </Grid>
      <Grid item xs={6}>
        <InputMask
          mask="999.999.999-99"
          maskChar=" "
          {...register("cpf")}
          defaultValue={formData?.cpf}
        >
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
        <InputMask
          mask="(99)99999-999999"
          maskChar=""
          {...register("telefone")}
          defaultValue={formData?.telefone}
        >
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
          defaultValue={new Date(`${formData?.dataNascimento}`).toLocaleDateString().split('/').reverse().join("-")}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          label={<FormName nome={formulario?.cidade} />}
          defaultValue={formData?.cidade}
          error={!!errors.cidade}
          helperText={errors.cidade?.message}
          id="step-1-cidade"
          {...register("cidade")}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <InputLabel>Estado*</InputLabel>
          <Select
            label={<FormName nome={formulario?.estado} />}
            error={!!errors.estado}
            defaultValue={formData?.estado ? formData.estado : "AC"}
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
          title="Essa pergunta é importante para que possamos oferecer uma melhor experiência para você."
          placement="top"
          arrow
        >
          <FormControl fullWidth>
            <InputLabel>
              {<FormName nome={formulario?.neurodiversidade} />}
            </InputLabel>
            <Select
              label={<FormName nome={formulario?.neurodiversidade} />}
              defaultValue={formData?.neurodiversidadeBoolean ? formData.neurodiversidadeBoolean : "F"}
              id="step-1-neurodiversidade-combo"
              {...register("neurodiversidadeBoolean")}
              onChange={(event) => {
                setNeurodiversidade(event.target.value === 'T' ? 'T' : 'F');
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
            defaultValue={formData?.neurodiversidade}
            error={!!errors.neurodiversidade}
            helperText={errors.neurodiversidade?.message}
            inputProps={{ maxLength: 255 }}
            id="step-1-neurodiversidade"
            required
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