import { Pagination } from './common';

export interface AudienceListQuery extends Pagination {
  strSearch: string;
  type: number;
  sort: number;
}

export interface Audience {
  id: number;
  applicationId: number;
  audienceName: string;
  audienceCode: string;
  type: number;
  totalContact?: number;
  totalSubscriber?: number;
  createdAt?: number;
  createdBy?: string;
}
export interface AudienceFormType {
  id: number | null;
  applicationId: number;
  audienceName: string;
  audienceCode: string;
  type: number;
}

export interface IAudienceForm {
  id: number | null;
  applicationId: number;
  audienceName: string;
  audienceCode: string;
  type: number;
  tags: number[]
}

export interface FirebaseApp {
  id: number | null;
  audienceId: number;
  appName: string;
  appCode: string;
  firebaseKey: string;
}

export interface ImportResultError {
  rowNumber: number;
  errros: string[];
}
