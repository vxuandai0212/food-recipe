import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { IMAGES } from 'app/constants/constants'
import { SIZES } from 'app/constants'
import { useSelector } from 'react-redux'
import { AppState } from 'app/constants/types/state'
import { OVERLAY_STATUS } from 'app/constants/types/enum'

const Overlay = () => {
  const overlay = useSelector((state: AppState) => state.ui.overlay)
  const image = overlay === OVERLAY_STATUS.LOADING ? IMAGES.USAGYUUUN_HAPPY : IMAGES.PUSHEEN_SAD
  return (
    <View style={styles.container} pointerEvents="auto">
      <Image source={image} resizeMode="contain" style={styles.image} />
      { overlay === OVERLAY_STATUS.FULL && <Text style={styles.text}>Không còn công thức nào</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: SIZES.window.width,
    height: SIZES.window.height,
    elevation: 2
  },
  image: {
    width: 300,
    height: 250
  },
  text: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0.14,
    color: 'white'
  }
})

export default Overlay
