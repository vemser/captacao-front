import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Skeleton,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useSteps } from "shared/features/subscription/stepsSlice";
import { useEffect } from "react";
import { Steps, stepsInfos } from "components/Steps";
import { FormStepper } from "components/FormStepper";
import { useGetSubscribeTextQuery } from "shared/features/api/subscription/formSlice";
import parse from "html-react-parser";

export const Subscription = () => {
  const { current, data } = useSelector(useSteps);
  const { StepOne, StepTwo } = Steps;
  const { data: subscribeText, isLoading } = useGetSubscribeTextQuery();
  const subscribeTextData = subscribeText?.data.formulario;

  // to remove after
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(subscribeText);
  }, [subscribeText]);

  return (
    <Box
      component={motion.div}
      initial={{
        backgroundColor: "#040C2C",
      }}
      animate={{
        backgroundColor: "#1E62FE",
      }}
      transition={{ duration: 0.5 }}
      sx={{
        width: "100%",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        minHeight: "100vh",
        color: "whitesmoke",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={motion.div}
          initial={{
            opacity: 0,
            x: -50,
            backgroundColor: "#F2F2F2",
            padding: 10,
            borderRadius: 5,
            margin: 0,
          }}
          animate={{
            opacity: 1,
            x: 0,
            backgroundColor: "#F2F2F2",
            padding: 20,
            borderRadius: 10,
            margin: "20px 0",
          }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12} m="0 auto" pb={2}>
              <FormStepper activeStep={current} steps={stepsInfos} />
            </Grid>
            {current === 0 && (
              <Grid item xs={12} lg={6}>
                <StepOne />
              </Grid>
            )}
            {current === 1 && (
              <Grid item xs={12}>
                <StepTwo />
              </Grid>
            )}
            {current === 0 && (
              <Grid item xs={12} lg={6}>
                {isLoading ? (
                  <Skeleton variant="rectangular" width="100%" height={361} />
                ) : (
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      backgroundColor: "primary.main",
                      backgroundImage: `url('${subscribeTextData?.backgroundImage?.url}')`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      boxShadow: "inset 0 0 0 1000px #00000092",
                      "&:hover": {
                        boxShadow: "inset 0 0 0 1000px #1e61fe",
                      },
                      maxHeight: 361,
                      overflow: "auto",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      textAlign="center"
                      color="whitesmoke"
                    >
                      {subscribeTextData?.titulo}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        height: "1px",
                        backgroundColor: "whitesmoke",
                        my: 2,
                      }}
                    />
                    <Box
                      sx={{
                        "*": {
                          color: "whitesmoke",
                        },
                      }}
                    >
                      {parse(subscribeTextData?.content || "")}
                    </Box>
                  </Paper>
                )}
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
