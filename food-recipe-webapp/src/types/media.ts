import { Pagination } from './common';

export interface MediaListQuery extends Pagination {
  from : any | null;
  to : any | null;
  applicationId : any | null;
  type: any | null;
  page : any | null;
  limit : any | null;
}

export interface MediaTrack {
  sentAt : any | null;
  appName : string | null;
  type : string | null;
  subject : string | null;
  content : string | null;
  totalReceiver : number | null;
  openReceiver : number | null;
  interactReceiver : number | null;
}
