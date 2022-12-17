import { Box, Container, Grid } from "@mui/material";
import { Person, DynamicForm, Check } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useSteps } from "shared/features/subscription/stepsSlice";
import { useEffect } from "react";
import { Steps, stepsInfos } from "components/Steps";
import { FormStepper } from "components/FormStepper";

const clipPath = {
  initial: "polygon(0% 0%, 100% 0, 100% 100%, 100% 100%, 0 100%, 0% 0%)",
  animate: "polygon(10% 0%, 100% 0, 100% 90%, 90% 100%, 0 100%, 0% 10%)",
};

export const Subscription = () => {
  const { current, data } = useSelector(useSteps);
  const { StepOne, StepTwo } = Steps;

  // to remove after
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Box
        component={motion.div}
        initial={{
          clipPath: clipPath.initial,
        }}
        animate={{
          clipPath: clipPath.animate,
        }}
        transition={{ duration: 0.5 }}
        sx={{
          width: "100%",
          backgroundImage: {
            xs: "none",
            lg: `url(${require("assets/circular-bullseye.png")})`,
          },
          backgroundColor: "secondary.main",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          minHeight: "100vh",
          color: "whitesmoke",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container>
              <Grid item xs={12} lg={10} m="0 auto" py={2}>
                <FormStepper activeStep={current} steps={stepsInfos} />
              </Grid>
              <Grid item xs={12} lg={6} py={2}>
                {current === 0 && <StepOne />}
                {current === 1 && <StepTwo />}
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};
