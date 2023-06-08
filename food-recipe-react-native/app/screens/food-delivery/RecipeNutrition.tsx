import React from 'react'
import { StyleSheet, StatusBar, SafeAreaView, ScrollView, Text, View, Image, Animated, Platform } from 'react-native'
import { T, H, C, P } from 'app/components/common'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'app/constants/types/state'
import { formatVndMoney } from 'app/utils/func'
import { FONTS, SIZES } from 'app/constants'
import TopHeader from 'app/components/common/TopHeader'
import _ from 'lodash'
import * as ACTIONS from 'app/store/action-type'

const IngredientNutritionItem = ({ nutrition, allNutrition }: any) => {
  if (allNutrition && allNutrition.length > 0) {
    const { name, value } = nutrition
    const unit = name === 'energy' ? 'kcal' : 'mg'
    const [width, setWidth] = React.useState(0)  
    const displayNutritionValue = formatVndMoney(value, 2, 3, '.', ',')
    const totalNutritionValue = allNutrition.filter((i: any) => i.name === name)[0]['value']
    const progressWidth = width * (value / totalNutritionValue)
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10
          }}
        >
          <T style={{
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 24,
            letterSpacing: -0.4,
            color: '#010f07'
          }}>{name}</T>
          <C style={{
            fontSize: 12,
            fontWeight: '300',
            lineHeight: 24,
            letterSpacing: -0.4,
            color: '#4E4E4E'
          }}>{displayNutritionValue.concat(' ').concat(unit)}</C>
        </View>
        <View
          onLayout={e => {
            const newWidth = e.nativeEvent.layout.width
            setWidth(newWidth)
          }}
          style={{
            height: 5,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 20,
            marginHorizontal: 15
          }}
        >
          <View
            style={{
              height: 5,
              borderRadius: 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
              position: 'absolute',
              top: 0,
              left: 0,
              width: progressWidth
            }}
          >
          </View>
        </View>
      </View>
    )
  } else {
    return null
  }
}

const IngredientNutritionSection = () => {
  const currentIngredientNutrition = useSelector((state: AppState) => state.detail.currentIngredientNutrition)
  const allNutrition = useSelector((state: AppState) => state.detail.allNutrition)
  if (currentIngredientNutrition && currentIngredientNutrition.length > 0) {
    return (
      <View
        style={{
          marginTop: 20,
          flexDirection: 'column',
          paddingHorizontal: 15,
          paddingTop: 10,
          marginBottom: 15,
          backgroundColor: '#E6F9F2',
          borderRadius: 12,
          paddingBottom: 20
        }}
      >
        { currentIngredientNutrition.map((i: any) => <IngredientNutritionItem key={i.name} nutrition={i} allNutrition={allNutrition} />)}
      </View>
    )
  } else {
    return <View style={{marginBottom: 20}}></View>
  }
}

const RecipeNutritionItem = (props: any) => {
  const { name, value } = props.nutrition
  const unit = name === 'energy' ? 'kcal' : 'mg'
  const formatValue = formatVndMoney(value, 2, 3, '.', ',')
  const displayValue = formatValue.concat(' ').concat(unit)
  if (name && value && unit) {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <T style={{
          flex: 4,
          fontSize: 14,
          fontWeight: '500',
          lineHeight: 24,
          letterSpacing: -0.4,
          color: '#010f07'
        }}>{name}</T>
        <C style={{
          flex: 3,
          fontSize: 12,
          fontWeight: '300',
          lineHeight: 24,
          letterSpacing: -0.4,
          color: '#4E4E4E'
        }}>{displayValue}</C>
      </View>
    )
  } else {
    return null
  }
}

const RecipeNutritionSectionMain = (props: any) => {
  const { ingredients } = props
  if (ingredients) {
    const nutritions = useSelector((state: AppState) => state.detail.allNutrition)
    return (
      <ListIngredientPriceContainer style={{flexDirection: 'column', marginVertical: 20}}>
        {
          nutritions && nutritions.map((i: any) => <RecipeNutritionItem key={i.name} nutrition={i} />)
        }
      </ListIngredientPriceContainer>
    )
  } else {
    return null
  } 
}

const RecipeNutritionSection = (props: any) => {
  const { name, ingredients } = props
  return (
    <View style={{
      flexDirection: 'column',
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 15,
      backgroundColor: '#E6F9F2',
      borderRadius: 12
    }}>
      <T style={{
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: -0.4,
        color: '#010f07',
        flex: 1
      }}>{name}</T>
      <RecipeNutritionSectionMain ingredients={ingredients} />
    </View>
  )
}

const ListIngredientPriceContainer = styled.View``

const Notice = () => {
  return (
    <Text
      style={{
        marginTop: 10,
        marginHorizontal: 10,
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: -0.4,
        color: '#010f07',
        marginBottom: 10
      }}>
      (Giá trị dinh dưỡng chỉ mang tính tương đối và dùng với mục đích tham khảo. Những chất không được liệt kê không có nghĩa là không tồn tại)
    </Text>
  )
}

const { width, height } = SIZES.window
const imageW = width * 0.7
const imageH = imageW * 0.7
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.8
const SPACING = 10
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2

const RecipeNutrition = () => {
  const dispatch = useDispatch()
  const recipe = useSelector((state: AppState) => state.detail.item)
  const { name, ingredients } = recipe
  const scrollX: any = React.useRef(new Animated.Value(0)).current

  if (recipe && ingredients) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={StyleSheet.absoluteFillObject}>
          {
            ingredients.map((ingredient: any, index: any) => {
              const inputRange = [
                (index-1) * width,
                index * width,
                (index+1) * width
              ]
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0]
              })
              return <Animated.Image 
                key={`image-${index}`}
                source={{uri: ingredient.url}}
                style={[StyleSheet.absoluteFillObject, { opacity }]}
                blurRadius={50}
              />
            })
          }
        </View>
        <ScrollView
          style={{ marginHorizontal: 20 }}
          showsVerticalScrollIndicator={false}>
          <TopHeader title="Tham khảo giá trị dinh dưỡng" />
          <Notice />
          <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={ingredients}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.9}
            snapToInterval={ITEM_SIZE}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true, listener: (event: any) => {
              let xOffset = event.nativeEvent.contentOffset.x
              let value: any = Math.round(xOffset / ITEM_SIZE)
              dispatch({ type: ACTIONS.DETAIL_SET_CURRENT_INGREDIENT_ID_SAGA, id: ingredients[value]['id'] })
            } })}
            renderItem={({ item, index }) => {
              if (!item.url) { return <View style={{ width: EMPTY_ITEM_SIZE }} /> }
              return (
                <View style={{ width: ITEM_SIZE }}>
                  <Animated.View style={{ marginHorizontal: SPACING, padding: SPACING, alignItems: 'center', backgroundColor: 'white', borderRadius: 34}}>
                    <Image source={{ uri: item.url }} style={styles.posterImage} />
                  </Animated.View>
                </View>
              )
            }}
          />
          <IngredientNutritionSection />
          <RecipeNutritionSection name={name} ingredients={ingredients} />
        </ScrollView>
      </SafeAreaView>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 0.6,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10
  }
});

export default RecipeNutrition
