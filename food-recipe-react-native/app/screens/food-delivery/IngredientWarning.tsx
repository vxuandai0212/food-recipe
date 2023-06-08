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

const WarningSectionTitle = (props: any) => {
  return <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 15 }}>{props.title}</Text>
}

const WarningSection = (props: any) => {
  const { title, warnings } = props
  if (warnings && warnings.length > 0) {
    return (
      <View>
        <WarningSectionTitle title={title} />
        {warnings.map((i: any, index: any) => {
          if (i) {
            const { title, description } = i
            return (
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    marginBottom: 15,
                    backgroundColor: '#E6F9F2',
                    borderRadius: 12
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTS.POPPINS_MEDIUM,
                      color: '#010f07',
                      fontSize: 16
                    }}>
                    {title}
                  </Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Instruction instruction={description} />
                </View>
              </View>
            )
          }
        })}
      </View>
    )
  } else {
    return null
  }
}

export default (props: any) => {
  const ingredient = useSelector((state: AppState) => state.detail.currentIngredient) as Ingredient
  const overuseWarnings = useSelector((state: AppState) => state.detail.overuseWarnings)
  const consumerWarnings = useSelector((state: AppState) => state.detail.consumerWarnings)
  const combineWarnings = useSelector((state: AppState) => state.detail.combineWarnings)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      <ScrollView
        style={{ marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}>
        <TopHeader title="Lưu ý" ingredientName={ingredient.name} />
        { overuseWarnings && overuseWarnings.length > 0 && <WarningSection title="Tác hại khi lạm dụng" warnings={overuseWarnings} /> }
        { consumerWarnings && consumerWarnings.length > 0 && <WarningSection title="Những đối tượng không nên dùng" warnings={consumerWarnings} /> }
        { combineWarnings && combineWarnings.length > 0 && <WarningSection title="Các thực phẩm không nên kết hợp" warnings={combineWarnings} /> }
      </ScrollView>
    </SafeAreaView>
  )
}
