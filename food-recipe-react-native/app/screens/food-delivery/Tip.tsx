import React from 'react'
import { View, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import { COLORS, FONTS } from 'app/constants'
import TopHeader from 'app/components/common/TopHeader'
import { useSelector } from 'react-redux'
import { AppState } from 'app/constants/types/state'
import { Ingredient } from 'app/constants/types/data'

const Instruction = (props: any) => {
  const { instruction } = props
  return (
    <Text
      style={{
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: -0.4,
        color: '#010f07',
        marginBottom: 10
      }}>
      {instruction}
    </Text>
  )
}

const BenefitItem = (props: any) => {
  const { description } = props

  const renderDescription = () => {
    if (description) { return <Text style={{ fontFamily: FONTS.POPPINS_MEDIUM, color: '#010f07', fontSize: 16}}>{description}</Text> }
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginBottom: 15,
          backgroundColor: '#E6F9F2',
          borderRadius: 12
        }}>
        { renderDescription() }
      </View>
    </View>
  )
}

export default (props: any) => {
  const { title, tips } = props.route.params
  const ingredient = useSelector((state: AppState) => state.detail.currentIngredient) as Ingredient

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden />
      <ScrollView
        style={{
          marginHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}>
        <TopHeader title={title} ingredientName={ingredient.name} />
        {tips && tips.map((i: any, index: any) => { if (i) { return <BenefitItem key={index} description={i.description} /> }})}
      </ScrollView>
    </SafeAreaView>
  )
}
