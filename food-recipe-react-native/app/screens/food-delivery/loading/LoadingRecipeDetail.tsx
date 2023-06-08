import React from 'react'
import { View, StyleSheet, StatusBar, Image } from 'react-native'
import { IMAGES } from 'app/constants/constants'

export default () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image source={IMAGES.PUSHEEN_BAKING} style={styles.video} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#CD6464'
  },
  video: {
    width: 300,
    height: 250
  }
})
