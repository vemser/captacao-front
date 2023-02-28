import React, { useEffect, useState } from "react";
import {
  previousStep,
  changeData,
  nextStep,
  useSteps,
} from "../../shared/features/subscription/stepsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  usePostNewFormularioMutation,
  useUploadCurriculoMutation,
  useUploadFileMutation,
} from "shared/features/api/formulario/formularioSlice";
import { usePostCandidatoMutation } from "shared/features/api/candidato/candidatoSlice";
import { usePostInscricaoMutation } from "shared/features/api/inscricao/inscricaoSlice";
import { useGetEdicaoAtualMutation } from "shared/features/api/edicao/edicaoSlice";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";

export const StepThree: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(useSteps);

  const [idFormulario, setIdFormulario] = useState<number | null>(null);
  const [idCandidato, setIdCandidato] = useState<number | null>(null);
  const [edicaoAtual, setEdicaoAtual] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [erroMsg, setErroMsg] = useState<string>('')

  const [postNewFormulario] = usePostNewFormularioMutation();
  const [postCandidato] = usePostCandidatoMutation();
  const [postInscricao] = usePostInscricaoMutation();
  const [uploadFile] = useUploadFileMutation();
  const [uploeadCurriculo] = useUploadCurriculoMutation();
  const [getEdicaoAtual] = useGetEdicaoAtualMutation();

  const formDataCurriculo = new FormData();
  const formDataConfiguracoes = new FormData();

  useEffect(() => {
    getEdicaoAtual()
      .unwrap()
      .then((res) => {
        setEdicaoAtual(res);
      });
    setIsLoading(true);

    data &&
      postNewFormulario({
        matriculadoBoolean: data.matriculado,
        curso: data.curso,
        turno: data.turno,
        instituicao: data.instituicao,
        github: data.github,
        linkedin: data.linkedin,
        desafiosBoolean: false,
        problemaBoolean: false,
        reconhecimentoBoolean: false,
        altruismoBoolean: false,
        resposta: data.resposta,
        lgpdBoolean: data.lgpdBoolean,
        provaBoolean: data.provaBoolean,
        ingles: data.ingles,
        espanhol: data.espanhol,
        neurodiversidade: data.neurodiversidade,
        configuracoes: "Não informado",
        efetivacaoBoolean: data.efetivacaoBoolean,
        disponibilidadeBoolean: data.disponibilidadeBoolean,
        genero: data.genero,
        orientacao: data.orientacao,
        trilhas: data.trilhas,
        importancia: data.algoimportante,
      })
        .unwrap()
        .then((res) => {
          setIdFormulario(res.idFormulario);
        })
        .catch((err) => {
          console.log(err);
          setErroMsg(err.data.message)
          setIsLoading(false);
          setIsError(true);
        });
  }, [data]);

  useEffect(() => {
    if (idFormulario !== null && data && edicaoAtual) {
      postCandidato({
        nome: data.nome,
        dataNascimento: data.dataNascimento,
        email: data.email,
        telefone: data.telefone,
        rg: data.rg,
        cpf: data.cpf,
        estado: data.estado,
        cidade: data.cidade,
        ativo: "T",
        linguagens: data.linguagens,
        edicao: {
          nome: edicaoAtual,
        },
        formulario: idFormulario,
        pcd: data.deficiencia,
      })
        .unwrap()
        .then((res) => {
          setIdCandidato(res.idCandidato);
        })
        .catch((err) => {
          console.log(err);
          setErroMsg(err.data.message)
          setIsError(true);
          setIsLoading(false);
        });

      if (data) {
        formDataCurriculo.append("file", data.curriculo[0]);
        formDataConfiguracoes.append("file", data.configuracoes[0]);

        uploeadCurriculo({
          file: formDataCurriculo,
          idFormulario: idFormulario,
        })
          .unwrap()
          .catch((err) => console.log(err));

        uploadFile({
          file: formDataConfiguracoes,
          idFormulario: idFormulario,
        })
          .unwrap()
          .catch((err) => console.log(err));
      }
    }
  }, [idFormulario, edicaoAtual]);

  useEffect(() => {
    if (idCandidato !== null) {
      postInscricao(idCandidato)
        .unwrap()
        .catch((err) => {
          console.log(err);
          setErroMsg(err.data.message)
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [idCandidato]);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mb: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {isError && (
        <Box>
          <Alert severity="warning">
            <AlertTitle>Houve algum erro!</AlertTitle>
            {erroMsg ? erroMsg : 'Houve algum erro ao enviar os dados da inscrição.'}
          </Alert>
          <Button
            variant="contained"
            sx={{
              mt: 2,
            }}
            onClick={() => {
              dispatch(previousStep());
            }}
          >
            Voltar
          </Button>
        </Box>
      )}
      {isLoading === false && isError === false && (
        <Alert severity="success">
          <AlertTitle>Inscrito com sucesso!</AlertTitle>
          Sua inscrição foi <strong>enviada!</strong> Retornaremos seu resultado
          em breve.
        </Alert>
      )}
    </>
  );
};