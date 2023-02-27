import * as Yup from "yup";

const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ",""."";" ]+$/;

export const stepTwoSchema = Yup.object().shape({
  instituicao: Yup.string().when("matriculado", {
    is: "T",
    then: Yup.string()
      .required("Preencha o campo com o nome da instituição")
      .min(2, "São necessários 2 caracteres, no mínimo"),
  })
    .matches(regex, "A Instituição de ensino deve ter apenas letras e espaços")
    .test("instituicao", "A Instituição de ensino não pode conter apenas espaço", (value: any) => {
      if (value.trim().length == 0) {
        return false;
      }
      return true;
    }),
  curso: Yup.string().when("matriculado", {
    is: "T",
    then: Yup.string()
      .required("Preencha o campo com o nome do curso")
      .min(2, "São necessários 2 caracteres, no mínimo"),
  })
    .matches(regex, "O Curso deve ter apenas letras e espaços")
    .test("curso", "A Curso não pode conter apenas espaço", (value: any) => {
      if (value.trim().length == 0) {
        return false;
      }
      return true;
    }),

  trilhas: Yup.array().required("A escolha de uma trilha é obrigatória").min(1, "A escolha de uma trilha é obrigatória").nullable(),

  algoimportante: Yup.string()
    .required("Campo obrigatório")
    .min(10, "São necessários 10 caracteres, no mínimo")
    .max(500, "O campo deve ter no máximo 500 caracteres")
    .matches(regex, "Este campo deve ter apenas letras e espaços")
    .test("algoimportante", "Este campo não pode conter apenas espaço", (value: any) => {
      if (value.trim().length == 0) {
        return false;
      }
      return true;
    }),
  lgpdBoolean: Yup.boolean().oneOf([true], "É necessário aceitar os termos para prosseguir"),
  resposta: Yup.string()
    .required("Campo obrigatório")
    .min(10, "São necessários 10 caracteres, no mínimo")
    .max(500, "O campo deve ter no máximo 500 caracteres")
    .matches(regex, "A resposta deve ter apenas letras e espaços")
    .test("resposta", "A resposta não pode conter apenas espaço", (value: any) => {
      if (value.trim().length == 0) {
        return false;
      }
      return true;
    }),
  deficiencia: Yup.string()
    .max(255, "O campo deve ter no máximo 255 caracteres"),
  curriculo: Yup.mixed()
    .test("required", "O currículo é obrigatório", (value) => value.length > 0)
    .test("fileType", "O tipo de arquivo não é suportado. Os tipos aceitos são: PDF, DOC, DOCX e ODT", (value) => {
      return (
        value.length &&
        (
          ["application/pdf"].includes(value[0].type) ||
          ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value[0].type) ||
          ['application/msword'].includes(value[0].type) ||
          ['application/vnd.oasis.opendocument.text'].includes(value[0].type)
        )
      );
    })
    .test("fileSize", "O tamanho do arquivo deve ser menor que 10MB", (value) => {
      return value.length && value[0].size <= 10 * 1024 * 1024;
    }),
  configuracoes: Yup.mixed()
    .test("required", "O print é obrigatório", (value) => value.length > 0)
    .test("fileType", "O tipo de arquivo não é suportado", (value) => {
      return (
        value.length &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
      );
    })
    .test("fileSize", "O tamanho do arquivo deve ser menor que 10MB", (value) => {
      return value.length && value[0].size <= 10 * 1024 * 1024;
    })
});