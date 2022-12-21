import * as yup from 'yup'

export const userFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Por favor, digite seu Email!')
    .email('Por favor, digite um email válido')
    .matches(/dbccompany/, 'Por favor, digite um email da DBC'),

  senha: yup
    .string()
    .required('Por favor, digite sua senha!')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
})
