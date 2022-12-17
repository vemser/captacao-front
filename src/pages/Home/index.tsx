import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import LogoBlue from "../../assets/logo-blue.webp";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const Home: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage: {
          xs: "none",
          md: `url(${require("../../assets/circular-bullseye.png")})`,
        },
        backgroundColor: "secondary.main",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        minHeight: "100vh",
        color: "whitesmoke",
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stack
            spacing={4}
            minHeight="100vh"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                justifyContent: "center",
                pr: {
                  xs: 0,
                  md: 4,
                },
              }}
            >
              <Typography variant="body1" component="h1">
                VEM SER DBC
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                Vamos moldar o amanhã!
              </Typography>
              <Typography variant="body1" component="h1">
                Vem Ser DBC é um programa de aceleração de conhecimento técnico.
                Trata-se de uma jornada exigente, com mais de 1.500 pessoas
                inscritas na última edição e 40 inscritos em média por vaga, com
                profissionais de várias localidades do Brasil.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  md: "flex-start",
                },
                gap: 4,
              }}
            >
              <Box
                component="img"
                src={LogoBlue}
                alt="Logo da DBC escrito DBC em azul"
                sx={{
                  maxWidth: {
                    xs: 120,
                    md: 120,
                  },
                }}
              />
              <Box
                component={motion.div}
                initial={{ x: -2 }}
                animate={{ x: 2 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.5,
                }}
                sx={{
                  fontSize: 16,
                  width: {
                    xs: "100%",
                    md: "auto",
                  },
                }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  endIcon={<NavigateNextIcon />}
                >
                  Ir para a inscrição
                </Button>
              </Box>
            </Box>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};
