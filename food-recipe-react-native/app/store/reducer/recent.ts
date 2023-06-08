import { DataAction } from "app/constants/types/action"
import { RecentQuery, RecentState } from "app/constants/types/state"
import * as types from 'app/store/action-type'

const DEFAULT_QUERY: RecentQuery = {
  page: 1,
  limit: 10
}

const INITIAL_STATE: RecentState = {
  query: Object.assign({}, DEFAULT_QUERY),
  total: 0,
  items: [],
  loading: false
}

export default (state: RecentState = INITIAL_STATE, { type, data }: DataAction) => {
  switch (type) {
    case types.RECENT_SET_LOADING:
      return { ...state, loading: data }
    case types.RECENT_RESET_QUERY:
      return { ...state, query: Object.assign({}, DEFAULT_QUERY) }
    case types.RECENT_SET_QUERY_PAGE:
      return { ...state, query: { ...state.query, page: data } }
    case types.RECENT_SET_QUERY_LIMIT:
      return { ...state, query: { ...state.query, limit: data } }
    case types.RECENT_SET_TOTAL:
      return { ...state, total: data }
    case types.RECENT_SET_ITEMS:
      return { ...state, items: state.items?.concat(data) }
    default:
      return state
  }
}
