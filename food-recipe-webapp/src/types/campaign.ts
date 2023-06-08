import { Pagination, ServiceType } from './common';

export interface Campaign {
  campaignName: string;
  id: number;
  name: string;
  audienceName: string;
  type: ServiceType;
  campaignLog: string;
  status: number;
  isTrackOpen: boolean | null;
  isTrackClick: boolean | null;
  templateId? : number;
  title? : string;
  updatedAt? : number;
  updatedBy? : string;
}

export interface CampaignListQuery extends Pagination {
  applicationId: number;
  sort: number;
  status: number | null;
  type: number | null;
  searchKeyword?: string;
}

export interface CampaignReportOverview {
  name: string;
  type: number;
  status: number;
  templateId: number;
  total: number;
  success: number | null;
  fail: number | null;
  sending: number | null;
}

