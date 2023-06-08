import { DataAction } from "app/constants/types/action"
import { SearchState, SearchQuery } from "app/constants/types/state"
import * as types from 'app/store/action-type'

const DEFAULT_QUERY: SearchQuery = {
  page: 1,
  limit: 10,
  searchKeyword: ''
}

const INITIAL_STATE: SearchState = {
  query: Object.assign({}, DEFAULT_QUERY),
  total: 0,
  items: [],
  loading: false
}

export default (state: SearchState = INITIAL_STATE, { type, data }: DataAction) => {
  switch (type) {
    case types.SEARCH_SET_LOADING:
      return { ...state, loading: data }
    case types.SEARCH_RESET_QUERY:
      return { ...state, query: Object.assign({}, DEFAULT_QUERY) }
    case types.SEARCH_SET_QUERY_PAGE:
      return { ...state, query: { ...state.query, page: data } }
    case types.SEARCH_SET_QUERY_LIMIT:
      return { ...state, query: { ...state.query, limit: data } }
    case types.SEARCH_SET_QUERY_SEARCH_KEYWORD:
      return { ...state, query: { ...state.query, searchKeyword: data } }
    case types.SEARCH_SET_TOTAL:
      return { ...state, total: data }
    case types.SEARCH_SET_ITEMS:
      return { ...state, items: state.items?.concat(data) }
    case types.SEARCH_RESET:
      return INITIAL_STATE
    default:
      return state
  }
}
