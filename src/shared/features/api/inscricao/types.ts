export interface IInscricao {
  totalElementos: number;
  quantidadePaginas: number;
  pagina: number;
  tamanho: number;
  elementos: IElementos[]
}

export interface IEdicao {
    nome: string;
}

export interface ILinguagens {
  nome: string
}
export interface IElementos {
  idInscricao: number
  candidato: ICandidato
  dataInscricao: string
  avaliacao: string
}

export interface IGetInscritos{
  pagina: number,
}

export interface ICandidato {
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
  linguagens: ILinguagens[]
  edicao: IEdicao
  formulario: IFormulario | null
  pcdboolean: boolean
}

export interface IFormulario {
  idFormulario: number
  matriculado: string
  curso: string
  turno: string
  instituicao: string
  github: string
  linkedin: string
  // desafios: string
  // problema: string
  // reconhecimento: string
  // altruismo: string
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
  trilhas: ITrilha[]
  imagemConfigPc: number
  importancia: string
}
export interface ITrilha {
  nome: string
  idTrilha: number
}
