import { Pagination } from './common';

export interface ServiceListQuery extends Pagination {
  name : string | null;
  ip: string | null;
  port: string | null;
  type: number | null;
  status: number | null;
}
