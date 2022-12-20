import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useSteps } from "shared/features/subscription/stepsSlice";
import { useEffect } from "react";
import { Steps, stepsInfos } from "components/Steps";
import { FormStepper } from "components/FormStepper";

export const Subscription = () => {
  const { current, data } = useSelector(useSteps);
  const { StepOne, StepTwo } = Steps;

  // to remove after
  useEffect(() => {
    console.log(data);
  }, [data]);

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
            <Grid item xs={12} lg={6}>
              {current === 0 && <StepOne />}
              {current === 1 && <StepTwo />}
            </Grid>
            <Grid item xs={12} lg={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  backgroundColor: "primary.main",
                  backgroundImage:
                    "url('https://www.dbccompany.com.br/app/themes/dbccompany/public/images/banners/Banner-Servicoes-1200.d09a5f.jpg')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  boxShadow: "inset 0 0 0 1000px #000e3031",
                  "&:hover": {
                    boxShadow: "inset 0 0 0 1000px #1e61fe",
                  }
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  textAlign="center"
                  color="whitesmoke"
                >
                  Inscrições da 11ª edição do Vem Ser DBC
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
                <Typography variant="body1" component="p" color="white">
                  Quer fazer parte de um programa de capacitação que desenvolve
                  e transforma estudantes em profissionais, utilizando as
                  tecnologias que mais empregam no mercado de trabalho?
                  <br />
                  O Vem Ser DBC atualmente é composto por três trilhas de
                  formação: Front-End, Back-end e Testes Automatizados (QA). Por
                  meio destas trilhas de formação, os estudantes selecionados
                  são capacitados com as tecnologias mais utilizadas no mercado
                  de trabalho.
                  <br />A formação tem duração de 12 semanas e os selecionados
                  terão aulas online e ao vivo de segunda a sexta-feira, das
                  13:30 às 17:30 (horário de Brasília). Além disso, receberão
                  uma bolsa auxílio mensal no valor de R$ 800,00.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
