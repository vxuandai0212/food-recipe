import { put, takeLatest, select, delay } from 'redux-saga/effects'
import * as types from 'app/store/action-type'
import api from 'app/api'
import { isOnline } from 'app/helpers/connection'
import { AppState, MostViewQuery, RecentQuery } from 'app/constants/types/state'

function* init(): Generator<any, any, any> {
  yield put({ type: types.SPLASH, data: true })

  const { isConnected } = yield isOnline()
  if (isConnected) {
    yield put({ type: types.RECENT_RESET_QUERY })
    const recentQuerySelector = (state: AppState) => state.recent.query
    const recentQuery: RecentQuery = yield select(recentQuerySelector)
    const recentResponse = yield api.recent(recentQuery)
    if (recentResponse.response && recentResponse.response.data) {
      const { total, items } = recentResponse.response.data
      yield put({ type: types.RECENT_SET_ITEMS, data: items })
      yield put({ type: types.RECENT_SET_TOTAL, data: total })
    } else {
      const { code } = recentResponse.error
      if (code === 404) {
        yield put({ type: types.APP_SERVER_MAINTAIN, data: true })
      }
    }

    yield put({ type: types.MOST_VIEW_RESET_QUERY })
    const mostViewQuerySelector = (state: AppState) => state.mostView.query
    const mostViewQuery: MostViewQuery = yield select(mostViewQuerySelector)
    const mostViewResponse = yield api.search(mostViewQuery)
    if (mostViewResponse.response && mostViewResponse.response.data) {
      const { total, items } = mostViewResponse.response.data
      yield put({ type: types.MOST_VIEW_SET_ITEMS, data: items })
      yield put({ type: types.MOST_VIEW_SET_TOTAL, data: total })
    } else {
      const { code } = mostViewResponse.error
      if (code === 404) {
        yield put({ type: types.APP_SERVER_MAINTAIN, data: true })
      }
    }
  } else {
    yield put({ type: types.APP_CONNECTION_ERROR, data: true })
  }

  yield delay(2000)

  yield put({ type: types.SPLASH, data: false })
}

export function* initSaga() {
  yield takeLatest(types.INIT, init)
}
