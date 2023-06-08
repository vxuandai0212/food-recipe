export interface Pagination {
  page : number;
  limit : number;
}

export interface CommonQuery extends Pagination {
  searchKeyword?: string;
  strSearch?: string;
}

export interface DropdownAction{
  id: number,
  action: DropDownActionEnum
}

export enum DropDownActionEnum{
  DELETE = 'DELETE', VIEW = 'VIEW', LOCK = 'LOCK'
}
export enum ServiceType {
  SMS = 1, Email = 2, FCM = 3, VTF = 4
}
export enum Status {
  LOCK = 0, ACTIVE = 1
}
export interface ListResponse {
  total: number;
  items: object[];
}
export interface SelectOption {
  value: any,
  label: string
}

