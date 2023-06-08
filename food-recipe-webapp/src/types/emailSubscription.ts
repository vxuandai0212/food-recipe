import { Pagination } from './common';

export interface SubscriptionFormSearch extends Pagination {
  aliasEmailNameId :  any;
  aliasEmailAddrId:  any;
  applicationId:  any;
  emailInput: any;
  limit: any;
  page: any;
}
export interface Subscriptions {
    id: number;
    applicationName: string;
    ctEmail: string;
    aliasEmailAddr: string;
    aliasEmailName: string;
    status: number;
    updatedAt: number;
  }