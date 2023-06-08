import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, verticalScale } from 'react-native-size-matters'

Ionicons.loadFont()

const Header = ({ goBack, title }: any) => {
  return (
    <View style={styles.header}>
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={goBack} hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}>
          <Ionicons name="arrow-back" size={moderateScale(30)} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10)
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -moderateScale(30)
  },
  title: {
    fontSize: verticalScale(20)
  },
  backBtn: {
    width: 150,
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 15,
    padding: 5
  }
})
