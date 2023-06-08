import { DataAction } from "app/constants/types/action"
import { AppErrorState } from "app/constants/types/state"
import * as types from 'app/store/action-type'

const INITIAL_STATE: AppErrorState = {
  connection: false,
  maintain: false
}

export default (state: AppErrorState = INITIAL_STATE, { type, data }: DataAction) => {
  switch (type) {
    case types.APP_CONNECTION_ERROR:
      return { ...state, connection: data }
    case types.APP_SERVER_MAINTAIN:
      return { ...state, maintain: data }
    default:
      return state
  }
}
