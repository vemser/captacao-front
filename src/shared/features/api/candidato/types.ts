export interface CandidatoBody {
  nome: string;
  dataNascimento: Date;
  email: string;
  telefone: string;
  rg: string;
  cpf: string;
  estado: string;
  cidade: string;
  ativo: string;
  linguagens: string[];
  edicao: Edicao;
  formulario: number;
  pcdboolean: boolean;
}

export interface CandidatoResponse {
  idCandidato: number;
  nome: string;
  dataNascimento: Date;
  email: string;
  telefone: string;
  rg: string;
  cpf: string;
  estado: string;
  cidade: string;
  observacoes: string;
  notaProva: number;
  notaEntrevistaComportamental: number;
  notaEntrevistaTecnica: number;
  ativo: string;
  parecerComportamental: string;
  parecerTecnico: string;
  media: number;
  linguagens: Edicao[];
  edicao: Edicao;
  formulario: Formulario;
  pcdboolean: boolean;
}

export interface Formulario {
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

export interface Edicao {
  nome: string;
}

export interface UpdateNota {
  nota: {
    notaProva: number;
  };
  idCandidato: number;
}
