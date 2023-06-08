export interface Token {
  id: number | null;
  token: string;
  deviceName: string | null;
  createdAt?: number;
  updatedAt?: number;
  customerId?: number;
  fbAppId: number;
  ctFcmId?: number;
  contactId?: number;
}
