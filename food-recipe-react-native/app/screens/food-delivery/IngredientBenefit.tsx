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
  const { benefit } = props
  const { title, description } = benefit

  const renderTitle = () => {
    if (title) { return <Text style={{ fontFamily: FONTS.POPPINS_MEDIUM, color: '#010f07', fontSize: 16}}>{title}</Text> }
  }

  const renderDescription = () => {
    if (description) { return (
      <View style={{ flexDirection: 'column' }}><Instruction instruction={description} /></View> 
    )}
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
        { renderTitle() }
      </View>
      { renderDescription() }
    </View>
  )
}

export default (props: any) => {
  const ingredient = useSelector((state: AppState) => state.detail.currentIngredient) as Ingredient
  const benefits = useSelector((state: AppState) => state.detail.benefits)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden />
      <ScrollView
        style={{
          marginHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}>
        <TopHeader title="Lợi ích" ingredientName={ingredient.name} />
        {benefits && benefits.map((i, index) => { if (i) { return <BenefitItem key={index} benefit={i} /> }})}
      </ScrollView>
    </SafeAreaView>
  )
}
