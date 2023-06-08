import { takeLatest } from 'redux-saga/effects'
import * as types from 'app/store/action-type'
import api from 'app/api'

function* adView({ query }: any): Generator<any, any, any> {
  yield api.adView(query)
}

export function* adViewSaga() {
  yield takeLatest(types.AD_VIEW, adView)
}
