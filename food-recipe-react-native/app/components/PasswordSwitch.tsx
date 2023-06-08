import React from 'react'
import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'
import Feather from 'react-native-vector-icons/Feather'

import COLORS from 'app/utils/colors'

Feather.loadFont()

const PasswordSwitch = (props: any) => {
  return (
    <Feather
      size={20}
      color={COLORS.grey}
      style={styles.eyeIcon}
      onPress={props.onPress}
      name={props.isVisible ? 'eye' : 'eye-off'}
    />
  )
}

export default PasswordSwitch

const styles = StyleSheet.create({
  eyeIcon: {
    marginRight: scale(5)
  }
})
