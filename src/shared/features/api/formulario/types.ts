export type TBoolean = "T" | "F";

export interface IFormularioBody {
  matriculadoBoolean: boolean | TBoolean;
  curso: string;
  turno: string;
  instituicao: string;
  github: string;
  linkedin: string;
  desafiosBoolean: boolean | TBoolean;
  problemaBoolean: boolean | TBoolean;
  reconhecimentoBoolean: boolean | TBoolean;
  altruismoBoolean: boolean | TBoolean;
  resposta: string;
  lgpdBoolean: boolean | TBoolean;
  provaBoolean: boolean | TBoolean;
  ingles: string;
  espanhol: string;
  neurodiversidade: string;
  configuracoes: string;
  efetivacaoBoolean: boolean | TBoolean;
  disponibilidadeBoolean: boolean | TBoolean;
  genero: string;
  orientacao: string;
  trilhas: number[] | string[];
  importancia: string;
}

export interface FormularioResponse {
  idFormulario: number;
  matriculado: string;
  curso: string;
  turno: string;
  instituicao: string;
  github: string;
  linkedin: string;
  desafios: string;
  problema: string;
  reconhecimento: string;
  altruismo: string;
  resposta: string;
  curriculo: number;
  lgpd: string;
  prova: string;
  ingles: string;
  espanhol: string;
  neurodiversidade: string;
  efetivacao: string;
  genero: string;
  orientacao: string;
  disponibilidade: string;
  trilhas: Trilha[];
  imagemConfigPc: number;
  importancia: string;
}

export interface Trilha {
  nome: string;
  idTrilha: number;
}

export interface UploadFile {
  idFormulario: number;
  file: File;
}
