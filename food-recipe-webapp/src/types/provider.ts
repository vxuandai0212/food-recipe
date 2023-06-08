import { Pagination } from './common';

export interface ProviderListQuery extends Pagination{
  code: any;
  name: any;
}

export interface Provider {
  id: any;
  code: any;
  name: any;
  ip: any;
  port: any;
  description: any;
  kafkaTopic: any;
  type: any;
  createdAt: any;
  createdBy: any;
  updatedAt: any;
  status: any,
  updatedBy: any;
}

