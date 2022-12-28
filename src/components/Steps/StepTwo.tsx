import React, { useEffect, useState } from "react";
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
  CircularProgress,
  useMediaQuery,
  useTheme,
  FormHelperText,
  Autocomplete,
  SelectChangeEvent,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import {
  previousStep,
  changeData,
} from "../../shared/features/subscription/stepsSlice";
import { useDispatch } from "react-redux";
import { FormGrid } from "components/FormGrid";
import { IFormQuery, SubscribeData } from "shared/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepTwoSchema } from "shared/schemas/stepTwo";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Error } from "../error/index";
import { useGetSubscribeFormQuery } from "shared/features/api/subscription/formSlice";

const names = ["Javascript", "Typescript", "Java"];

export const StepTwo: React.FC = () => {
  const dispatch = useDispatch();
  const [anotherReason, setAnotherReason] = useState(false);
  const [deficiencia, setDeficiencia] = useState("F");
  const { data } = useGetSubscribeFormQuery();
  const formulario = data?.data.formulario;

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubscribeData>({
    defaultValues: {
      matriculado: "T",
    },
    resolver: yupResolver(stepTwoSchema),
  });

  const onSubmit = (data: SubscribeData) => {
    dispatch(changeData(data));
    // console.log(data);
  };

  const FormName: React.FC<IFormQuery> = ({ nome }) => {
    return <>{nome ? nome : <CircularProgress size={22} />}</>;
  };

  const { matriculado, curriculo, configuracoes } = watch();

  return (
    <FormGrid onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12} lg={6}>
        <FormLabel>
          <FormName nome={formulario?.s2Matriculado} />
        </FormLabel>
        <RadioGroup
          row
          sx={{
            color: "GrayText",
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
              <FormName nome={formulario?.s2Turno} />
            </FormLabel>
            <RadioGroup
              row
              sx={{
                color: "GrayText",
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
            <Error id={"mensagem-erro-campo-matriculado"} width={"100%"}>
              {errors.turno?.message}
            </Error>
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              id="instituicao-de-ensino-candidato"
              label={<FormName nome={formulario?.s2Instituicao} />}
              error={!!errors.instituicao}
              helperText={errors.instituicao?.message}
              {...register("instituicao")}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              id="curso-candidato"
              label={<FormName nome={formulario?.s2Curso} />}
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
                <FormName nome={formulario?.s2InglS} />
              </InputLabel>
              <Select
                id="s2-nivel-ingles-candidato"
                label={<FormName nome={formulario?.s2InglS} />}
                defaultValue="iniciante"
                {...register("ingles")}
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
                  color: "GrayText",
                }}
              >
                <FormName nome={formulario?.s2Espanhol} />
              </InputLabel>
              <Select
                label={<FormName nome={formulario?.s2Espanhol} />}
                id="s2-nivel-espanhol-candidato"
                defaultValue="iniciante"
                {...register("espanhol")}
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
                  color: "GrayText",
                }}
              >
                <FormName nome={formulario?.s2OriSexual} />
              </InputLabel>
              <Select
                id="orientacao-sexual-candidato"
                label={<FormName nome={formulario?.s2OriSexual} />}
                defaultValue="heterossexual"
                {...register("orientacao")}
              >
                <MenuItem value="heterossexual">Heterossexual</MenuItem>
                <MenuItem value="homossexual">Homossexual</MenuItem>
                <MenuItem value="bissexual">Bissexual</MenuItem>
                <MenuItem value="pansexual">Pansexual</MenuItem>
                <MenuItem value="outro">Outro</MenuItem>
                <MenuItem value="naoInformar">Prefiro não informar</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel
                id="label-genero-candidato"
                sx={{
                  color: "GrayText",
                }}
              >
                <FormName nome={formulario?.s2GNero} />
              </InputLabel>
              <Select
                id="s2-select-genero-candidato"
                label={<FormName nome={formulario?.s2GNero} />}
                defaultValue="cisgenero"
                fullWidth
                {...register("genero")}
              >
                <MenuItem value="cisgenero">Homem cisgênero</MenuItem>
                <MenuItem value="transgenero">Homem transgênero</MenuItem>
                <MenuItem value="mulherCisgenero">Mulher cisgênero</MenuItem>
                <MenuItem value="mulherCisgenero">Mulher transgênero</MenuItem>
                <MenuItem value="naoBinario">Não binário</MenuItem>
                <MenuItem value="outro">Outro</MenuItem>
                <MenuItem value="naoInformado">Prefiro não informar</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="s2-select-linguagens">
                Linguagens de programação
              </InputLabel>
              <Select
                labelId="s2-select-linguagens"
                id="s2-select-linguagens-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Linguagens de programação" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
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
              <FormName nome={formulario?.s2Trilha} />
            </FormLabel>
            <FormGroup
              aria-label="position"
              row
              sx={{
                color: "GrayText",
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                value="backend"
                label="Back-end"
                id="s2-trilha-backend"
                {...register("trilhas")}
              />
              <FormControlLabel
                control={<Checkbox />}
                value="frontend"
                label="Front-end"
                id="s2-trilha-frontend"
                {...register("trilhas")}
              />
              <FormControlLabel
                control={<Checkbox />}
                value="qa"
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
                  <FormName nome={formulario?.s2DeficiNcia} />
                </InputLabel>
                <Select
                  id="s2-select-deficiencia-candidato"
                  label={<FormName nome={formulario?.s2DeficiNcia} />}
                  defaultValue="F"
                  onChange={() => {
                    setDeficiencia(deficiencia === "F" ? "T" : "F");
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
                label={<FormName nome={formulario?.s2DefDesc} />}
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
              <FormName nome={formulario?.s2TextoMotivacao} />
            </Typography>
            ;
            <FormLabel
              sx={{
                color: "GrayText",
                fontWeight: "700",
              }}
            >
              <FormName nome={formulario?.s2SubtTextmotivacao} />
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
                onChange={() => setAnotherReason((state) => !state)}
              />
              <Error id="mensagem-erro-outro-motivo" width={"100%"}>
                {errors.motivo?.message}
              </Error>
              {anotherReason && (
                <TextField
                  label={<FormName nome={formulario?.s2OutroMotivo} />}
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
              label={<FormName nome={formulario?.s2AlgoImp} />}
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
              <FormName nome={formulario?.s2TextoLingProva} />
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
              <FormName nome={formulario?.s2TextoDisp} />
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
              <FormName nome={formulario?.s2DispHaula} />
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
              label={<FormName nome={formulario?.s2Github} />}
              variant="outlined"
              sx={{
                width: "100%",
              }}
              id="s2-candidato-github"
              InputProps={{
                startAdornment: (
                  <Box display="flex" alignItems="center" mr={1}>
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
              label={<FormName nome={formulario?.s2Linkedin} />}
              variant="outlined"
              sx={{
                width: "100%",
              }}
              id="s2-candidato-linkedin"
              InputProps={{
                startAdornment: (
                  <Box display="flex" alignItems="center" mr={1}>
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
                <FormName nome={formulario?.s2Curriculo} />
              </FormLabel>
              <Box display="flex" gap="1rem" alignItems="flex-end">
                {!curriculo?.[0] && (
                  <Button
                    id="botao-curriculo"
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
                    id="botao-curriculo"
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
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box display="flex" flexDirection="column">
              <FormLabel
                id="label-configuracao-candidato"
                sx={{
                  color: "GrayText",
                }}
              >
                <FormName nome={formulario?.s2ConfiguraEsDaMQuina} />
              </FormLabel>
              <Box display="flex" gap="1rem" alignItems="flex-end">
                {!configuracoes?.[0] && (
                  <Button
                    id="botao-configuracoes"
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
                    id="botao-configuracoes"
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
          </Grid>

          <Grid item xs={12}>
            <FormGroup
              aria-label="position"
              row
              sx={{
                color: "GrayText",
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                id="s2-candidato-lgpd"
                label="Você concorda com o tratamento dos seus dados pessoais para fins de seleção de candidatos?"
                {...register("lgpdBoolean")}
              />
            </FormGroup>
            <Error id={"mensagem-erro-lgpd"} width={"100%"}>
              {errors.lgpdBoolean?.message}
            </Error>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
                width: "8rem",
              }}
            >
              Voltar
            </Button>
            <Button
              id="s2-botao-submit"
              variant="contained"
              type="submit"
              sx={{
                width: "8rem",
              }}
              disabled={!curriculo?.[0] || !configuracoes?.[0]}
            >
              Enviar
            </Button>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        {matriculado !== "T" && (
          <Error id="erro-não-matriculado" width="100%">
            Devido as restrições impostas pelas leis brasileiras, somente alunos
            que possuem vínculo com uma instituição de ensino podem se
            candidatar às vagas de estágio.
          </Error>
        )}
      </Grid>
    </FormGrid>
  );
};
