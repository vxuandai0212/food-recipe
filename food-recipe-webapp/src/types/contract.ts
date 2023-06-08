export interface Contract {
  id: number;
  featureId: number;
  consumeInfoId: number | null;
  rateLimitId: number;
  applicationId: number;
  quotaId: number | null;
  type: number;
  status: number;
}

export interface IAppContract {
  featureId: number;
  featureName: string;
  quotaTotal: number | null;
  quotaDuration: number | null;
  quotaUnit: number | null;
  rateLimitTotal: number | null;
  rateLimitDuration: number | null;
  rateLimitUnit: number | null;
  total: number | null;
  remain: number | null;
  timeRemain: number | null;
  status: number;
  providers: IProvider[];
  type?: number ;
  lockReason?: string;
}

export interface IProvider {
  id: number;
  name: string;
}
