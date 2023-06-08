import { delay, put, takeLatest } from 'redux-saga/effects'
import * as types from 'app/store/action-type'
import api from 'app/api'
import { isOnline } from 'app/helpers/connection'

function* getRecipe({ id }: any): Generator<any, any, any> {  
  const { isConnected } = yield isOnline()
  if (isConnected) {
    yield put({ type: types.VIEW_LOADING, data: true })
    const { response, error } = yield api.get({ id })
    if (response) {
      const { data } = response
      yield put({ type: types.DETAIL_SET_ITEM, data })
      const { ingredients } = data
      if (ingredients && ingredients.length > 0) {
        yield put({ type: types.DETAIL_SET_CURRENT_INGREDIENT_ID_SAGA, id: ingredients[0]['id'] })
      }
    } else {
      const { code } = error
      if (code === 404) {
        yield put({ type: types.APP_SERVER_MAINTAIN, data: true })
      }
    }
    yield delay(1500)
    yield put({ type: types.VIEW_LOADING, data: false })
  } else {
    yield put({ type: types.APP_CONNECTION_ERROR, data: true })
  }
}

export function* getRecipeSaga() {
  yield takeLatest(types.DETAIL_GET, getRecipe)
}

function* setCurrentIngredientId({ id }: any): Generator<any, any, any> {  
  yield put({ type: types.DETAIL_SET_CURRENT_INGREDIENT_ID, data: id })
}

export function* setCurrentIngredientIdSaga() {
  yield takeLatest(types.DETAIL_SET_CURRENT_INGREDIENT_ID_SAGA, setCurrentIngredientId)
}
