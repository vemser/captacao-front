import * as yup from 'yup'

export const notasSchemas = yup.object().shape({
    notaComportamental: yup
        .string()
        .typeError('Digite apenas números')
        .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value)
        .test("notaComportamental", "A nota pode ter uma string vazia", (value: any) => value == '' ? true : true)
        .test("notaComportamental", "Não é permitido notas maiores que 100", (value: any) => Number(value) > 100 ? false : true)
        .test("notaComportamental", "Não é permitido notas menores que 1", (value: any) => Number(value) < 1 ? false : true)
        .test("notaComportamental", "Não é permetido notas negativas", (value: any) => Number(value) < 0 ? false : true)
        .test("notaComportamental", "Formato não permitido", (value: any) => value == '00' || value == '000' || value.length > 3 ? false : true)
        .test("notaComportamental", "Formato não permitido", (value: any) => value.split('')[0] == '0' && value.split('').length > 1 ? false : true),
    notaTecnica: yup
        .string()
        .typeError('Digite apenas números')
        .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value)
        .test("notaTecnica", "A nota pode ter uma string vazia", (value: string | undefined | boolean) => value == '' ? true : true)
        .test("notaTecnica", "Não é permitido notas maiores que 100", (value: any) => Number(value) > 100 ? false : true)
        .test("notaTecnica", "Não é permitido notas menores que 1", (value: any) => Number(value) < 1 ? false : true)
        .test("notaTecnica", "Não é permetido notas negativas", (value: any) => Number(value) < 0 ? false : true)
        .test("notaTecnica", "Formato não permitido", (value: any) => value == '00' || value == '000' || value.length > 3 ? false : true)
        .test("notaTecnica", "Formato não permitido", (value: any) => value.split('')[0] == '0' && value.split('').length > 1 ? false : true),
})