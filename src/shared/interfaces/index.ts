export interface SubscribeData {
  nome: string
  email: string
  rg: string
  cpf: string
  telefone: string
  estado: string
  cidade: string
  dataNascimento: string
  neurodiversidade: string
  matriculado: boolean
  turno: string
  instituicao: string
  curso: string
  ingles: string
  espanhol: string
  orientacao: string
  genero: string
  trilhas: string[]
  desafiosBoolean: boolean
  problemasBoolean: boolean
  reconhecimentoBoolean: boolean
  altruismoBoolean: boolean
  provaBoolean: boolean
  efetivacaoBoolean: boolean
  disponibilidadeBoolean: boolean
  github: string
  linkedin: string
  curriculo?: any
  lgpdBoolean: boolean

  // configuracoes: string;
}

export interface StepsState {
  next: number
  previous: number
  current: number
  data?: SubscribeData
}

export type IFormQuery = Partial<SubscribeData>

export interface IFormResponse {
  data: {
    formulario: IFormQuery
  }
}

export interface IFormSubscribeText {
  titulo: string
  content?: string
  backgroundImage?: {
    url: string
  }
}

export interface IFormSubscribeTextResponse {
  data: {
    formulario: IFormSubscribeText
  }
}
