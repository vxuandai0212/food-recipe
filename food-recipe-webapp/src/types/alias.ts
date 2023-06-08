import { Pagination } from './common';

export class Alias implements Pagination {
  id:any;
  name: any;
  status: any;
  type:any;
  page: any;
  limit: any;
}

export interface IAlias {
  id: number | null;
  name: string;
  status: number;
  type: number;
  isDefault: number;
  displayName: string;
}
