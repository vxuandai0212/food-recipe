import { Pagination } from './common';

export interface PlanListQuery extends Pagination{
  type: number;
  textSearch: string;
}

export enum PLAN_TYPE {
  SMS = 1, EMAIL = 2, FCM = 3, VIETTEL_FAMILY = 5, PERSONAL = 6, BUSINESS = 7
}
