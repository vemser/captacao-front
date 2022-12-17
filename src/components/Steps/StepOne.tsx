import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import { FormGrid } from "../FormGrid";
import {
  nextStep,
  changeData,
} from "../../shared/features/subscription/stepsSlice";
import { useDispatch } from "react-redux";
import { SubscribeData } from "shared/interfaces";

export const StepOne: React.FC = () => {
  const { register, handleSubmit } = useForm<SubscribeData>();

  const dispatch = useDispatch();

  const onSubmit = (data: SubscribeData) => {
    dispatch(nextStep());
    dispatch(changeData(data));
  };

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12} lg={6}>
        <TextField {...register("name")} fullWidth label="Nome" />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField {...register("email")} fullWidth label="Email" />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained">
          Próximo
        </Button>
      </Grid>
    </FormGrid>
  );
};
