import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { SCREEN } from 'app/constants/types/screen'
import { FONTS, SIZES } from 'app/constants'
import CookTimeTag from 'app/components/common/CookTimeTag'
import styled from 'styled-components/native'
import { IMAGES } from 'app/constants/constants'
import { useDispatch } from 'react-redux'
import * as ACTIONS from 'app/store/action-type'

const RestaurantTitle = styled.Text`
  font-family: ${FONTS.POPPINS_BOLD};
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.444444px;
  color: #010F07;
  margin-bottom: 4px;
`

export default (props: any) => {
  const navigation: any = useNavigation()
  const dispatch = useDispatch()
  const { id, name, cookTime, imageUrl } = props.item
  const renderImage = () => {
    if (imageUrl) {
      return <Image source={{ uri: imageUrl }} style={{...styles.headerImage }} />
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
          { renderImage() }
        </TouchableWithoutFeedback>
      <View style={{ position: 'absolute', right: 7, top: 153 }}>
        <CookTimeTag minute={cookTime} />
      </View>
      <RestaurantTitle style={{marginTop: 16}}>{name}</RestaurantTitle>
    </View>
  )
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
  }
})
