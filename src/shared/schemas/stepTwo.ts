import * as yup from "yup";

export const stepTwoSchema = yup.object().shape({
  resposta: yup
    .string()
    .when(
      [
        "altruismoBoolean",
        "reconhecimentoBoolean",
        "desafiosBoolean",
        "problemasBoolean",
      ],
      {
        is: (
          altruismo: boolean,
          reconhecimento: boolean,
          desafios: boolean,
          problemas: boolean
        ) => {
          return (
            altruismo === false &&
            reconhecimento === false &&
            desafios === false &&
            problemas === false
          );
        },
        then: yup
          .string()
          .required(
            "Preencha o campo 'Outro motivo' ou selecione uma das opções acima"
          ),
        otherwise: yup.string(),
      }
    ),
  instituicao: yup.string().when("matriculadoBoolean", {
    is: "T",
    then: yup
      .string()
      .min(2, "É necessário 2 caracteres, no mínimo")
      .required("Preencha o campo com o nome da instituição"),
  }),
  curso: yup.string().when("matriculadoBoolean", {
    is: "T",
    then: yup
      .string()
      .min(2, "É necessário 2 caracteres, no mínimo")
      .required("Preencha o campo com o nome do curso"),
  }),
  github: yup.string(),
  lgpdBoolean: yup.boolean().oneOf([true], "É necessário aceitar os termos"),
  configuracoes: yup.string().required("É necessário informar a configuração"),
  trilhas: yup.array().min(1, "É necessário selecionar pelo menos uma trilha"),
});
