import React from 'react'
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native'
import { COLORS, FONTS } from 'app/constants'
import { IMAGES } from 'app/constants/constants'
import { setWidth, setHeight } from 'app/utils/func'

const SplashScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image source={IMAGES.PLATE} resizeMode="contain" style={styles.image} />
      <Text style={styles.titleText}>Yummy</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DEFAULT_GREEN
  },
  image: {
    height: setHeight(30),
    width: setWidth(60)
  },
  titleText: {
    color: COLORS.DEFAULT_WHITE,
    fontSize: 32,
    fontFamily: FONTS.POPPINS_LIGHT
  }
})

export default SplashScreen
