import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { FONTS } from 'app/constants'
import { IMAGES } from 'app/screens/food-delivery/constants'
import { setWidth, setHeight } from 'app/utils/func'

const WelcomeCard = ({ title, content, image }: any) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={IMAGES[image]} resizeMode="contain" />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: setWidth(100)
  },
  image: {
    height: setHeight(30),
    width: setWidth(60)
  },
  titleText: {
    fontSize: 22,
    fontFamily: FONTS.POPPINS_BOLD
  },
  contentText: {
    fontSize: 18,
    fontFamily: FONTS.POPPINS_LIGHT,
    textAlign: 'center',
    marginHorizontal: 20
  }
})

export default WelcomeCard
