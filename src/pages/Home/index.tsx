import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LogoBlue from "assets/logo-blue.webp";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useGetAbrirFecharInscricaoQuery } from "shared/features/api/subscription/formSlice";
import PersonIcon from "@mui/icons-material/Person";

export const Home: React.FC = () => {
	const navigate = useNavigate();
	const { data } = useGetAbrirFecharInscricaoQuery();
	const inscricao = data?.data.formulario.inscricoes;
	console.log(inscricao);

	return (
		<Box
			sx={{
				width: "100%",
				backgroundImage: {
					xs: "none",
					md: `url(${require("assets/circular-bullseye.png")})`,
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
					initial={{ opacity: 0, x: -50 }}
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
								Trata-se de uma jornada exigente, com mais de 1.500 pessoas inscritas na
								última edição e 40 inscritos em média por vaga, com profissionais de
								várias localidades do Brasil.
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
								mb: "100px",
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
								{inscricao ? (
									<Button
										fullWidth
										variant="outlined"
										color="inherit"
										endIcon={<NavigateNextIcon />}
										onClick={() => {
											navigate("/subscription");
										}}
									>
										Ir para a inscrição
									</Button>
								) : (
									<Button
										fullWidth
										variant="outlined"
										color="inherit"
										endIcon={<NavigateNextIcon />}
										href="https://www.dbccompany.com.br/vem-ser/"
										target="_blank"
									>
										Conheça o Vem Ser DBC
									</Button>
								)}
							</Box>
						</Box>
						<Box
							sx={{
								height: "80px",
								display: "flex",
								alignItems: "flex-end",
							}}
						>
							<Button
								variant="text"
								size="medium"
								startIcon={<PersonIcon />}
								sx={{ ml: "-5px" }}
								onClick={() => {
									navigate("/login");
								}}
								id="button-admin"
							>
								Área administrativa
							</Button>
						</Box>
					</Stack>
				</motion.div>
			</Container>
		</Box>
	);
};
