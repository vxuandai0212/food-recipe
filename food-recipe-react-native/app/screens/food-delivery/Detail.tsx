import React, { useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  ScrollView
} from 'react-native'
import { COLORS, FONTS, SIZES } from 'app/constants'
import styled from 'styled-components/native'
import { Back, Ad, Nutrition, Price } from 'app/constants/icons'
import { useNavigation } from '@react-navigation/native'
import CookTimeTag from 'app/components/common/CookTimeTag'
import { RECIPE_INSTRUCTION_TYPE } from 'app/constants/types/enum'
import IngredientActionDrawer from 'app/components/recipe/IngredientActionDrawer'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SCREEN } from 'app/constants/types/screen'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'app/constants/types/state'
import LoadingRecipeDetail from 'app/screens/food-delivery/loading/LoadingRecipeDetail'
import { AD_CATEGORY_MAP } from 'app/constants/ad'
import * as ACTIONS from 'app/store/action-type'

const Name = styled.Text`
  font-family: ${FONTS.POPPINS_MEDIUM};
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.14px;
  color: #000000;
  margin-bottom: 14px;
`
const Value = styled.Text`
  font-family: ${FONTS.POPPINS_MEDIUM};
  font-size: 16px;
  color: #010f07;
`
const ButtonContainer = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 0.8px solid #22a45d;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
const ButtonLabel = styled.Text`
  font-family: ${FONTS.POPPINS_REGULAR};
  font-size: 12px;
  text-transform: uppercase;
  color: #22a45d;
  text-align: center;
`

const RecipeImageAnimate = (props: any) => {
  const navigation: any = useNavigation()
  const { thumbnails } = props
  return (
    <FlatList
      data={thumbnails}
      keyExtractor={(_: any, index: any) => index.toString()}
      pagingEnabled
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        return (
          <TouchableWithoutFeedback onLongPress={() => navigation.navigate(SCREEN.VIEW_IMAGE)}>
            <Image source={{ uri: item.url }} resizeMode="cover" style={{ height: 375, width: SIZES.window.width, borderBottomRightRadius: 50 }} />
          </TouchableWithoutFeedback>
        )
      }}
    />
  )
}

const SlideImage = (props: any) => {
  const { thumbnails } = props
  const navigation: any = useNavigation()
  const renderImage = () => {
    if (!thumbnails || thumbnails.length == 0) {
      return <Image source={{ uri: 'https://res.cloudinary.com/fit1501040028/image/upload/c_scale/bcae5bc7-ae5a-4e60-a2bc-02494a03e5b2' }} resizeMode="cover" style={{ height: 375, width: SIZES.window.width, borderBottomRightRadius: 50 }} />
    } else if (thumbnails && thumbnails.length == 1) {
      return <Image source={{ uri: thumbnails[0].url }} resizeMode="cover" style={{ height: 375, width: SIZES.window.width, borderBottomRightRadius: 50 }} />
    } else {
      return <RecipeImageAnimate thumbnails={thumbnails} />
    }
  }
  return (
    <View style={{ height: 375, position: 'relative' }}>
      { renderImage() }
      <TouchableOpacity style={{ left: 20, top: 54, position: 'absolute' }} onPress={() => navigation.goBack()}>
        <Back style={{ width: 34, height: 34 }} fill="white" />
      </TouchableOpacity>
    </View>
  )
}

const CookEvent = (props: any) => {
  const { customStyle } = props
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 13,
        paddingBottom: 11,
        backgroundColor: '#F1F1F1',
        opacity: 0.8,
        borderRadius: 19,
        ...customStyle
      }}>
      <Text
        style={{
          fontFamily: FONTS.POPPINS_REGULAR,
          fontSize: 12,
          lineHeight: 14,
          textAlign: 'center',
          letterSpacing: 1.02857,
          color: '#010F07',
          opacity: 0.54
        }}>
        {props.name}
      </Text>
    </View>
  )
}

const RestaurantInfo = (props: any) => {
  const recipe = props.item
  const { name, cookEvents, thumbnails } = recipe

  function getMarginStyle(index: any) {
    if (index === cookEvents.length - 1) {
      return { marginRight: 20 }
    } else {
      return { marginRight: 10 }
    }
  }

  return (
    <View style={{ marginBottom: 25 }}>
      <SlideImage thumbnails={thumbnails}/>
      <Name style={{ marginTop: 20, marginHorizontal: 20, marginBottom: 15 }}>{name}</Name>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Value style={{ marginLeft: 20, paddingTop: 5, width: 50 }}>Dịp</Value>
        <View style={{ flex: 1 }}>
          <FlatList
            data={cookEvents}
            horizontal={true}
            keyboardDismissMode="on-drag"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }: any) => <CookEvent key={index} customStyle={getMarginStyle(index)} name={item} />}
          />
        </View>
      </View>
    </View>
  )
}

const FoodContent = styled.View`
  flex-direction: column;
`
const FoodTitle = styled.Text`
  font-family: ${FONTS.POPPINS_MEDIUM};
  font-size: 18px;
  color: #010f07;
  margin-bottom: 6px;
`
const FoodIngredient = styled.Text`
  font-family: ${FONTS.POPPINS_REGULAR};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #010f07;
  margin-bottom: 10px;
`
const FoodPrice = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
`
const FoodPriceText = styled.Text`
  font-family: ${FONTS.POPPINS_REGULAR};
  font-size: 14px;
  color: #010f07;
  opacity: 0.74;
`
const Subhead = styled.Text`
  font-family: ${FONTS.POPPINS_MEDIUM};
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.444444px;
  color: #010f07;
  margin-top: 14px;
  margin-bottom: 4px;
`

const FoodItem2 = (props: any) => {
  const dispatch = useDispatch()
  const { openIngredientActionDrawer, ingredient } = props
  const { name, url, displayQuantity, displayQuantityUnit } = ingredient
  return (
    <TouchableWithoutFeedback style={{ flexDirection: 'column' }} onPress={() => {
      dispatch({ type: ACTIONS.DETAIL_SET_CURRENT_INGREDIENT, data: ingredient })
      openIngredientActionDrawer()
    }}>
      <Image source={{ uri: url }} resizeMode="cover" style={{ height: 140, width: 140, borderRadius: 8 }} />
      <FoodTitle style={{ marginTop: 10, marginBottom: 4, width: 140 }}>{name}</FoodTitle>
      <FoodPrice>
        <FoodPriceText>{displayQuantity} {displayQuantityUnit}</FoodPriceText>
      </FoodPrice>
    </TouchableWithoutFeedback>
  )
}

const FeatureItems = (props: any) => {
  const { openIngredientActionDrawer, ingredients } = props
  return (
    <View style={{ marginLeft: 20 }}>
      <FlatList
        data={ingredients}
        horizontal={true}
        keyboardDismissMode="on-drag"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }: any) => (
          <View style={{ marginRight: 20 }}>
            <FoodItem2 key={index} ingredient={item} openIngredientActionDrawer={openIngredientActionDrawer} />
          </View>
        )}
      />
    </View>
  )
}

const StepInstruction = (props: any) => {
  return <FoodIngredient style={{ marginHorizontal: 20 }}>{props.instruction.data.description}</FoodIngredient>
}

const NoteInstruction = (props: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        backgroundColor: '#E6F9F2',
        borderRadius: 12
      }}>
      <FoodContent>
        <FoodTitle style={{ fontSize: 16 }}>Chú ý</FoodTitle>
        <FoodIngredient>{props.instruction.data.description}</FoodIngredient>
      </FoodContent>
    </View>
  )
}

const TipInstruction = (props: any) => {
  const { instruction, viewTipAd, handleViewTipAd } = props
  const { id, data } = instruction
  const { name, description } = data
  const isViewedAd = viewTipAd.filter((i: any) => i.id === id)[0]['viewed']
  if (isViewedAd) {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginBottom: 15,
          backgroundColor: '#E6F9F2',
          borderRadius: 12
        }}>
        <FoodContent>
          <View>
            <FoodTitle>Mẹo</FoodTitle>
          </View>
          <FoodIngredient>{name}</FoodIngredient>
          <FoodIngredient>{description}</FoodIngredient>
        </FoodContent>
      </View>
    )
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => handleViewTipAd(id)}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginBottom: 15,
            backgroundColor: '#E6F9F2',
            borderRadius: 12
          }}>
          <FoodContent>
            <View style={{ flexDirection: 'row' }}>
              <FoodTitle>Mẹo</FoodTitle>
              <Ad style={{ marginTop: 1, marginLeft: 5 }} width={24} height={24} fill="#982111" />
            </View>
            <FoodIngredient>{name}</FoodIngredient>
          </FoodContent>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const AdComponent = (props: any) => {
  const { ad } = props
  const { name, link, type } = ad
  const adType = AD_CATEGORY_MAP.get(type)
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <Text
        style={{
          paddingTop: 6,
          paddingBottom: 5,
          paddingHorizontal: 5,
          backgroundColor: '#22A45D',
          borderRadius: 6,
          fontFamily: FONTS.POPPINS_REGULAR,
          fontSize: 12,
          lineHeight: 14,
          letterSpacing: 1.02857,
          color: '#FFFFFF',
          alignItems: 'center',
          marginRight: 10
        }}>
        {adType}
      </Text>
      <Value onPress={() => Linking.openURL(link)} style={{ flex: 1, marginTop: 4 }}>
        {name}
      </Value>
    </View>
  )
}

const Detail = () => {
  const dispatch = useDispatch()

  const viewLoading = useSelector((state: AppState) => state.ui.viewLoading)

  const recipe = useSelector((state: AppState) => state.detail.item)
  const adViewInstructionTip = useSelector((state: AppState) => state.detail.adView.instructionTip)
  
  const navigation: any = useNavigation()

  const ingredientActionDrawerRef: any = useRef()

  const handleViewTipAd = (id: any) => dispatch({ type: ACTIONS.DETAIL_VIEW_INSTRUCTION_TIP_AD, data: id }) 

  if (viewLoading) {
    return <LoadingRecipeDetail />
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar hidden />
        <IngredientActionDrawer ref={ingredientActionDrawerRef}>
          <ScrollView style={{marginBottom: 10}}>
            <RestaurantInfo item={recipe} />
            <Subhead style={{ marginHorizontal: 20, marginTop: 0, marginBottom: 18 }}>Thành phần</Subhead>
            <FeatureItems ingredients={recipe.ingredients} openIngredientActionDrawer={() => ingredientActionDrawerRef.current.openDrawer()} />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginTop: 20
              }}>
              <TouchableWithoutFeedback onPress={() => navigation.navigate(SCREEN.RECIPE_PRICE)}>
                <ButtonContainer>
                  <Price width={24} height={24} fill="#FEEB8A" />
                  <ButtonLabel style={{ marginLeft: 5, marginRight: 15 }}>Giá</ButtonLabel>
                  <Ad width={24} height={24} fill="#982111" />
                </ButtonContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => navigation.navigate(SCREEN.RECIPE_NUTRITION)}>
                <ButtonContainer>
                  <Nutrition width={24} height={24} fill="#F86D4E" />
                  <ButtonLabel style={{ marginLeft: 5, marginRight: 15 }}>Dinh dưỡng</ButtonLabel>
                  <Ad width={24} height={24} fill="#982111" />
                </ButtonContainer>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                marginHorizontal: 20
              }}>
              <View style={{ marginBottom: 15 }}>
                <Subhead>Hướng dẫn</Subhead>
              </View>
              <View style={{ marginTop: 10 }}>
                <CookTimeTag minute={recipe.cookTime} showUnit={true} />
              </View>
            </View>
            <View>
              {recipe.instruction && recipe.instruction.map((instruction: any, index: any) => {
                const { type } = instruction
                if (type === RECIPE_INSTRUCTION_TYPE.STEP) {
                  return <StepInstruction key={index} instruction={instruction} />
                } else if (type === RECIPE_INSTRUCTION_TYPE.NOTE) {
                  return <NoteInstruction key={index} instruction={instruction} />
                } else if (type === RECIPE_INSTRUCTION_TYPE.TIP) {
                  return (
                    <TipInstruction key={index} instruction={instruction} viewTipAd={adViewInstructionTip} handleViewTipAd={handleViewTipAd} />
                  )
                }
              })}
            </View>
            {
              recipe.ads && recipe.ads.length > 0 &&
              <Subhead style={{ marginHorizontal: 20, marginBottom: 15 }}>Có thể bạn sẽ quan tâm</Subhead>
            }
            <View style={{ flexDirection: 'column', marginHorizontal: 20 }}>
              {recipe.ads && recipe.ads.map((i, index) => (
                <AdComponent key={index} ad={i} />
              ))}
            </View>
          </ScrollView>
        </IngredientActionDrawer>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  activeIndicator: {
    backgroundColor: '#ffffff'
  },
  inactiveIndicator: {
    backgroundColor: '#53575B'
  }
})

export default Detail
