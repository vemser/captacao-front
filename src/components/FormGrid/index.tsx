import React from "react";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";

interface IFormGridProps {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const FormGrid: React.FC<IFormGridProps> = ({ children, onSubmit }) => {
  return (
    <Grid
      container
      component={motion.form}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      spacing={2}
      onSubmit={onSubmit}
      sx={{
        "& .MuiInput-underline:after": {
          borderBottomColor: "primary.main",
          color: "primary.main",
        },
        "& .MuiOutlinedInput-root": {
          color: "primary.main",
          "& fieldset": {
            color: "primary.main",
            borderColor: "primary.main",
          },
          "& .MuiFormLabel-root": {
            color: "primary.main",
          },
        },
      }}
    >
      {children}
    </Grid>
  );
};
