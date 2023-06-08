import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { COLORS, FONTS } from 'app/constants'
import { setWidth, setHeight } from 'app/utils/func'

const ConnectionError = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.DEFAULT_GREEN} translucent />
      <Text style={styles.titleText}>Không thể tải nội dung. Vui lòng kiểm tra lại kết nối mạng của bạn</Text>
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

export default ConnectionError
