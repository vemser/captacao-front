import React from "react";
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
	Tooltip,
	InputLabel,
	Select,
	MenuItem,
	OutlinedInput,
	Typography,
	Box,
	FormControl,
	FormLabel,
	Stack,
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

export const StepTwo: React.FC = () => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SubscribeData>({
		resolver: yupResolver(stepTwoSchema),
	});

	const onSubmit = (data: SubscribeData) => {
		dispatch(changeData(data));
	};

	return (
		<FormGrid onSubmit={handleSubmit(onSubmit)}>
			<Grid item xs={12} lg={6}>
				<InputLabel
					sx={{
						color: "primary.main",
					}}
				>
					Você é matriculado em algum curso de graduação ou técnico?
				</InputLabel>
				<RadioGroup
					row
					sx={{
						color: "primary.main",
					}}
				>
					<FormControlLabel
						id="matriculado-sim"
						value="T"
						control={<Radio />}
						label="Sim"
					/>
					<FormControlLabel
						id="matriculado-nao"
						value="F"
						control={<Radio />}
						label="Não"
					/>
				</RadioGroup>
			</Grid>
			<Grid item xs={12} lg={6}>
				<InputLabel
					sx={{
						color: "primary.main",
					}}
				>
					Qual o turno que você estuda?
				</InputLabel>
				<RadioGroup
					row
					sx={{
						color: "primary.main",
					}}
				>
					<FormControlLabel
						id="turno-manha"
						value="MANHA"
						control={<Radio />}
						label="Manhã"
					/>
					<FormControlLabel
						id="turno-tarde"
						value="TARDE"
						control={<Radio />}
						label="Tarde"
					/>
					<FormControlLabel
						id="turno-noite"
						value="NOITE"
						control={<Radio />}
						label="Noite"
					/>
				</RadioGroup>
			</Grid>
			<Grid item xs={12} lg={6}>
				<TextField
					fullWidth
					id="instituicao-de-ensino-candidato"
					label="Instituição de ensino matriculado"
				/>
			</Grid>
			<Grid item xs={12} lg={6}>
				<TextField fullWidth id="curso-candidato" label="Curso" />
			</Grid>
			<Grid item xs={12} lg={6}>
				<FormControl fullWidth>
					<InputLabel
						sx={{
							color: "primary.main",
						}}
					>
						Qual o seu nível de inglês?
					</InputLabel>
					<Select
						id="nivel-ingles-candidato"
						label="Qual o seu nível de inglês?"
					>
						<MenuItem value="iniciante">Iniciante</MenuItem>
						<MenuItem value="intermediario">Intermediário</MenuItem>
						<MenuItem value="avancado">Avançado</MenuItem>
						<MenuItem value="fluente">Fluente</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} lg={6}>
				<FormControl fullWidth>
					<InputLabel
						sx={{
							color: "primary.main",
						}}
					>
						Qual o seu nível de espanhol?
					</InputLabel>
					<Select
						label="Qual o seu nível de espanhol?"
						id="nivel-espanhol-candidato"
					>
						<MenuItem value="iniciante">Iniciante</MenuItem>
						<MenuItem value="intermediario">Intermediário</MenuItem>
						<MenuItem value="avancado">Avançado</MenuItem>
						<MenuItem value="fluente">Fluente</MenuItem>
					</Select>
				</FormControl>
			</Grid>

			<Grid item xs={12} lg={3}>
				<FormControl fullWidth>
					<InputLabel
						sx={{
							color: "primary.main",
						}}
					>
						Qual a sua orientação sexual?
					</InputLabel>
					<Select
						id="orientacao-sexual-candidato"
						label="Qual a sua orientação sexual?"
					>
						<MenuItem value="heterossexual">Heterossexual</MenuItem>
						<MenuItem value="homossexual">Homossexual</MenuItem>
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
							color: "primary.main",
						}}
					>
						Qual o seu gênero?
					</InputLabel>
					<Select label="Qual o seu gênero?" fullWidth>
						<MenuItem
							id="genero-homem-cisgenero-candidato"
							value="cisgenero"
						>
							Homem cisgênero
						</MenuItem>
						<MenuItem
							id="genero-homem-transgenero-candidato"
							value="transgenero"
						>
							Homem transgênero
						</MenuItem>
						<MenuItem
							id="genero-mulher-cisgenero-candidato"
							value="mulherCisgenero"
						>
							Mulher cisgênero
						</MenuItem>
						<MenuItem
							id="genero-mulher-transgenero-candidato"
							value="mulherCisgenero"
						>
							Mulher transgênero
						</MenuItem>
						<MenuItem
							id="genero-nao-binario-candidato"
							value="naoBinario"
						>
							Não binário
						</MenuItem>
						<MenuItem id="genero-outro-candidato" value="outro">
							Outro
						</MenuItem>
						<MenuItem
							id="genero-nao-informado-candidato"
							value="naoInformado"
						>
							Prefiro não informar
						</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} lg={6}>
				<InputLabel
					id="label-trilha-candidato"
					sx={{
						color: "primary.main",
					}}
				>
					Selecione qual trilha você deseja participar
				</InputLabel>

				<FormControlLabel
					id="trilha-backend"
					value=""
					control={<Radio />}
					label="Back-end"
					sx={{
						marginRight: "2rem",
						color: "primary.main",
					}}
				/>
				<FormControlLabel
					id="trilha-frontend"
					value=""
					control={<Radio />}
					label="Front-end"
					sx={{
						marginRight: "2rem",
						color: "primary.main",
					}}
				/>
				<FormControlLabel
					id="trilha-qa"
					value=""
					control={<Radio />}
					label="QA"
					sx={{
						color: "primary.main",
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				<InputLabel
					sx={{
						color: "primary.main",
					}}
				>
					O que levou você a inscrever-se no VemSer?
				</InputLabel>
				<FormGroup
					sx={{
						color: "primary.main",
					}}
				>
					<FormControlLabel
						control={<Checkbox />}
						label="Por gostar de desafios"
						id="s2-candidato-desafio"
                      	// {...register("desafiosBoolean")}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Por gostar de resolver problemas"
						id="s2-candidato-problemas"
						// {...register("problemasBoolean")}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Pelo reconhecimento e valorização financeira do profissional de tecnologia"
						id="s2-candidato-reconhecimento"
						// {...register("reconhecimentoBoolean")}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Por querer ajudar outras pessoas"
						id="s2-candidato-altruismo"
						// {...register("altruismoBoolean")}
						
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Por outro motivo"
						id="s2-candidato-outro"
					/>
				</FormGroup>
			</Grid>

			<Grid item xs={12}>
				<TextField
					label="O que levou você a inscrever-se no VemSer?"
					multiline
					minRows={3}
					type="textArea"
					size="medium"
					fullWidth
					id="textarea-motivacao-da-inscricao-candidato"
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Nos conte o que te inspira na área de TI?"
					multiline
					minRows={3}
					type="textArea"
					size="medium"
					fullWidth
					id="textarea-inspiracao-candidato"
				/>
			</Grid>

			<Grid item xs={12}>
				<TextField
					label="Quem te ensinou algo importante na área de TI?"
					multiline
					minRows={3}
					type="textArea"
					size="medium"
					fullWidth
					id="textarea-algo-importante-candidato"
				/>
			</Grid>
			<Grid item xs={12}>
				<FormLabel component="legend">
					Uma das nossas etapas eliminatórias de seleção será a
					realização de uma prova técnica. Será necessário
					conhecimento de lógica de programação e uso básico em
					algumas dessas tecnologias (Javascript, Java, Python, C e
					C++), mas será avaliado principalmente raciocínio para
					solução de problemas. Tens conhecimento necessário para
					realizar esta prova específica?
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
								color: "primary.main",
							}}
						>
							<FormControlLabel
								id="s2-candidato-prova-sim"
								value="T"
								control={<Radio />}
								label="Sim"
								// {...register("provaBoolean")}
							/>
							<FormControlLabel
								id="s2-candidato-prova-nao"
								value="F"
								control={<Radio />}
								label="Não"
								// {...register("provaBoolean")}
							/>
						</RadioGroup>
					</FormLabel>
				</Stack>
			</Grid>

			<Grid item xs={12}>
				<FormLabel component="legend">
					O interesse da DBC é efetivar os participantes que se
					desenvolverem bem ao longo do período de formação. Tens
					interesse e disponibilidade para trabalhar em turno
					integral, (manhã e tarde, até 44h semanais), caso aprovado?
					(Disponibilidade de no mínimo 1 ano para ficar na DBC).
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
								color: "primary.main",
							}}
						>
							<FormControlLabel
								id="s2-candidato-efetivacao-sim"
								value="T"
								control={<Radio />}
								label="Sim"
								// {...register("efetivacaoBoolean")}
							/>
							<FormControlLabel
								id="s2-candidato-efetivacao-nao"
								value="F"
								control={<Radio />}
								label="Não"
								// {...register("efetivacaoBoolean")}
							/>
						</RadioGroup>
					</FormLabel>
				</Stack>
			</Grid>
			<Grid item xs={12}>
				<FormLabel component="legend">
					O estágio/capacitação acontecerá de maneira virtual, no
					turno da tarde, das 13h30min às 17h30min, de segunda a
					sexta-feira, e será necessária muita dedicação extra para as
					atividades. Tens disponibilidade em outros turnos para
					estudo?
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
								color: "primary.main",
							}}
						>
							<FormControlLabel
								value="T"
								control={<Radio />}
								label="Sim"
								id="s2-candidato-disponibilidade-sim"
								// {...register("disponibilidadeBoolean")}
							/>
							<FormControlLabel
								value="F"
								control={<Radio />}
								label="Não"
								id="s2-candidato-disponibilidade-nao"
								// {...register("disponibilidadeBoolean")}
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
							<Box display="flex" alignItems="center" mr={1}>
								<GitHubIcon />
							</Box>
						),
					}}
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
							<Box display="flex" alignItems="center" mr={1}>
								<LinkedInIcon />
							</Box>
						),
					}}
				/>
			</Grid>
			<Grid item xs={12} lg={6}>
				<InputLabel
					id="label-hardware-candidato"
					sx={{
						color: "primary.main",
					}}
				>
					Adicionar currículo
				</InputLabel>
				<Button variant="outlined" component="label">
					Adicionar
					<input hidden type="file" />
				</Button>
			</Grid>
			<Grid item xs={12} lg={6}>
				<InputLabel
					id="label-hardware-candidato"
					sx={{
						color: "primary.main",
					}}
				>
					Adicionar print das configurações do seu hardware
				</InputLabel>
				<Button variant="outlined" component="label">
					Adicionar
					<input hidden type="file" />
				</Button>
			</Grid>
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
