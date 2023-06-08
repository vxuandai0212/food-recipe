import { combineReducers } from 'redux'
import detail from 'app/store/reducer/detail'
import appError from 'app/store/reducer/error'
import mostView from 'app/store/reducer/most-view'
import recent from 'app/store/reducer/recent'
import search from 'app/store/reducer/search'
import ui from 'app/store/reducer/ui'

export default combineReducers({
  appError,
  detail,
  mostView,
  recent,
  search,
  ui
})
