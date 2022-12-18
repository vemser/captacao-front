import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import {
  previousStep,
  changeData,
} from "../../shared/features/subscription/stepsSlice";
import { useDispatch } from "react-redux";
import { FormGrid } from "components/FormGrid";
import { SubscribeData } from "shared/interfaces";

export const StepTwo: React.FC = () => {
  const { register, handleSubmit } = useForm<SubscribeData>();
  const dispatch = useDispatch();

  const onSubmit = (data: SubscribeData) => {
    dispatch(changeData(data));
  };

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            dispatch(previousStep());
          }}
        >
          Voltar
        </Button>
        <Button type="submit">Enviar</Button>
      </Grid>
    </FormGrid>
  );
};
