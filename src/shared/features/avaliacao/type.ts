export interface Root {
  totalElementos: number
  quantidadePaginas: number
  pagina: number
  tamanho: number
  elementos: Elemento[]
}

export interface Elemento {
  idAvaliacao: number
  avaliador: Avaliador
  aprovado: string
  inscricao: Inscricao
}

export interface IPagination {
  pagina: number
}

export interface Avaliador {
  idGestor: number
  nome: string
  email: string
  cargosDto: CargosDto[]
  ativo: string
}

export interface CargosDto {
  id: number
  nome: string
}

export interface Inscricao {
  idInscricao: number
  candidato: Candidato
  dataInscricao: string
  avaliacao: string
}

export interface Candidato {
  idCandidato: number
  nome: string
  dataNascimento: string
  email: string
  telefone: string
  rg: string
  cpf: string
  estado: string
  cidade: string
  observacoes: string
  notaProva: number
  notaEntrevistaComportamental: number
  notaEntrevistaTecnica: number
  ativo: string
  parecerComportamental: string
  parecerTecnico: string
  media: number
  linguagens: Linguagen[]
  edicao: Edicao
  formulario: Formulario
  pcdboolean: boolean
}

export interface Linguagen {
  nome: string
}

export interface Edicao {
  nome: string
}

export interface Formulario {
  idFormulario: number
  matriculado: string
  curso: string
  turno: string
  instituicao: string
  github: string
  linkedin: string
  desafios: string
  problema: string
  reconhecimento: string
  altruismo: string
  resposta: string
  curriculo: number
  lgpd: string
  prova: string
  ingles: string
  espanhol: string
  neurodiversidade: string
  efetivacao: string
  genero: string
  orientacao: string
  disponibilidade: string
  trilhas: Trilha[]
  imagemConfigPc: number
  importancia: string
}

export interface Trilha {
  nome: string
  idTrilha: number
}
