export interface IReceiverListQuery {
  searchKeyword: string;
  campaignId: number;
  page: number;
  limit: number;
}

export interface IReceiver {
	phone: string | null;
	email: string | null;
	firebaseKey: string | null;
	token: string | null;
	status: number;

}
