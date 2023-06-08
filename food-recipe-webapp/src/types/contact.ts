import { Pagination } from './common';
import { Tag } from './tag';
import { Token } from './token';

export interface Contact {
  id: number;
  applicationId: number;
  audienceId: number;
  fullname: string;
  employeeCode: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  birthday: number;
  status: ContactStatusEnum;
  listLogs: any;
  isVip: number;
  rate: number;
  audienceType?: number;
  tags: Tag[] | null,
  token: string | null,
  firebaseKey: string | null,
  trackStat?: ContactTrackStat,
  tokens: Token[] | null;
}
export interface ContactTrackStat {
  totalInteract: number | null;
  totalOpen: number | null;
  totalTrackInteractEmail: number | null;
  totalTrackOpenEmail: number | null;
}
export interface IContactForm {
  id: number | null;
  audienceId: number;
  source: ContactSource;
  address: string;
  employeeCode: string;
  email: string;
  phone: string;
  fullname: string;
  birthday: number | null;
  status: ContactStatusEnum;
  tags?: Tag[];
  firebaseKey?: string;
  token?: string;
}
export interface ContactListQuery extends Pagination {
  audienceId: number;
  searchKeyword?: string;
  tagList?: Tag[];
  listSegmentCondition? : any;
  status?: ContactStatusEnum;
  segmentIds?: number[]
}
export enum ContactStatusEnum {
  SUBSCRIBED = 1,
  // CANCELED = 2, // Khong con trang thai nay nua
  NOT_YET_SUB = 2,
  ARCHIVED = 3
}
export enum ContactSource {
  IMPORT = 1, ADD = 2, ORG = 3
}

export interface ImportedDataFromExcel {
  header: string[];
  results: ImportedDataResultFromExcel[];
}

export interface ImportedDataResultFromExcel {
  'Mã nhân viên'?: string;
  'Địa chỉ email'?: string;
  'Số điện thoại'?: string;
  'Tags'?: string;
  'Họ và tên'?: string;
  'Địa chỉ'?: string;
  'Ngày sinh'?:string;
  'Firebase key'?:string;
  'Token'?:string;
  'Ứng dụng firebase'?:string;
}

export interface ImportedContactData {
  audienceId: number;
  email?: string;
  phone?: string;
  tags: string;
  rowNumber: number;
  fullname: string;
  employeeCode?: string;
  address: string;
  dob: string;
  status: ContactStatusEnum;
  firebaseKey?: string;
  firebaseApps?: string;
  token?: string;
  errors: ImportError[];
  isEditing?: boolean;
}
export enum ImportError {
  EMAIL_EMPTY = 1,
  EMAIL_MAX_LENGTH = 2,
  EMAIL_INVALID = 3,
  FB_KEY_EMPTY = 4,
  TOKEN_EMPTY = 5,
  EMP_CODE_EMPTY = 6,
  PHONE_EMPTY = 7,
  PHONE_MAX_LENGTH = 8,
  PHONE_INVALID = 9,
  BIRTHDAY_INVALID = 10,
  BIRTHDAY_AFTER_NOW = 11,
  FULLNAME_MAX_LENGTH = 12,
  ADDRESS_MAX_LENGTH = 13,
  TAG_NAME_MAX_LENGTH = 14,
  FIREBASE_KEY_MAX_LENGTH = 15,
  TOKEN_MAX_LENGTH = 16,
  EMP_CODE_MAX_LENGTH = 17,
  FIREBASE_APP_INVALID = 18,
  FIREBASE_APP_DEVICE_NAME_MAX_LENGTH = 19,
  FIREBASE_APP_CODE_EMPTY = 20,
  FIREBASE_APP_CODE_MAX_LENGTH = 21,
  FIREBASE_APP_DEVICE_TOKEN_EMPTY = 22,
  FIREBASE_APP_DEVICE_TOKEN_MAX_LENGTH = 23

}
export interface ValidImportContactQuery extends Pagination {
  strSearch: string;
}

export interface Note {
  id: number | null;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  updatedBy: string;
  content: string;
  contactId: number;
}
export interface NoteListQuery extends Pagination {
  contactId: number;
}

export interface IContactLog {
  logId: number;
  campaignType: number;
  campaignName: string;
  apiEmailSubject: string;
  apiType: number;
  messageId: number;
  clickedLink: string;
  logType: number;
  createdAt: number;
  createdBy: string;
}

