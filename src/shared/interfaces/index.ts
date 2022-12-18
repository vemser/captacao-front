export interface SubscribeData {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  estado: string;
  cidade: string;
  dataNascimento: string;
  neurodiversidade: string;
}

export interface StepsState {
  next: number;
  previous: number;
  current: number;
  data?: SubscribeData;
}
