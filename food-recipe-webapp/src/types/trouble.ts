import { Pagination } from './common';

export interface TroubleSearch extends Pagination {
  page: any;
  limit: any;
  from: any;
  to: any;
  applicationId: any;
  featureId: any;
}

