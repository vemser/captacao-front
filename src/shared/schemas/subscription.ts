import * as Yup from "yup";

export const stepOneSchema = Yup.object().shape({
  nome: Yup.string()
    .min(3, "O nome deve ter no mínimo 3 letras")
    .max(50, "O nome deve ter no máximo 50 letras")
    .matches(/^[a-zA-Z ]+$/, "O nome deve ter apenas letras e espaços")
    .test("nome", "O nome deve ter no mínimo sobrenome", (value: any) => {
      if (value) {
        const [nome, sobrenome] = value.split(" ");
        return nome && sobrenome;
      }
      return false;
    })
    .required("O nome é obrigatório"),
  email: Yup.string()
    .min(3, "O email deve ter no mínimo 3 letras")
    .max(50, "O email deve ter no máximo 50 letras")
    .email("O email deve ser um endereço de email válido")
    .required("O email é obrigatório"),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "O CPF deve ser um número válido")
    .required("O CPF é obrigatório"),
  telefone: Yup.string()
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O telefone deve ser um número válido no formato (99) 99999-9999"
    )
    .required("O telefone é obrigatório"),
  cidade: Yup.string()
    .min(3, "A cidade deve ter no mínimo 3 letras")
    .max(50, "A cidade deve ter no máximo 50 letras")
    .required("A cidade é obrigatória"),
  dataNascimento: Yup.date()
    .typeError("A data de nascimento deve ser uma data válida")
    .required("A data de nascimento é obrigatória")
    .max(new Date(), "A data de nascimento deve ser anterior a data atual")
    .min(
      new Date(1900, 0, 1),
      "A data de nascimento deve ser posterior a 01/01/1900"
    )
    // deve ter no mínimo 16 anos
    .test(
      "dataNascimento",
      "A data de nascimento deve ter no mínimo 16 anos",
      (value) => {
        if (value) {
          const dataNascimento = new Date(value);
          const dataAtual = new Date();
          const idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
          return idade >= 16;
        }
        return false;
      }
    ),
});
