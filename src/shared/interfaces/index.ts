export type TBoolean = "T" | "F";

export interface SubscribeData {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  estado: string;
  cidade: string;
  dataNascimento: string;
  neurodiversidade: string;
  
  matriculado: boolean | TBoolean;
  turno: "MANHA" | "TARDE" | "NOITE";
  instituicao: string;
  curso:string;
  ingles: string;
  espanhol: string;
  orientacao: string;
  genero: string;
  trilhas: [];
  desafiosBoolean: boolean | TBoolean;
  problemasBoolean: boolean | TBoolean;
  reconhecimentoBoolean: boolean | TBoolean;
  altruismoBoolean: boolean | TBoolean;
  provaBoolean: boolean | TBoolean;
  efetivacaoBoolean: boolean | TBoolean;
  disponibilidadeBoolean:boolean | TBoolean;
  algoimportante:string;
  github: string;
  linkedin: string;
  curriculo: any;
  lgpdBoolean: boolean;
  resposta:string;
  deficiencia:boolean | TBoolean;
  configuracoes: any;
  motivo:string
}

export interface StepsState {
  next: number;
  previous: number;
  current: number;
  data?: SubscribeData;
}