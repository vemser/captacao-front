export interface IFormularioBody {
  matriculadoBoolean: boolean;
  curso: string;
  turno: string;
  instituicao: string;
  github: string;
  linkedin: string;
  desafiosBoolean: boolean;
  problemaBoolean: boolean;
  reconhecimentoBoolean: boolean;
  altruismoBoolean: boolean;
  resposta: string;
  lgpdBoolean: boolean;
  provaBoolean: boolean;
  ingles: string;
  espanhol: string;
  neurodiversidade: string;
  configuracoes: string;
  efetivacaoBoolean: boolean;
  disponibilidadeBoolean: boolean;
  genero: string;
  orientacao: string;
  trilhas: number[];
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
