import { DisplaySettings } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import {
  useGetEdicaoAtualMutation,
  usePostNewEdicaoMutation,
} from "shared/features/api/edicao/edicaoSlice";
import {
  useDeleteTrilhaMutation,
  useGetTrilhasMMutation,
  useGetTrilhasQuery,
  usePostNewTrilhaMutation,
} from "shared/features/api/trilha/trilhaSlice";
import React from "react";
import { toast } from "react-toastify";
import { Trilhas } from "shared/features/api/trilha/types";

export const Configurations = () => {
  const [edicaoAtual, setEdicaoAtual] = React.useState<string>("");
  const [edicaoValue, setEdicaoValue] = React.useState<string>("");
  const [trilhaId, setTrilhaId] = React.useState<number>(0);
  const [trilhaValue, setTrilhaValue] = React.useState<string>("");
  const [newTrilhaValue, setNewTrilhaValue] = React.useState<string>("");
  const [data, setData] = React.useState<Trilhas[]>();
  const [getEdicaoAtual] = useGetEdicaoAtualMutation();
  const [postNewEdicao] = usePostNewEdicaoMutation();
  const [postNewTrilha] = usePostNewTrilhaMutation();
  const [deleteTrilha, { error }] = useDeleteTrilhaMutation();
  const [getTrilhasM] = useGetTrilhasMMutation();
  // const { data } = useGetTrilhasQuery();

  React.useEffect(() => {
    getEdicaoAtual()
      .unwrap()
      .then((edicao) => {
        setEdicaoAtual(edicao);
      });
  }, []);

  React.useEffect(() => {
    getTrilhasM()
      .unwrap()
      .then((trilhas) => {
        setData(trilhas);
      });
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<DisplaySettings />}
        sx={{
          color: "primary.light",
          borderColor: "primary.light",
          "&:hover": {
            color: "secondary.main",
          },
        }}
        onClick={handleClickOpen}
      >
        Configurações
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Configurações</DialogTitle>
        <DialogContent>
          <Box>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Inscrições
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", alignSelf: "center" }}
                >
                  Altere os textos dos campos do formulário
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={2}
                >
                  <Button
                    variant="contained"
                    component="a"
                    href="https://dashboard.datocms.com/"
                    target="_blank"
                    size="small"
                    fullWidth
                  >
                    Alterar
                  </Button>
                  <Button
                    variant="outlined"
                    component="a"
                    href="https://dashboard.datocms.com/"
                    target="_blank"
                    size="small"
                    fullWidth
                  >
                    Entender sobre o CMS
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Entrevistas
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Altere o link das entrevistas
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "120px 1fr",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Button variant="contained" size="small">
                      Front End
                    </Button>
                    <TextField
                      label="https://google.com.br"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "120px 1fr",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Button variant="contained" size="small">
                      Back End
                    </Button>
                    <TextField
                      label="https://google.com.br"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "120px 1fr",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Button variant="contained" size="small">
                      QA
                    </Button>
                    <TextField
                      label="https://google.com.br"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Edição
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Altere a edição atual do VemSer
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={2}
                    sx={{ width: "100%" }}
                  >
                    <TextField
                      label="Nome da edição"
                      variant="outlined"
                      size="small"
                      value={edicaoValue}
                      onChange={(e) => setEdicaoValue(e.target.value)}
                      fullWidth
                    />
                    {edicaoValue && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          postNewEdicao({
                            nome: edicaoValue,
                          })
                            .unwrap()
                            .then(() => {
                              toast.success("Edição alterada com sucesso");
                            })
                            .catch(() => {
                              toast.error("Erro ao alterar a edição");
                            })
                            .finally(() => {
                              getEdicaoAtual()
                                .unwrap()
                                .then((edicao) => {
                                  setEdicaoAtual(edicao);
                                });
                            });
                          handleClose();
                        }}
                      >
                        alterar
                      </Button>
                    )}
                  </Stack>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <Box component="strong" sx={{ color: "red" }}>
                      * Obs:
                    </Box>{" "}
                    alterar a edição atual modifica a edição no ato da inscrição
                    do candidato
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Edição atual: <strong>{edicaoAtual || "Carregando"}</strong>
                  </Typography>
                </Stack>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Trilhas
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Adicione e altere as trilhas do VemSer
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Trilhas
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Trilhas"
                          value={trilhaValue}
                          onChange={(e) => {
                            setTrilhaValue(e.target.value);
                          }}
                          fullWidth
                        >
                          {data?.map((trilha) => (
                            <MenuItem
                              value={trilha.nome}
                              onClick={() => {
                                setTrilhaId(trilha.idTrilha);
                              }}
                            >
                              {trilha.nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {trilhaValue !== "" && (
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ minWidth: "120px" }}
                          onClick={() => {
                            deleteTrilha(trilhaId)
                              .unwrap()
                              .then(() => {
                                toast.success("Trilha removida com sucesso");
                              })
                              .catch((err) => {
                                err.data.message? toast.error(`${err.data.message}`) : 
                                toast.error("Erro ao remover a trilha");
                              });                              
                            handleClose();
                          }}
                        >
                          Remover
                        </Button>
                      )}
                    </Stack>
                  </Box>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      label="Adicionar nova trilha"
                      onChange={(e) => setNewTrilhaValue(e.target.value)}
                      value={newTrilhaValue}
                      variant="outlined"
                      fullWidth
                    />
                    {newTrilhaValue !== "" && (
                      <Button
                        variant="contained"
                        sx={{ minWidth: "120px" }}
                        onClick={() => {
                          postNewTrilha({
                            nome: newTrilhaValue,
                          })
                            .unwrap()
                            .then(() => {
                              toast.success("Trilha adicionada com sucesso");
                            })
                            .catch(() => {
                              toast.error("Erro ao adicionar a trilha");
                            });
                          handleClose();
                        }}
                      >
                        Adicionar
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
