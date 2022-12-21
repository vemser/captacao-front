export interface SubscribeData {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  estado: string;
  cidade: string;
  dataNascimento: string;
  neurodiversidade: string;
  matriculado: boolean;
  turno: "MANHA" | "TARDE" | "NOITE";
  instituicao: string;
  curso:string;
  ingles: string;
  espanhol: string;
  orientacao: string;
  genero: string;
  trilhas: [];
  desafiosBoolean: boolean;
  problemasBoolean: boolean;
  reconhecimentoBoolean: boolean;
  altruismoBoolean: boolean;
  provaBoolean: boolean;
  efetivacaoBoolean: boolean;
  disponibilidadeBoolean:boolean;
  github: string;
  linkedin: string;
  curriculo?: any;
  lgpdBoolean: boolean;

  // configuracoes: string;
  

}

export interface StepsState {
  next: number;
  previous: number;
  current: number;
  data?: SubscribeData;
}