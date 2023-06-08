import React from 'react'
import { View, StyleSheet, SafeAreaView, FlatList, Platform, Image, Text } from 'react-native'
import { COLORS, FONTS, SIZES } from 'app/constants'
import { setWidth, setHeight } from 'app/utils/func'
import SearchInput from 'app/components/common/SearchInput'
import RecipeItem from 'app/components/recipe/RecipeItem'
import BackButton from 'app/components/common/BackButton'
import { AppState } from 'app/constants/types/state'
import { useDispatch, useSelector } from 'react-redux'
import LoadingSearch from 'app/screens/food-delivery/loading/LoadingSearch'
import { IMAGES } from 'app/constants/constants'
import * as ACTIONS from 'app/store/action-type'
import Overlay from 'app/screens/food-delivery/overlay/Overlay'

const RecipeSearch = () => {
  const dispatch = useDispatch()

  const listLoading = useSelector((state: AppState) => state.ui.listLoading)
  const viewLoading = useSelector((state: AppState) => state.ui.viewLoading)

  const searchItems = useSelector((state: AppState) => state.search.items)
  const searchTotal = useSelector((state: AppState) => state.search.total)

  const loadMoreSearch = () => {
    if (searchTotal && searchTotal < 2) {
      return
    } else {
      if (searchItems?.length == searchTotal) {
        dispatch({ type: ACTIONS.SEARCH_LOAD_MORE_FULL })
      } else {
        dispatch({ type: ACTIONS.SEARCH_LOAD_MORE })
      }
    }
  }

  const isEmpty = searchTotal == 0

  const renderEmpty = () => {
    if (isEmpty) {
      return (
        <View>
          <Image source={IMAGES.SLEEP_CAT} style={styles.image} />
          <Text style={styles.text}>Không có công thức nào</Text>
        </View>
      )
    } else {
      return null
    }
  }

  if (viewLoading) {
    return <LoadingSearch />
  } else {
    return (
      <SafeAreaView style={styles.container}>
        { listLoading && <Overlay /> }
        <View style={{ flexDirection: 'row', width: SIZES.window.width - 40, marginHorizontal: 20 }}>
          <BackButton onPress={() => dispatch({ type: ACTIONS.SEARCH_RESET_QUERY })} buttonColor="black" customStyle={{ marginTop: 28, width: 25 }} />
          <SearchInput customStyle={{ width: SIZES.window.width - 95 }} />
        </View>
        <View
          style={{ flex: 1, height: SIZES.window.height }}
        >
          <FlatList 
            data={searchItems}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderEmpty()}
            renderItem={({ item, index }: any) => {
              if ((index + 1) % 2 === 0) {
                return (
                  <View>
                    <RecipeItem key={index} item={item} />
                    {/* <AdItem customStyle={{ marginBottom: 32 }} /> */}
                  </View>
                )
              } else {
                return<RecipeItem key={index} item={item} />
              }
            }}
            ListFooterComponent={
              <View style={ Platform.OS === 'ios' ? {marginBottom: 0} : {marginBottom: 10}}/>
            }
            onEndReachedThreshold={0.5}
            onEndReached={() => loadMoreSearch()}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DEFAULT_WHITE,
    marginTop: 0
  },
  image: {
    height: setHeight(30),
    width: setWidth(60)
  },
  titleText: {
    color: COLORS.DEFAULT_WHITE,
    fontSize: 32,
    fontFamily: FONTS.POPPINS_LIGHT
  },
  text: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0.14,
    color: 'black'
  }
})

export default RecipeSearch
