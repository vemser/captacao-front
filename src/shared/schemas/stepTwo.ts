import * as Yup from "yup";

export const stepTwoSchema = Yup.object().shape({
  instituicao: Yup.string().when("matriculado", {
    is: "T",
    then: Yup
      .string()
      .required("Preencha o campo com o nome da instituição")
      .min(2, "É necessário 2 caracteres, no mínimo"),
      
  }),
  curso: Yup.string().when("matriculado", {
    is: "T",
    then: Yup
      .string()
      .required("Preencha o campo com o nome do curso")
      .min(2, "É necessário 2 caracteres, no mínimo"),
      
  }),
 
  // trilhas: Yup.array().min(1, "É necessário selecionar pelo menos uma trilha"),
  motivo: Yup
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
  resposta:Yup.string().required("Campo obrigatório").max(255, "O campo deve ter no máximo 255 letras"),
  algoimportante:Yup.string().required("Campo obrigatório").max(255, "O campo deve ter no máximo 255 letras"),
  lgpdBoolean: Yup.boolean().oneOf([true], "É necessário aceitar os termos"),
  deficiencia:Yup.string().required("Campo obrigatório").min(2,"É necessário 2 caracteres, no mínimo")
})