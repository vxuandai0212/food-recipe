/**
 * vì một hành động ở app có thể được xử lý bởi nhiều hành động ở phía server
 * nên mình thống nhất là không bóc tách hết hành động ra ở phía app nhưng đảm bảo đối chiếu hành động ở app
 * phải khớp với số liệu trên cơ sở dữ liệu
 * 
 * vì nếu nhóm action theo đối tượng dispatch thì sẽ khó tra cứu khi phát triển
 * nên sẽ nhóm theo màn hình để dễ tra cứu
 * 
 * cách nhóm màn hình ~> saga ~> reducer
 */

// ui
export const SPLASH = 'ui/SPLASH'
export const LIST_LOADING = 'ui/LIST_LOADING'
export const OVERLAY = 'ui/OVERLAY'
export const VIEW_LOADING = 'ui/VIEW_LOADING'

// error
export const APP_CONNECTION_ERROR = 'error/CONNECTION_ERROR'
export const APP_SERVER_MAINTAIN = 'error/SERVER_MAINTAIN'

// recent
export const RECENT_GET_ALL = 'recent/GET_ALL'
export const RECENT_LOAD_MORE = 'recent/LOAD_MORE'
export const RECENT_LOAD_MORE_FULL = 'recent/LOAD_MORE_FULL'

export const RECENT_SET_LOADING = 'recent/SET_LOADING'

export const RECENT_RESET_QUERY = 'recent/RESET_QUERY'
export const RECENT_SET_QUERY_PAGE = 'recent/SET_QUERY_PAGE'
export const RECENT_SET_QUERY_LIMIT = 'recent/SET_QUERY_LIMIT'

export const RECENT_SET_TOTAL = 'recent/SET_TOTAL'
export const RECENT_SET_ITEMS = 'recent/SET_ITEMS'

// most-view
export const MOST_VIEW_GET_ALL = 'mostView/GET_ALL'
export const MOST_VIEW_LOAD_MORE = 'mostView/LOAD_MORE'
export const MOST_VIEW_LOAD_MORE_FULL = 'mostView/LOAD_MORE_FULL'

export const MOST_VIEW_SET_LOADING = 'mostView/SET_LOADING'

export const MOST_VIEW_RESET_QUERY = 'mostView/RESET_QUERY'
export const MOST_VIEW_SET_QUERY_PAGE = 'mostView/SET_QUERY_PAGE'
export const MOST_VIEW_SET_QUERY_LIMIT = 'mostView/SET_QUERY_LIMIT'

export const MOST_VIEW_SET_TOTAL = 'mostView/SET_TOTAL'
export const MOST_VIEW_SET_ITEMS = 'mostView/SET_ITEMS'

// recipe search
export const SEARCH_GET_ALL = 'search/GET_ALL'
export const SEARCH_LOAD_MORE = 'search/LOAD_MORE'
export const SEARCH_LOAD_MORE_FULL = 'search/LOAD_MORE_FULL'
export const SEARCH_SUBMIT = 'search/SUBMIT'

export const SEARCH_SET_LOADING = 'search/SET_LOADING'

export const SEARCH_RESET_QUERY = 'search/RESET_QUERY'
export const SEARCH_SET_QUERY_PAGE = 'search/SET_QUERY_PAGE'
export const SEARCH_SET_QUERY_LIMIT = 'search/SET_QUERY_LIMIT'
export const SEARCH_SET_QUERY_SEARCH_KEYWORD = 'search/SET_QUERY_SEARCH_KEYWORD'
export const SEARCH_RESET = 'search/RESET'

export const SEARCH_SET_TOTAL = 'search/SET_TOTAL'
export const SEARCH_SET_ITEMS = 'search/SET_ITEMS'

// recipe detail
export const DETAIL_GET = 'detail/GET'

export const DETAIL_SET_LOADING = 'detail/SET_LOADING'

export const DETAIL_SET_ITEM = 'detail/SET_LIST_TOTAL'
export const DETAIL_VIEW_PRICE_AD = 'detail/SET_VIEW_PRICE_AD'
export const DETAIL_VIEW_NUTRITION_AD = 'detail/SET_VIEW_NUTRITION_AD'
export const DETAIL_VIEW_INGREDIENT_AD = 'detail/SET_VIEW_INGREDIENT_AD'
export const DETAIL_VIEW_INSTRUCTION_TIP_AD = 'detail/SET_VIEW_INSTRUCTION_TIP_AD'
export const DETAIL_SET_CURRENT_INGREDIENT = 'detail/SET_CURRENT_INGREDIENT'
export const DETAIL_SET_CURRENT_INGREDIENT_ID = 'detail/SET_CURRENT_INGREDIENT_ID'
export const DETAIL_SET_CURRENT_INGREDIENT_ID_SAGA = 'detail/DETAIL_SET_CURRENT_INGREDIENT_ID_SAGA'

// view
export const AD_VIEW = 'AD_VIEW'

// init
export const INIT = 'INIT'
