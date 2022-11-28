export interface UnbounceParams {
  btnKoText: string;
  btnKoUrl: string;
  favicon: string;
  browserTab: string;
  btnOkText: string;
  btnOkUrl: string;
  messageKo: string;
  tokenSF: string;
  pageName: string;
  formId: string;
  channel: string;
  loginStatus: string;
  formUrl: string;
  style: string;
  token: string;
}

export enum Environments {
  DEV = 'dev',
  INT = 'int',
  PRE = 'pre',
  PRO = 'pro',
}

export type EnvironmentsTypes = 'dev' | 'int' | 'pre' | 'pro';

export type Result = 'error' | 'success';
