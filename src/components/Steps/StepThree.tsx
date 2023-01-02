import React, { useEffect, useState } from "react";
import {
  previousStep,
  changeData,
  nextStep,
  useSteps,
} from "../../shared/features/subscription/stepsSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePostNewFormularioMutation } from "shared/features/api/formulario/formularioSlice";
import { usePostCandidatoMutation } from "shared/features/api/candidato/candidatoSlice";
import { usePostInscricaoMutation } from "shared/features/api/inscricao/inscricaoSlice";

export const StepThree: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(useSteps);
  const [idFormulario, setIdFormulario] = useState<number | null>(null);
  const [idInscricao, setIdInscricao] = useState<number | null>(null);

  const [postNewFormulario] = usePostNewFormularioMutation();
  const [postCandidato] = usePostCandidatoMutation();
  const [postInscricao] = usePostInscricaoMutation();

  useEffect(() => {
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
        configuracoes: "sdasd", // corrigir
        efetivacaoBoolean: data.efetivacaoBoolean,
        disponibilidadeBoolean: data.disponibilidadeBoolean,
        genero: data.genero,
        orientacao: data.orientacao,
        trilhas: [1],
        importancia: data.algoimportante,
      })
        .unwrap()
        .then((res) => {
          console.log(res);
          setIdFormulario(res.idFormulario);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [data]);

  useEffect(() => {
    if (idFormulario) {
      data &&
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
            nome: "VemSer12",
          },
          formulario: idFormulario,
          pcdboolean: data.deficiencia,
        })
          .unwrap()
          .then((res) => {
            console.log(res);
            setIdInscricao(res.idCandidato);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [idFormulario]);

  useEffect(() => {
    if (idInscricao) {
      data &&
        postInscricao(idInscricao)
          .unwrap()
          .then(() => console.log("Enviado tudo"));
    }
  }, [idInscricao]);

  return (
    <div>
      <button
        onClick={() => {
          dispatch(previousStep());
        }}
      >
        Voltar
      </button>
    </div>
  );
};
