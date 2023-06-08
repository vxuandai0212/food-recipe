import React, { useState } from 'react'
import { TouchableOpacity, Animated, StyleSheet, Easing, Text } from 'react-native'
import { COLORS } from 'app/constants'

const containerStyle: any = (size: any, isActive: any) => ({
  backgroundColor: isActive ? COLORS.DEFAULT_GREEN : COLORS.DEFAULT_GREY,
  height: 32 * size,
  width: 64 * size,
  borderRadius: 32,
  padding: 4 * size
})

const toggleStyle: any = (size: any, animatedValue: any) => ({
  height: 24 * size,
  width: 24 * size,
  backgroundColor: COLORS.DEFAULT_WHITE,
  borderRadius: 32,
  transform: [
    {
      translateX: animatedValue
    }
  ]
})

const ToggleButton = ({ size }: any) => {
  const [isActive, setIsActive] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))

  const toggleHandle = () => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 0 : 32 * size,
      duration: 250,
      easing: Easing.bounce,
      delay: 0,
      useNativeDriver: true
    }).start()
    setIsActive(!isActive)
  }

  return (
    <TouchableOpacity style={containerStyle(size, isActive)} onPress={() => toggleHandle()} activeOpacity={0.8}>
      <Animated.View style={toggleStyle(size, animatedValue)} />
    </TouchableOpacity>
  )
}

export default ToggleButton
