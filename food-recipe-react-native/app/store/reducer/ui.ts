import { DataAction } from "app/constants/types/action"
import { OVERLAY_STATUS } from "app/constants/types/enum"
import { UiState } from "app/constants/types/state"
import * as types from 'app/store/action-type'

const INITIAL_STATE: UiState = {
  splash: true,
  listLoading: false,
  overlay: OVERLAY_STATUS.LOADING,
  viewLoading: false
}

export default (state: UiState = INITIAL_STATE, { type, data }: DataAction) => {
  switch (type) {
    case types.SPLASH:
      return { ...state, splash: data }
    case types.LIST_LOADING:
      return { ...state, listLoading: data }
    case types.OVERLAY:
      return { ...state, overlay: data }
    case types.VIEW_LOADING:
      return { ...state, viewLoading: data }
    default:
      return state
  }
}
