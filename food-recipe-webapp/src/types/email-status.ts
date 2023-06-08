import { Pagination } from 'element-ui';

export interface EmailStatus {
  id: number;
  applicationId: number;
  ctEmailId: number;
  email: string;
  status?: number;
  lastCheckTime?: number;
  createdAt?: number;
}

export interface EmailStatusFormSearch {
  applicationId: number;
  searchKeyword?: string;
  limit: number;
  page: number
}
