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
  turno: string;
  instituicao: string;
  curso: string;
  ingles: string;
  espanhol: string;
  orientacao: string;
  genero: string;
  trilhas: string[] | number[];
  desafiosBoolean: boolean | TBoolean;
  problemasBoolean: boolean | TBoolean;
  reconhecimentoBoolean: boolean | TBoolean;
  altruismoBoolean: boolean | TBoolean;
  provaBoolean: boolean | TBoolean;
  efetivacaoBoolean: boolean | TBoolean;
  disponibilidadeBoolean: boolean | TBoolean;
  algoimportante: string;
  github: string;
  linkedin: string;
  curriculo: any;
  lgpdBoolean: boolean;
  resposta: string;
  deficiencia: boolean | TBoolean;
  configuracoes: any;
  motivo: string;
  rg: string;
  linguagens: any;
}

export interface StepsState {
  next: number;
  previous: number;
  current: number;
  data?: SubscribeData;
}

export type IFormQuery = Partial<SubscribeData>;

export interface IFormResponse {
  data: {
    formulario: IFormQuery;
  };
}

export interface IFormSubscribeText {
  titulo: string;
  content?: string;
  backgroundImage?: {
    url: string;
  };
}

export interface IFormSubscribeTextResponse {
  data: {
    formulario: IFormSubscribeText;
  };
}

export interface IFormSubscribeFormResponse {
  data: {
    formulario: {
      s2Matriculado?: string;
      s2Turno?: string;
      s2Instituicao?: string;
      s2Curso?: string;
      s2InglS?: string;
      s2Espanhol?: string;
      s2OriSexual?: string;
      s2GNero?: string;
      s2Trilha?: string;
      s2DeficiNcia?: string;
      s2DefDesc?: string;
      s2TextoMotivacao?: string;
      s2SubtTextmotivacao?: string;
      s2OutroMotivo?: string;
      s2AlgoImp?: string;
      s2TextoLingProva?: string;
      s2TextoDisp?: string;
      s2DispHaula?: string;
      s2Github?: string;
      s2Linkedin?: string;
      s2Curriculo?: string;
      s2ConfiguraEsDaMQuina?: string;
    };
  };
}

export interface ILoggedUser {
  login: string;
  cargos: ICargo[];
  imagem: string[];
  idUsuario: number;
}

export interface ICargo {
  nome: string;
  descricao: string;
}

export interface IUser {
  username: string;
  password: string;
}

export interface ILinguagens {
  nome: string;
}

export interface IAtualizarInformacoesEntrevista {
  observacao: string;
  parecerComportamental: string;
  notaComportamental: number;
  parecerTecnico: string;
  notaTecnica: number;
  idEntrevista: number;
  idCandidato: number;
}