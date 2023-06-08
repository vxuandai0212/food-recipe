import { all } from 'redux-saga/effects'
import { getRecipeSaga, setCurrentIngredientIdSaga } from 'app/store/saga/recipe'
import { adViewSaga } from 'app/store/saga/ad'
import { initSaga } from 'app/store/saga/init'
import { mostViewLoadMoreSaga, mostViewSaga, mostViewLoadMoreFullSaga } from 'app/store/saga/most-view'
import { recentSaga, recentLoadMoreFullSaga, recentLoadMoreSaga } from 'app/store/saga/recent'
import { searchSaga, searchSubmitSaga, searchLoadMoreSaga, searchLoadMoreFullSaga } from 'app/store/saga/search'

function* rootSaga() {
  yield all([
    recentSaga(),
    recentLoadMoreSaga(),
    recentLoadMoreFullSaga(),
    mostViewSaga(),
    mostViewLoadMoreSaga(),
    mostViewLoadMoreFullSaga(),
    searchSaga(),
    searchSubmitSaga(),
    searchLoadMoreSaga(),
    searchLoadMoreFullSaga(),
    getRecipeSaga(),
    setCurrentIngredientIdSaga(),
    adViewSaga(),
    initSaga()
  ])
}

export default rootSaga
