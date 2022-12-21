import * as Yup from "yup";

export const stepTwoSchema = Yup.object().shape({
  resposta: Yup
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
        then: Yup
          .string()
          .required(
            "Preencha o campo 'Outro motivo' ou selecione uma das opções acima"
          ),
        otherwise: Yup.string(),
      }
    ),
  instituicao: Yup.string().when("matriculadoBoolean", {
    is: "T",
    then: Yup
      .string()
      .min(2, "É necessário 2 caracteres, no mínimo")
      .required("Preencha o campo com o nome da instituição"),
  }),
  curso: Yup.string().when("matriculadoBoolean", {
    is: "T",
    then: Yup
      .string()
      .min(2, "É necessário 2 caracteres, no mínimo")
      .required("Preencha o campo com o nome do curso"),
  }),
  github: Yup.string(),
  lgpdBoolean: Yup.boolean().oneOf([true], "É necessário aceitar os termos"),
  configuracoes: Yup.string().required("É necessário informar a configuração"),
  trilhas: Yup.array().min(1, "É necessário selecionar pelo menos uma trilha"),
});
