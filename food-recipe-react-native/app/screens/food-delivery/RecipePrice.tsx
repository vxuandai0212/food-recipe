import React from 'react'
import { StyleSheet, StatusBar, SafeAreaView, ScrollView, Text, View, Image, Animated, Platform } from 'react-native'
import { T, H, C, P } from 'app/components/common'
import styled from 'styled-components/native'
import { useSelector } from 'react-redux'
import { AppState } from 'app/constants/types/state'
import { formatVndMoney } from 'app/utils/func'
import { FONTS, SIZES } from 'app/constants'
import TopHeader from 'app/components/common/TopHeader'

const IngredientPriceContainer = styled.View``
const IngredientPriceItemContainer = styled.View``

const IngredientPriceItem = (props: any) => {
  const { label, value, customStyle, opacity } = props

  return (
    <IngredientPriceItemContainer style={{...customStyle, flexDirection: 'row', justifyContent: 'space-between'}}>
      <Animated.Text style={{
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: -0.4,
        color: '#010f07',
        flex: 1,
        opacity
      }}>{label}</Animated.Text>
      <Animated.Text style={{
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: -0.4,
        color: '#4E4E4E',
        flex: 1,
        opacity
      }}>{value}</Animated.Text>
    </IngredientPriceItemContainer>
  )
}

const IngredientPriceSection = (props: any) => {
  const opacity = props.opacity
  const { quantity, displayQuantity, displayQuantityUnit, price, displayPrice, displayPriceUnit } = props.ingredient
  const total = price*quantity
  return (
    <IngredientPriceContainer style={{flexDirection: 'column', marginTop: 20, marginHorizontal: 10}}>
      <IngredientPriceItem opacity={opacity} customStyle={{height: 50}} label="Khối lượng" value={displayQuantity.concat(' ').concat(displayQuantityUnit)} />
      <IngredientPriceItem opacity={opacity} customStyle={{height: 50}} label="Giá" value={displayPrice.concat('/').concat(displayPriceUnit)} />
      <IngredientPriceItem opacity={opacity} customStyle={{height: 50}} label="Thành tiền" value={formatVndMoney(total, 0, 3, '.', ',').concat(' VNĐ')} />
    </IngredientPriceContainer>
  )
}

const RecipePriceContainer = styled.View``
const IngredientPriceSummary = styled.View``

const RecipePriceTotal = (props: any) => {
  const { ingredients } = props
  let totalPrice = 0
  ingredients.map((ingredient: any) => {
    const { quantity, price } = ingredient
    totalPrice = totalPrice + quantity * price
  })
  return (
    <IngredientPriceSummary style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
      <T style={{
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: -0.4,
        color: '#010f07',
        marginRight: 50
      }}>Tổng</T>
      <C style={{
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: -0.4,
        color: '#4E4E4E'
      }}>{formatVndMoney(totalPrice, 0, 3, '.', ',').concat(' VNĐ')}</C>
    </IngredientPriceSummary>
  )
}

const ListIngredientPriceContainer = styled.View``
const ListIngredientPriceItemContainer = styled.View``
const ListIngredientPriceItemMain = styled.View``
const ListIngredinetPriceItem = (props: any) => {
  const { name, quantity, displayQuantity, displayQuantityUnit, price } = props.ingredient
  return (
    <ListIngredientPriceItemMain style={{flexDirection: 'row'}}>
      <T style={{
        flex: 4,
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: -0.4,
        color: '#010f07'
      }}>{name}</T>
      <C style={{
        flex: 4,
        fontSize: 12,
        fontWeight: '300',
        lineHeight: 24,
        letterSpacing: -0.4,
        color: '#4E4E4E'
      }}>{displayQuantity.concat(' ').concat(displayQuantityUnit)}</C>
      <C style={{
        flex: 2,
        fontSize: 12,
        fontWeight: '300',
        lineHeight: 24,
        letterSpacing: -0.4,
        color: '#4E4E4E'
      }}>{formatVndMoney(quantity * price, 0, 3, '.', ',').concat(' VNĐ')}</C>
    </ListIngredientPriceItemMain>
  )
}

const ListIngredientPrice = (props: any) => {
  const { ingredients } = props
  return (
    <ListIngredientPriceContainer style={{flexDirection: 'column', marginVertical: 20}}>
      {
        ingredients.map((ingredient: any) => (
          <ListIngredientPriceItemContainer key={ingredient.id} style={{flex: 1}}>
            <ListIngredinetPriceItem ingredient={ingredient} />
          </ListIngredientPriceItemContainer>
        ))
      }
    </ListIngredientPriceContainer>
  )
}

const RecipePriceSection = (props: any) => {
  const { name, ingredients } = props
  return (
    <RecipePriceContainer style={{
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
      <ListIngredientPrice ingredients={ingredients} />
      <RecipePriceTotal ingredients={ingredients} />
    </RecipePriceContainer>
  )
}

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
      (Giá cả chỉ mang tính tương đối và dùng với mục đích tham khảo)
    </Text>
  )
}

const { width, height } = SIZES.window
const imageW = width * 0.7
const imageH = imageW * 0.7
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.8
const SPACING = 10
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2

const RecipePrice = () => {
  const recipe = useSelector((state: AppState) => state.detail.item)
  const { name, ingredients } = recipe
  const scrollX = React.useRef(new Animated.Value(0)).current

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
          <TopHeader title="Tham khảo giá" />
          <Notice />
          <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={ingredients}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.9}
            snapToInterval={ITEM_SIZE}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
            renderItem={({ item, index }) => {
              const inputRange = [ (index-1) * ITEM_SIZE, index * ITEM_SIZE, (index+1) * ITEM_SIZE]
              const opacity = scrollX.interpolate({inputRange, outputRange: [0, 1, 0]})
              if (!item.url) { return <View style={{ width: EMPTY_ITEM_SIZE }} /> }
              return (
                <View style={{ width: ITEM_SIZE }}>
                  <Animated.View style={{ marginHorizontal: SPACING, padding: SPACING, alignItems: 'center', backgroundColor: 'white',borderRadius: 34}}>
                    <Image source={{ uri: item.url }} style={styles.posterImage} />
                  </Animated.View>
                  <IngredientPriceSection opacity={opacity} ingredient={item} />
                </View>
              )
            }}
          />
          <RecipePriceSection name={name} ingredients={ingredients} />
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

export default RecipePrice
