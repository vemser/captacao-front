import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
	TextField,
	Button,
	Grid,
	FormControlLabel,
	Checkbox,
	FormGroup,
	RadioGroup,
	Radio,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Box,
	FormControl,
	FormLabel,
	Stack,
	Tooltip,
} from "@mui/material";
import {
	previousStep,
	changeData,
} from "../../shared/features/subscription/stepsSlice";
import { useDispatch } from "react-redux";
import { FormGrid } from "components/FormGrid";
import { SubscribeData } from "shared/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepTwoSchema } from "shared/schemas/stepTwo";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Error } from "../error/index";

export const StepTwo: React.FC = () => {
	const dispatch = useDispatch();
	const [anotherReason, setAnotherReason] = useState(false);
	const [deficiencia, setDeficiencia] = useState("F");

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SubscribeData>({
		defaultValues: {
			matriculado: "T",
			trilhas: [],
		},
		resolver: yupResolver(stepTwoSchema),
	});

	const onSubmit = (data: SubscribeData) => {
		dispatch(changeData(data));
		console.log(data);
	};
	const { matriculado, curriculo, configuracoes } = watch();

	return (
		<FormGrid onSubmit={handleSubmit(onSubmit)}>
			<Grid item xs={12} lg={6}>
				<FormLabel>
					Você é matriculado em algum curso de graduação ou técnico?
				</FormLabel>
				<RadioGroup
					row
					sx={{
						color: "GrayText",
						gap: "2rem",
					}}
					defaultValue="T"
				>
					<FormControlLabel
						id="matriculado-sim"
						value="T"
						control={<Radio />}
						label="Sim"
						{...register("matriculado")}
					/>
					<FormControlLabel
						id="matriculado-nao"
						value="F"
						control={<Radio />}
						label="Não"
						{...register("matriculado")}
					/>
				</RadioGroup>
			</Grid>
			{matriculado === "T" && (
				<>
					<Grid item xs={12} lg={6}>
						<FormLabel
							sx={{
								color: "GrayText",
							}}
						>
							Qual o turno que você estuda?
						</FormLabel>
						<RadioGroup
							row
							sx={{
								color: "GrayText",
								gap: "2rem",
							}}
							defaultValue="MANHA"
						>
							<FormControlLabel
								id="turno-manha"
								value="MANHA"
								control={<Radio />}
								label="Manhã"
								{...register("turno")}
							/>
							<FormControlLabel
								id="turno-tarde"
								value="TARDE"
								control={<Radio />}
								label="Tarde"
								{...register("turno")}
							/>
							<FormControlLabel
								id="turno-noite"
								value="NOITE"
								control={<Radio />}
								label="Noite"
								{...register("turno")}
							/>
						</RadioGroup>
						<Error
							id={"mensagem-erro-campo-matriculado"}
							width={"100%"}
						>
							{errors.turno?.message}
						</Error>
					</Grid>

					<Grid item xs={12} lg={6}>
						<TextField
							fullWidth
							id="instituicao-de-ensino-candidato"
							label="Instituição de ensino matriculado"
							error={!!errors.instituicao}
							helperText={errors.instituicao?.message}
							{...register("instituicao")}
						/>
					</Grid>

					<Grid item xs={12} lg={6}>
						<TextField
							fullWidth
							id="curso-candidato"
							label="Curso"
							error={!!errors.curso}
							helperText={errors.curso?.message}
							{...register("curso")}
						/>
					</Grid>

					<Grid item xs={12} lg={6}>
						<FormControl fullWidth>
							<InputLabel
								sx={{
									color: "GrayText",
								}}
							>
								Qual o seu nível de inglês?
							</InputLabel>
							<Select
								id="s2-nivel-ingles-candidato"
								label="Qual o seu nível de inglês"
								defaultValue="iniciante"
								{...register("ingles")}
							>
								<MenuItem value="iniciante">Iniciante</MenuItem>
								<MenuItem value="intermediario">
									Intermediário
								</MenuItem>
								<MenuItem value="avancado">Avançado</MenuItem>
								<MenuItem value="fluente">Fluente</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} lg={6}>
						<FormControl fullWidth>
							<InputLabel
								sx={{
									color: "GrayText",
								}}
							>
								Qual o seu nível de espanhol?
							</InputLabel>
							<Select
								label="Qual o seu nível de espanhol?"
								id="s2-nivel-espanhol-candidato"
								defaultValue="iniciante"
								{...register("espanhol")}
							>
								<MenuItem value="iniciante">Iniciante</MenuItem>
								<MenuItem value="intermediario">
									Intermediário
								</MenuItem>
								<MenuItem value="avancado">Avançado</MenuItem>
								<MenuItem value="fluente">Fluente</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} lg={3}>
						<FormControl fullWidth>
							<InputLabel
								sx={{
									color: "GrayText",
								}}
							>
								Qual a sua orientação sexual?
							</InputLabel>
							<Select
								id="orientacao-sexual-candidato"
								label="Qual a sua orientação sexual?"
								defaultValue="heterossexual"
								{...register("orientacao")}
							>
								<MenuItem value="heterossexual">
									Heterossexual
								</MenuItem>
								<MenuItem value="homossexual">
									Homossexual
								</MenuItem>
								<MenuItem value="bissexual">Bissexual</MenuItem>
								<MenuItem value="pansexual">Pansexual</MenuItem>
								<MenuItem value="outro">Outro</MenuItem>
								<MenuItem value="naoInformar">
									Prefiro não informar
								</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} lg={3}>
						<FormControl fullWidth>
							<InputLabel
								id="label-genero-candidato"
								sx={{
									color: "GrayText",
								}}
							>
								Qual o seu gênero?
							</InputLabel>
							<Select
								id="s2-select-genero-candidato"
								label="Qual o seu gênero?"
								defaultValue="cisgenero"
								fullWidth
								{...register("genero")}
							>
								<MenuItem value="cisgenero">
									Homem cisgênero
								</MenuItem>
								<MenuItem value="transgenero">
									Homem transgênero
								</MenuItem>
								<MenuItem value="mulherCisgenero">
									Mulher cisgênero
								</MenuItem>
								<MenuItem value="mulherCisgenero">
									Mulher transgênero
								</MenuItem>
								<MenuItem value="naoBinario">
									Não binário
								</MenuItem>
								<MenuItem value="outro">Outro</MenuItem>
								<MenuItem value="naoInformado">
									Prefiro não informar
								</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} lg={6}>
						<FormLabel
							id="label-trilha-candidato"
							sx={{
								color: "GrayText",
							}}
						>
							Selecione quais trilhas você deseja participar
						</FormLabel>
						<FormGroup
							aria-label="position"
							row
							sx={{
								color: "GrayText",
								gap: "2rem",
							}}
						>
							<FormControlLabel
								control={<Checkbox />}
								label="Back-end"
								id="s2-trilha-backend"
								{...register("trilhas")}
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="Front-end"
								id="s2-trilha-frontend"
								{...register("trilhas")}
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="QA"
								id="s2-trilha-qa"
								{...register("trilhas")}
							/>
						</FormGroup>
					</Grid>
					<Grid item xs={12}>
						<Tooltip
							title="Essa não é uma pergunta obrigatória, mas é importante para que possamos oferecer uma melhor experiência para você."
							placement="top"
							arrow
						>
							<FormControl fullWidth>
								<InputLabel
									sx={{
										color: "primary.main",
									}}
								>
									Você possui alguma deficiencia?
								</InputLabel>
								<Select
									id="s2-select-deficiencia-candidato"
									label="Você possui alguma deficiencia?"
									defaultValue="F"
									onChange={() => {
										setDeficiencia(
											deficiencia === "F" ? "T" : "F"
										);
									}}
								>
									<MenuItem value="F">Não</MenuItem>
									<MenuItem value="T">Sim</MenuItem>
								</Select>
							</FormControl>
						</Tooltip>
					</Grid>
					{deficiencia === "T" && (
						<Grid item xs={12}>
							<TextField
								label="Qual deficiência você possui?"
								variant="outlined"
								sx={{ width: "100%" }}
								id="s2-candidato-deficiencia-descricao"
								error={!!errors.deficiencia}
								helperText={errors.deficiencia?.message}
								{...register("deficiencia")}
							/>
						</Grid>
					)}

					<Grid item xs={12}>
						<Typography
							variant="h6"
							component="h2"
							color="primary.main"
							margin="1rem 0"
						>
							Nos conte o que levou você a se inscrever no Vem Ser
						</Typography>
						;
						<FormLabel
							sx={{
								color: "GrayText",
								fontWeight: "700",
							}}
						>
							O que te motiva em fazer parte do Vem Ser:
						</FormLabel>
						<FormGroup
							sx={{
								color: "GrayText",
							}}
						>
							<FormControlLabel
								control={<Checkbox />}
								label="Por gostar de desafios"
								id="s2-candidato-desafio"
								{...register("desafiosBoolean")}
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="Por gostar de resolver problemas"
								id="s2-candidato-problemas"
								{...register("problemasBoolean")}
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="Pelo reconhecimento e valorização financeira do profissional de tecnologia"
								id="s2-candidato-reconhecimento"
								{...register("reconhecimentoBoolean")}
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="Por querer ajudar outras pessoas"
								id="s2-candidato-altruismo"
								{...register("altruismoBoolean")}
							/>
							<FormControlLabel
								control={<Checkbox />}
								label="Outro motivo"
								id="s2-candidato-outro"
								{...register("altruismoBoolean")}
								onChange={() =>
									setAnotherReason((state) => !state)
								}
							/>
							<Error id={""} width={"100%"}>
								{errors.motivo?.message}
							</Error>
							{anotherReason && (
								<TextField
									label="Por qual motivo você se interessou pela área de tecnologia?"
									multiline={true}
									id="s2-candidato-motivo"
									error={!!errors.resposta}
									{...register("resposta")}
								/>
							)}
						</FormGroup>
					</Grid>

					<Grid item xs={12}>
						<TextField
							label="Alguém te ensinou algo importante para a vida e que você nunca esqueceu? Quem foi e o que você aprendeu?"
							multiline
							minRows={4}
							type="textArea"
							size="medium"
							fullWidth
							error={!!errors.algoimportante}
							helperText={errors.algoimportante?.message}
							id="textarea-importante-candidato"
							{...register("algoimportante")}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormLabel component="legend">
							Uma das nossas etapas eliminatórias de seleção será
							a realização de uma prova técnica. Será necessário
							conhecimento de lógica de programação e uso básico
							em algumas dessas tecnologias (Javascript, Java,
							Python, C e C++), mas será avaliado principalmente
							raciocínio para solução de problemas. Tens
							conhecimento necessário para realizar esta prova
							específica?
						</FormLabel>

						<Stack direction="row" spacing={2}>
							<FormLabel
								sx={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<RadioGroup
									defaultValue="F"
									row
									sx={{
										color: "GrayText",
									}}
								>
									<FormControlLabel
										id="s2-candidato-prova-sim"
										value="T"
										control={<Radio />}
										label="Sim"
										{...register("provaBoolean")}
									/>
									<FormControlLabel
										id="s2-candidato-prova-nao"
										value="F"
										control={<Radio />}
										label="Não"
										{...register("provaBoolean", {
											required: {
												value: false,
												message: "abacate",
											},
										})}
									/>
								</RadioGroup>
							</FormLabel>
						</Stack>
					</Grid>
					<Typography variant="caption" color="error">
						{errors.provaBoolean?.message}
					</Typography>

					<Grid item xs={12}>
						<FormLabel component="legend">
							O interesse da DBC é efetivar os participantes que
							se desenvolverem bem ao longo do período de
							formação. Tens interesse e disponibilidade para
							trabalhar em turno integral, (manhã e tarde, até 44h
							semanais), caso aprovado? (Disponibilidade de no
							mínimo 1 ano para ficar na DBC).
						</FormLabel>

						<Stack direction="row" spacing={2}>
							<FormLabel
								sx={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<RadioGroup
									row
									sx={{
										color: "GrayText",
									}}
									defaultValue="F"
								>
									<FormControlLabel
										id="s2-candidato-efetivacao-sim"
										value="T"
										control={<Radio />}
										label="Sim"
										{...register("efetivacaoBoolean")}
									/>
									<FormControlLabel
										id="s2-candidato-efetivacao-nao"
										value="F"
										control={<Radio />}
										label="Não"
										{...register("efetivacaoBoolean")}
									/>
								</RadioGroup>
							</FormLabel>
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<FormLabel component="legend">
							O estágio/capacitação acontecerá de maneira virtual,
							no turno da tarde, das 13h30min às 17h30min, de
							segunda a sexta-feira, e será necessária muita
							dedicação extra para as atividades. Tens
							disponibilidade em outros turnos para estudo?
						</FormLabel>

						<Stack direction="row" spacing={2}>
							<FormLabel
								sx={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<RadioGroup
									row
									sx={{
										color: "GrayText",
									}}
									defaultValue="F"
								>
									<FormControlLabel
										value="T"
										control={<Radio />}
										label="Sim"
										id="s2-candidato-disponibilidade-sim"
										{...register("disponibilidadeBoolean")}
									/>
									<FormControlLabel
										value="F"
										control={<Radio />}
										label="Não"
										id="s2-candidato-disponibilidade-nao"
										{...register("disponibilidadeBoolean")}
									/>
								</RadioGroup>
							</FormLabel>
						</Stack>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="url"
							label="Qual o link do seu repositorio no GitHub?"
							variant="outlined"
							sx={{
								width: "100%",
							}}
							id="s2-candidato-github"
							InputProps={{
								startAdornment: (
									<Box
										display="flex"
										alignItems="center"
										mr={1}
									>
										<GitHubIcon
											sx={{
												color: "primary.main",
											}}
										/>
									</Box>
								),
							}}
							{...register("github")}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							type="url"
							label="Qual o link do seu Linkedin"
							variant="outlined"
							sx={{
								width: "100%",
							}}
							id="s2-candidato-linkedin"
							InputProps={{
								startAdornment: (
									<Box
										display="flex"
										alignItems="center"
										mr={1}
									>
										<LinkedInIcon
											sx={{
												color: "primary.main",
											}}
										/>
									</Box>
								),
							}}
							{...register("github")}
						/>
					</Grid>
					<Grid item xs={12} lg={6}>
						<Box display="flex" flexDirection="column">
							<FormLabel
								id="label-curriculo-candidato"
								sx={{
									color: "GrayText",
								}}
							>
								Adicionar currículo
							</FormLabel>
							<Box
								display="flex"
								gap="1rem"
								alignItems="flex-end"
							>
								{!curriculo?.[0] && (
									<Button
										variant="outlined"
										component="label"
									>
										Adicionar
										<input
											id="s2-input-curriculo"
											hidden
											type="file"
											{...register("curriculo")}
										/>
									</Button>
								)}
								{curriculo?.[0] && (
									<Button
										variant="outlined"
										component="label"
									>
										{" "}
										<UploadFileIcon
											sx={{
												marginRight: "0.5rem",
											}}
										/>
										{curriculo?.[0]?.name}
										<input
											id="s2-input-curriculo-2"
											hidden
											type="file"
											{...register("curriculo")}
										/>
									</Button>
								)}
							</Box>
						</Box>
						{/* <Error
							id={"mensagem-erro-campo-curriculo"}
							width={"100%"}
						>
							{errors.curriculo?.message}
						</Error> */}
					</Grid>
					<Grid item xs={12} lg={6}>
						<Box display="flex" flexDirection="column">
							<FormLabel
								id="label-configuracao-candidato"
								sx={{
									color: "GrayText",
								}}
							>
								Adicionar print das configurações do seu
								computador
							</FormLabel>
							<Box
								display="flex"
								gap="1rem"
								alignItems="flex-end"
							>
								{!configuracoes?.[0] && (
									<Button
										variant="outlined"
										component="label"
									>
										Adicionar
										<input
											id="s2-input-configuracoes"
											hidden
											type="file"
											{...register("configuracoes")}
										/>
									</Button>
								)}
								{configuracoes?.[0] && (
									<Button
										variant="outlined"
										component="label"
									>
										{" "}
										<UploadFileIcon
											sx={{
												marginRight: "0.5rem",
											}}
										/>
										{configuracoes?.[0]?.name}
										<input
											id="s2-input-configuracoes-2"
											hidden
											type="file"
											{...register("configuracoes")}
										/>
									</Button>
								)}
							</Box>
						</Box>
						{/* <Error
							id={"mensagem-erro-campo-configuracao"}
							width={"100%"}
						>
							{errors.configuracao?.message}
						</Error> */}
					</Grid>

					<Grid
						item
						xs={12}
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							gap: 2,
							margin: "2rem 0",
						}}
					>
						<Button
							type="button"
							id="s2-botao-voltar"
							variant="outlined"
							onClick={() => {
								dispatch(previousStep());
							}}
							sx={{
								width: "10rem",
							}}
						>
							Voltar
						</Button>
						<Button
							id="s2-botao-submit"
							variant="contained"
							type="submit"
							sx={{
								width: "10rem",
							}}
						>
							Enviar
						</Button>
					</Grid>
				</>
			)}
		</FormGrid>
	);
};
