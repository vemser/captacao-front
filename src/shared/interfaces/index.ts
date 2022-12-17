export interface SubscribeData {
  name: string;
  email: string;
  cpf: string;
  number: string;
}

export interface StepsState {
  next: number;
  previous: number;
  current: number;
  data?: SubscribeData;
}
