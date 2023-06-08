import { Pagination, Status } from './common';

export interface CustomerListQuery extends Pagination {
  strSearch: string;
  applicationId? : number;
  groupId? : number;
}

export interface TokenListQuery extends Pagination {
  customerId?: number;
  fbAppId: number;
  contactId?: number;
}

export interface Customer {
  id: number
  customerId: number;
  employeeCode: string;
  email: string;
  isOwner: number;
  phone: string | null;
  fullName: string | null;
  status: Status;
  permission: any
}

export interface CustomerGroup {
  customerGroupId: number;
  customerGroupName: string;
  customerGroupTotalMember: number;
  status: Status;
}

export interface FirebaseApp {
  id: number;
  firebaseKey: string;
  appName: string;
  appCode: string;
  audienceId: number;
}
