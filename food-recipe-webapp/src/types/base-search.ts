import { Pagination } from './common';

export interface BaseSearch extends Pagination {
  applicationId: any,
  page: any;
  limit: any;
}
