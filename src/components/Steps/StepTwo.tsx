import React, { useState, useEffect } from "react";
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
  SelectChangeEvent,
  OutlinedInput,
  ListItemText,
  FormHelperText,
} from "@mui/material";
import {
  previousStep,
  changeData,
  nextStep,
  useSteps,
} from "../../shared/features/subscription/stepsSlice";
import { useDispatch, useSelector } from "react-redux";
import { FormGrid } from "components/FormGrid";
import { IFormQuery, SubscribeData } from "shared/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepTwoSchema } from "shared/schemas/stepTwo";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Error } from "../TextError/index";
import { useGetSubscribeFormQuery } from "shared/features/api/subscription/formSlice";
import { useGetTrilhasQuery } from "shared/features/api/trilha/trilhaSlice";

const names = [
  "C#",
  "Javascript",
  "Kotlin",
  "Java",
  "C++",
  "PHP",
  "Ruby",
  "Python",
  "Swift",
  "C",
  "Outras",
];

export const StepTwo: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useGetSubscribeFormQuery();
  const { data: getTrilha, isLoading: isLoadingTrilha } = useGetTrilhasQuery();
  const { data: formData } = useSelector(useSteps);
  const formulario = data?.data.formulario;
  const [deficiencia, setDeficiencia] = useState("F");
  const [languages, setLanguage] = React.useState<string[]>(
    formData?.linguagens || []
  );
  const [hasLang, setHasLang] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<typeof languages>) => {
    const {
      target: { value },
    } = event;
    setLanguage(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    languages.length == 0 ? setHasLang(true) : setHasLang(false);
  }, [languages]);

  useEffect(() => {
    setHasLang(false);
    window.scrollTo(0, 0);
  }, []);

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

  const verificar = () => {
    languages.length == 0 ? setHasLang(true) : setHasLang(false);
  };

  const onSubmit = (data: SubscribeData) => {
    if (languages.length == 0) {
      setHasLang(true);
      const selecao: HTMLElement | null = document.getElementById(
        "s2-select-linguagens-checkbox"
      );
      selecao?.scrollIntoView();
    } else {
      data.resposta === "" && (data.resposta = "Nenhuma");
      data.linkedin.length === 0 && (data.linkedin = "Nenhum");
      data.github.length === 0 && (data.github = "Nenhum");

      const formValues = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value === "T" ? true : value === "F" ? false : value,
        ])
      );

      dispatch(nextStep());
      dispatch(
        changeData({
          ...formValues,
          linguagens: languages,
        })
      );
    }
  };

  const FormName: React.FC<IFormQuery> = ({ nome }) => {
    return <>{nome ? nome : <CircularProgress size={22} />}</>;
  };

  const matriculado = watch("matriculado");
  const curriculo = watch("curriculo");
  const configuracoes = watch("configuracoes");

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
              defaultValue={
                formData?.turno ? formData.turno : "MANHA" || "MANHA"
              }
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
              defaultValue={formData?.instituicao}
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
              defaultValue={formData?.curso}
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
                defaultValue={
                  formData?.ingles
                    ? formData.ingles
                    : "nenhum" || "nenhum"
                }
                {...register("ingles")}
              >
                <MenuItem value="nenhum">Nenhum</MenuItem>
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
                defaultValue={
                  formData?.espanhol
                    ? formData.espanhol
                    : "nenhum" || "nenhum"
                }
                {...register("espanhol")}
              >
                <MenuItem value="nenhum">Nenhum</MenuItem>
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
                defaultValue={
                  formData?.orientacao
                    ? formData.orientacao
                    : "heterossexual" || "heterossexual"
                }
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
                defaultValue={
                  formData?.genero
                    ? formData.genero
                    : "cisgenero" || "cisgenero"
                }
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
            <Tooltip
              title={formulario?.linguagemDeProgramacaoTooltip}
              placement="top"
              arrow
            >
              <FormControl fullWidth error={hasLang}>
                <InputLabel id="s2-select-linguagens">
                  <FormName nome={formulario?.linguagemDeProgramacao} />
                </InputLabel>
                <Select
                  labelId="s2-select-linguagens"
                  id="s2-select-linguagens-checkbox"
                  multiple
                  value={languages}
                  onChange={handleChange}
                  input={
                    <OutlinedInput label={formulario?.linguagemDeProgramacao} />
                  }
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        checked={languages.indexOf(name) > -1}
                      // defaultChecked={formData?.linguagens.includes(name)}
                      />
                      <ListItemText
                        id={`s2-linguagens-${name}`}
                        primary={name}
                      />
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {hasLang
                    ? "Pelo menos uma linguagem deve ser selecionada"
                    : ""}
                </FormHelperText>
              </FormControl>
            </Tooltip>
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
              {isLoadingTrilha ? (
                <CircularProgress />
              ) : (
                getTrilha ? getTrilha.map((trilha) => {
                  return (
                    <FormControlLabel
                      key={trilha.nome}
                      control={
                        <Checkbox
                          defaultChecked={
                            // @ts-ignore
                            formData?.trilhas?.includes(trilha.nome)
                          }
                        />
                      }
                      label={trilha.nome}
                      value={trilha.nome}
                      id={`s2-trilha-${trilha.nome}`}
                      {...register("trilhas")}
                    />
                  );
                }) : (
                    <FormControlLabel
                    disabled
                    key={"sem-trilha"}
                    control={
                      <Checkbox
                        defaultChecked={
                          // @ts-ignore
                          formData?.trilhas?.includes(trilha.nome)
                        }
                      />
                    }
                    label={"Nenhuma trilha encontrada"}
                    value={"Nenhuma trilha encontrada"}
                    id={"sem-trilha"}
                  />
                )
              )}
            </FormGroup>
            {errors.trilhas && (
              <FormHelperText error>
                {/* @ts-ignore */}
                {errors.trilhas?.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12}>
            <Tooltip
              title="Essa pergunta é importante para que possamos oferecer uma melhor experiência para você."
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
                defaultValue={formData?.deficiencia}
                id="s2-candidato-deficiencia-descricao"
                error={!!errors.deficiencia}
                helperText={errors.deficiencia?.message}
                {...register("deficiencia")}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              label={<FormName nome={formulario?.s2OutroMotivo} />}
              multiline
              defaultValue={formData?.resposta}
              minRows={4}
              type="textArea"
              size="medium"
              fullWidth
              error={!!errors.resposta}
              helperText={errors.resposta?.message}
              id="s2-candidato-motivo"
              {...register("resposta")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label={<FormName nome={formulario?.s2AlgoImp} />}
              multiline
              defaultValue={formData?.algoimportante}
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
                  defaultValue={
                    formData?.provaBoolean === true ? "T" : "F" || "F"
                  }
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
                  defaultValue={
                    formData?.disponibilidadeBoolean === true ? "T" : "F" || "F"
                  }
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
                  defaultValue={
                    formData?.disponibilidadeBoolean === true ? "T" : "F" || "F"
                  }
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
              defaultValue={formData?.github == 'Nenhum' ? '' : formData?.github}
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
              defaultValue={formData?.linkedin != "Nenhum" ? formData?.linkedin : ''}
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
              {...register("linkedin")}
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
            {errors.curriculo && (
              // @ts-ignore
              <FormHelperText error>{errors.curriculo?.message}</FormHelperText>
            )}
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
                      accept=""
                      hidden
                      type="file"
                      {...register("configuracoes")}
                    />
                  </Button>
                )}
              </Box>
            </Box>
            {errors.configuracoes && (
              <FormHelperText error>
                {/* @ts-ignore */}
                {errors.configuracoes?.message}
              </FormHelperText>
            )}
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
                control={<Checkbox defaultChecked={formData?.lgpdBoolean} />}
                id="s2-candidato-lgpd"
                label="Você concorda com o tratamento dos seus dados pessoais para fins de seleção de candidatos?*"
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
              justifyContent: "space-between",
              gap: 2,
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
              onClick={() => verificar()}
            // disabled={!curriculo?.[0] || !configuracoes?.[0]}
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
