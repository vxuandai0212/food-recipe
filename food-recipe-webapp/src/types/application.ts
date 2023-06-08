import { Pagination, Status } from './common';

export interface ApplicationQuery extends Pagination {
  strSearch : string | null;
}

export interface Application {
  agencyId: number
  applicationId?: number;
  id?: number;
  appCode: string;
  appPass: string;
  appName: string;
  url: string;
  description: string;
  createdAt: number;
  createdBy: string;
  status: Status;
  reason: string;
  maxMember: number | null;
  isBusiness: number | null;
  isGroup? : number | null;
  isInternal?: number;
}

export interface AppForm {
  id? : number | null;
  appCode?: string;
  appPass?: string;
  appName?: string;
  description?: string;
  status?: number;
  isBusiness?: number;
  isGroup?: number;
  maxMember?: number;
}

