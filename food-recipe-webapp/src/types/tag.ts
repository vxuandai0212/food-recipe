export interface Tag {
  id: number | null;
  audienceId: number;
  name: string;
  templateType: number;
  applicationId: number;
  type: number;
  selected?: boolean;
}

export interface ITagListQuery{
  type?: number;
  templateType?: number;
  audienceId? : number;
  applicationId? : number;
  searchKeyword?: string;
  page? : number;
  limit? : number;
}
