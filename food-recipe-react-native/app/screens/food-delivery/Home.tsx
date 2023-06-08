import React, { useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, FlatList, Image, SafeAreaView, Platform, TextInput } from 'react-native'
import { FONTS, SIZES } from 'app/constants'
import styled from 'styled-components/native'
import { Clock, ActiveTabbar, Banner } from 'app/constants/icons'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from 'app/constants/types/screen'
import { useDispatch, useSelector } from 'react-redux'
import SplashScreen from 'app/screens/food-delivery/splash/SplashScreen'
import Overlay from 'app/screens/food-delivery/overlay/Overlay'
import { IMAGES } from 'app/constants/constants'
import * as ACTIONS from 'app/store/action-type'
import { AppState } from 'app/constants/types/state'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const SectionHeaderContainer = styled.View`
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: space-between;
  align-items: center;
`
const SectionHeaderTitle = styled.Text`
  font-family: ${FONTS.POPPINS_BOLD};
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.14px;
  color: #010f07;
`
const FeaturePartnerFlatList = styled.View`
  margin-left: 20px;
  margin-bottom: 20px;
`
const FeaturePartnerCardContainer = styled.View`
  margin-top: 20px;
  margin-right: 14px;
`
const FeaturePartnerCardTitle = styled.Text`
  width: 200px;
  font-family: ${FONTS.POPPINS_MEDIUM};
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.444444px;
  color: #010f07;
  margin-bottom: 2px;
`

const BannerContainer = styled.View`
  margin-bottom: 24px;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
  padding-left: 20px;
  height: 170px;
  background: #E6F9F2;
  border-radius: 12px;
  position: relative;
`
const BannerTitle = styled.Text`
  margin-bottom: 10px;
  font-family: ${FONTS.POPPINS_BOLD};
  font-size: 28px;
  line-height: 36px;
  letter-spacing: 0.18px;
  color: #010F07;
`
const BannerDescription = styled.Text`
  font-family: ${FONTS.POPPINS_REGULAR};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #010F07;
  opacity: 0.84;
`

const RestaurantTitle = styled.Text`
  font-family: ${FONTS.POPPINS_BOLD};
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.444444px;
  color: #010F07;
  margin-bottom: 4px;
`

const RestaurantItem = ({ id, name, cookTime, image }: any) => {
  const navigation: any = useNavigation()
  const dispatch = useDispatch()
  const renderImage = (image: any) => {
    if (image) {
      return <Image source={{ uri: image }} style={{...styles.headerImage }} />
    } else {
      return <Image source={IMAGES.DEFAULT_RECIPE_IMAGE_THUMBNAIL} style={{...styles.headerImage }} />
    }
  }
  return (
    <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
      <TouchableWithoutFeedback onPress={() => {
        navigation.navigate(SCREEN.RECIPE_DETAIL)
        dispatch({ type: ACTIONS.DETAIL_GET, id })
      }}>
        { renderImage(image) }
      </TouchableWithoutFeedback>
      <View style={{ position: 'absolute', right: 7, top: 153 }}>
        <CookTimeTag minute={cookTime} />
      </View>
      <RestaurantTitle style={{marginTop: 16}}>{name}</RestaurantTitle>
    </View>
  )
}

const FullRecentItem = ({ id, name, cookTime, image }: any) => {
  const navigation: any = useNavigation()
  const dispatch = useDispatch()
  const renderImage = (image: any) => {
    if (image) {
      return <Image source={{ uri: image }} style={{...styles.headerImage }} />
    } else {
      return <Image source={IMAGES.DEFAULT_RECIPE_IMAGE_THUMBNAIL} style={{...styles.headerImage }} />
    }
  }
  return (
    <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 20 }}>
      <TouchableWithoutFeedback onPress={async () => {
        navigation.navigate(SCREEN.RECIPE_DETAIL)
        dispatch({ type: ACTIONS.DETAIL_GET, id })
      }}>
        { renderImage(image) }
      </TouchableWithoutFeedback>
      <View style={{ position: 'absolute', right: 7, top: 153 }}>
        <CookTimeTag minute={cookTime} />
      </View>
      <RestaurantTitle style={{marginTop: 16}}>{name}</RestaurantTitle>
    </View>
  )
}

const CookTimeTag = ({ minute }: any) => {
  const color = minute > 45 ? '#F1543F' : '#22A45D'
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ width: 25 }}>
        <ActiveTabbar width={18} height={24} fill={color} />
        <Clock style={{top: 5, left: 5, position: 'absolute'}} width={20} height={20} fill={color} />
      </View>
      <Text style={{ color, fontSize: 12, lineHeight: 20, letterSpacing: 0.6, marginTop: 4 }}>{ minute }</Text>
    </View>
  )
}

const SearchRecipe = () => {
  const navigation: any = useNavigation()
  const searchKeyword = useSelector((state: any) => state.search.query.searchKeyword)
  const dispatch = useDispatch()
  const onChangeSearchKeyword = (data: any) => dispatch({ type: ACTIONS.SEARCH_SET_QUERY_SEARCH_KEYWORD, data })
  const onSubmitEditingSearchKeyword = () => {
    if (searchKeyword) {
      navigation.navigate(SCREEN.RECIPE_SEARCH)
      dispatch({ type: ACTIONS.SEARCH_SUBMIT })
    }
  }
  const placeholder = 'Bạn muốn nấu món gì?'

  return (
    <TextInput
        style={styles.searchContainer}
        onChangeText={onChangeSearchKeyword}
        onSubmitEditing={onSubmitEditingSearchKeyword}
        value={searchKeyword}
        placeholder={placeholder}
        keyboardType="default"
      />
  )
}

const BannerSection = (props: any) => {
  return (
    <BannerContainer style={{ ...props.customStyle }}>
      <BannerTitle>Free Delivery for {"\n"}1 Month!</BannerTitle>
      <BannerDescription>You've to order at least $10 for {"\n"}using free delivery for 1 month.</BannerDescription>
      <Banner style={{position: 'absolute', zIndex: 2, top: -80, right: -20}} />
    </BannerContainer>
  )
}

const FeaturePartnerCard = ({ id, name, cookTime, image }: any) => {
  const navigation: any = useNavigation()
  const dispatch = useDispatch()
  const renderImage = () => {
    if (image) {
      return <Image source={{ uri: image }} style={styles.featurePartnerImage} />
    } else {
      return <Image source={IMAGES.DEFAULT_RECIPE_IMAGE_THUMBNAIL} style={{...styles.featurePartnerImage }} />
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => {
      navigation.navigate(SCREEN.RECIPE_DETAIL)
      dispatch({ type: ACTIONS.DETAIL_GET, id })
    }}>
      <FeaturePartnerCardContainer>
        { renderImage() }
        <FeaturePartnerCardTitle>{name}</FeaturePartnerCardTitle>
        <View style={{ position: 'absolute', right: 5, top: 130 }}>
          <CookTimeTag minute={cookTime} />
        </View>
      </FeaturePartnerCardContainer>
    </TouchableWithoutFeedback>
  )
}

const Home = ({ navigation }: any) => {
  const dispatch = useDispatch()

  const splashLoading = useSelector((state: AppState) => state.ui.splash)
  const listLoading = useSelector((state: AppState) => state.ui.listLoading)

  const mostViewItems = useSelector((state: AppState) => state.mostView.items)
  const mostViewTotal = useSelector((state: AppState) => state.mostView.total)

  const recentItems = useSelector((state: AppState) => state.recent.items)
  const recentTotal = useSelector((state: AppState) => state.recent.total)

  useEffect(() => { dispatch({ type: ACTIONS.INIT }) }, [])

  const loadMoreRecent = () => {
    if (recentItems?.length == recentTotal) {
      dispatch({ type: ACTIONS.RECENT_LOAD_MORE_FULL })
    } else {
      dispatch({ type: ACTIONS.RECENT_LOAD_MORE })
    }
  }

  const loadMoreMostView = () => {
    if (mostViewItems?.length == mostViewTotal) {
      dispatch({ type: ACTIONS.MOST_VIEW_LOAD_MORE_FULL })
    } else {
      dispatch({ type: ACTIONS.MOST_VIEW_LOAD_MORE })
    }
  }

  const renderRecentList = (recentItems: any) => {
    if (!recentItems || recentItems.length === 0) {
      return null
    } else if (recentItems && recentItems.length === 1) {
      const item = recentItems[0]
      return <FullRecentItem
      key={`recent-${item.id}`}
      id={item.id}
      name={item.name}
      cookTime={item.cookTime}
      image={item.imageUrl} />
    } else {
      return <FeaturePartnerFlatList>
                <FlatList
                  data={recentItems}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  overScrollMode="never"
                  renderItem={({ item, index }: any) => <FeaturePartnerCard 
                    key={`recent-${item.id}`}
                    id={item.id}
                    name={item.name}
                    cookTime={item.cookTime}
                    image={item.imageUrl} />
                  }
                  onEndReachedThreshold={0.01}
                  onEndReached={() => loadMoreRecent()}
                />
              </FeaturePartnerFlatList>
    }
  }

  if (splashLoading) {
    return <SplashScreen />
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <SearchRecipe />
        { listLoading && <Overlay /> }
        <FlatList 
          data={mostViewItems}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              { 
                recentItems && recentItems?.length > 0 && 
                <SectionHeaderContainer>
                  <SectionHeaderTitle>Mới cập nhật</SectionHeaderTitle>
                </SectionHeaderContainer>
              }
              { renderRecentList(recentItems) }
              
              {/* <BannerSection customStyle={{ marginTop: 24 }} /> */}
  
              <SectionHeaderContainer>
                <SectionHeaderTitle style={{ marginBottom: 20 }}>Tất cả</SectionHeaderTitle>
              </SectionHeaderContainer>
            </View>
          }
          renderItem={({ item, index }: any) => {
            return (
              <RestaurantItem
                key={`mostView-${item.id}`}
                id={item.id}
                name={item.name}
                cookTime={item.cookTime}
                image={item.imageUrl} />
            )}
          }
          ListFooterComponent={
            <View style={ Platform.OS === 'ios' ? {marginBottom: 0} : {marginBottom: 10}}/>
          }
          onEndReachedThreshold={0.01}
          onEndReached={() => loadMoreMostView()}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  headerImage: {
    borderRadius: 15,
    height: 185,
    width: SIZES.window.width - 40
  },
  activeIndicator: {
    backgroundColor: '#ffffff'
  },
  inactiveIndicator: {
    backgroundColor: '#53575B'
  },
  featurePartnerImage: {
    width: 200,
    height: 160,
    borderRadius: 15,
    marginBottom: 14
  },
  searchContainer: {
    height: 48,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 25,
    marginBottom: 20,
    backgroundColor: '#FBFBFB',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EBE4E4',
    borderRadius: 8,
    paddingLeft: 10,
    paddingBottom: 6,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    fontFamily: FONTS.POPPINS_REGULAR
  }
})

export default Home
