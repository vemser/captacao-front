import * as Yup from "yup";

export const stepTwoSchema = Yup.object().shape({
  instituicao: Yup.string().when("matriculado", {
    is: "T",
    then: Yup.string()
      .required("Preencha o campo com o nome da instituição")
      .min(2, "É necessário 2 caracteres, no mínimo"),
  }),
  curso: Yup.string().when("matriculado", {
    is: "T",
    then: Yup.string()
      .required("Preencha o campo com o nome do curso")
      .min(2, "É necessário 2 caracteres, no mínimo"),
  }),

  trilhas: Yup.array()
    .nullable()
    .required("É necessário selecionar pelo menos uma trilha"),
  resposta: Yup.string().max(255, "O campo deve ter no máximo 255 letras"),
  algoimportante: Yup.string()
    .required("Campo obrigatório")
    .max(255, "O campo deve ter no máximo 255 letras"),
  lgpdBoolean: Yup.boolean().oneOf([true], "É necessário aceitar os termos"),
  deficiencia: Yup.string().min(2, "É necessário 2 caracteres, no mínimo"),
  curriculo: Yup.mixed()
    .test("required", "O currículo é obrigatório", (value) => value.length > 0)
    .test("fileSize", "O arquivo é muito grande", (value) => {
      return value.length && value[0].size <= 5242880;
    })
    .test("fileType", "O tipo de arquivo não é suportado", (value) => {
      return (
        value.length &&
        // ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        ["application/pdf"].includes(value[0].type)
      );
    }),
  configuracoes: Yup.mixed()
    .test("required", "O currículo é obrigatório", (value) => value.length > 0)
    .test("fileSize", "O arquivo é muito grande", (value) => {
      return value.length && value[0].size <= 5242880;
    })
    .test("fileType", "O tipo de arquivo não é suportado", (value) => {
      return (
        value.length &&
        // ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
      );
    }),
});
