import { Message } from 'primeng/api';

export type UserMessageAction =
  | 'LOGIN_SUCCESS'
  | 'LOGOUT_SUCCESS'
  | 'CREATE_SUCCESS'
  | 'UPDATE_SUCCESS'
  | 'CREATE_USER_SUCCESS'
  | 'DELETE_SUCCESS'
  | 'LOGIN_ERROR'
  | 'CREATE_ERROR'
  | 'UPDATE_ERROR'
  | 'LOGOUT_ERROR'
  | 'DELETE_ERROR'
  | 'USER_FOUND'
  | 'USER_NOT_FOUND';
export type MessageSeverity = 'SUCCESS' | 'ERROR';

export const SUCCESS_MESSAGES: Partial<Message> = {
  severity: 'success',
  summary: 'Aeee!',
};

export const ERROR_MESSAGES: Partial<Message> = {
  severity: 'error',
  summary: 'Erro',
};

export const USER_MESSAGES: Record<UserMessageAction, Message> = {
  // SUCCESS
  LOGIN_SUCCESS: {
    ...SUCCESS_MESSAGES,
    detail: 'O usuário foi logado com sucesso',
  },
  LOGOUT_SUCCESS: {
    ...SUCCESS_MESSAGES,
    detail: 'O usuário foi deslogado com sucesso',
  },
  CREATE_SUCCESS: {
    ...SUCCESS_MESSAGES,
    detail: 'Usuário criado com sucesso!',
  },
  UPDATE_SUCCESS: {
    ...SUCCESS_MESSAGES,
    detail: 'Usuário atualizado com sucesso!',
  },
  DELETE_SUCCESS: {
    ...SUCCESS_MESSAGES,
    detail: 'Usuário deletado com sucesso!',
  },
  CREATE_USER_SUCCESS: {
    ...SUCCESS_MESSAGES,
    detail: 'Usuário criado com sucesso!',
  },
  USER_FOUND: {
    ...SUCCESS_MESSAGES,
    detail: 'Usuário encontrado!',
  },
  USER_NOT_FOUND: {
    ...ERROR_MESSAGES,
    detail: 'Usuário não encontrado!',
  },

  // ERROR
  LOGIN_ERROR: {
    ...ERROR_MESSAGES,
    summary: 'Erro ao realizar login!',
  },
  CREATE_ERROR: {
    ...ERROR_MESSAGES,
    summary: 'Erro ao criar usuário!',
  },
  UPDATE_ERROR: {
    ...ERROR_MESSAGES,
    summary: 'Erro ao atualizar usuário!',
  },
  LOGOUT_ERROR: {
    ...ERROR_MESSAGES,
    summary: 'Erro ao realizar logout!',
  },
  DELETE_ERROR: {
    ...ERROR_MESSAGES,
    summary: 'Erro ao deletar usuário!',
  },
};

export const API_MESSAGES = {
  SET: {
    SUCCESS: 'API setada com sucesso!',
    ERROR: 'Erro ao setar API!',
  },
};

export const MESSAGES = {
  USER: USER_MESSAGES,
  API: API_MESSAGES,
};
