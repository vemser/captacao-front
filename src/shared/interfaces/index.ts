
import { StructuredTextGraphQlResponse } from 'react-datocms';

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
    url: string
  }
}

export interface IFormSubscribeTextResponse {
  data: {
    formulario: IFormSubscribeText;
  };
}
