import { Pagination, ServiceType, Status } from './common';

export interface FeatureListQuery extends Pagination {
  strSearch: string;
}
export interface Feature {
  id: number;
  code: string;
  name: string;
  type: ServiceType;
  status: Status;
  createdBy: string;
}

export interface FeatureSaveForm {
  id: number | null;
  code: string;
  name: string;
  type: ServiceType | null;
  status: Status | null;
}

