import React from "react";
import { Stepper, Step, StepLabel, Box, Typography } from "@mui/material";

type StepInfo = {
  label: string;
  icon: JSX.Element;
};

type StepperProps = {
  activeStep: number;
  steps: StepInfo[];
};

export const FormStepper: React.FC<StepperProps> = ({ activeStep, steps }) => {
  return (
    <Stepper
      activeStep={activeStep}
      sx={{
        display: "flex",
        backgroundColor: "transparent",
        mt: {
          xs: 1,
          lg: 2,
        },
      }}
    >
      {steps.map((step) => (
        <Step
          key={step.label}
          sx={{
            backgroundColor: "transparent",
          }}
        >
          <StepLabel
            sx={{
              display: {
                xs: "grid",
                lg: "flex",
              },
              maxWidth: {
                xs: 80,
                lg: "100%",
              },
              gridTemplateRows: "20px 40px",
              "& .MuiStepLabel-iconContainer": {
                justifySelf: {
                  xs: "flex-end",
                  lg: "initial",
                },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  lg: "row",
                },
                alignItems: "center",
                gap: 1,
              }}
            >
              {step.icon}
              <Typography
                variant="body2"
                color={activeStep === steps.indexOf(step) ? "primary" : "white"}
                textAlign="center"
              >
                {step.label}
              </Typography>
            </Box>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
