import { VIEW_TYPE } from "app/constants/types/enum"

export interface VIEW_REQUEST {
  type: VIEW_TYPE
  id?: number
  keyword?: string
}
