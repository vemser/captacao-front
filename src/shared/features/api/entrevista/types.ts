export interface EntrevistaObsParams {
  idEntrevista: number;
  observacao: string;
}

export interface EntrevistaUpdateParams {
  idEntrevista: number;
  legenda: "CONFIRMADA" | "PENDENTE" | "CANCELADA" | "OUTROS";
  body: EntrevistaUpdateBody;
}

export interface EntrevistaUpdateBody {
  dataEntrevista: Date;
  cidade: string;
  estado: string;
  observacoes: string;
  email: string;
  avaliado: string;
}

export interface NovaEntrevistaBody {
  candidatoEmail: string;
  usuarioEmail: string;
  dataEntrevista: Date;
  observacoes: string;
  avaliado: string;
}

////////

export interface EntrervistaResponse {
  totalElementos: number;
  quantidadePaginas: number;
  pagina: number;
  tamanho: number;
  elementos: Elemento[];
}

export interface Elemento {
  candidatoEmail: string;
  usuarioEmail: string;
  dataEntrevista: Date;
  observacoes: string;
  avaliado: string;
  idEntrevista: number;
  candidatoDTO: CandidatoDTO;
  gestorDTO: GestorDTO;
  legenda: string;
}

export interface CandidatoDTO {
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
  imagem: number;
  pcdboolean: boolean;
}

export interface Edicao {
  nome: string;
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

export interface GestorDTO {
  idGestor: number;
  nome: string;
  email: string;
  cargosDto: CargosDto[];
  ativo: string;
}

export interface CargosDto {
  id: number;
  nome: string;
}

export interface EntrevistasParams {
  pagina: number;
  tamanho: number;
}

export interface EntrevistasMesParams {
  pagina: number;
  tamanho: number;
  mes: number;
  ano: number;
}
