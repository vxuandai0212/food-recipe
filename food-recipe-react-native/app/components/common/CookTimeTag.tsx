import React from 'react'
import { View, Text } from 'react-native'
import { Clock, ActiveTabbar } from 'app/constants/icons'
import { FONTS } from 'app/constants'

export default ({ minute, showUnit = false }: any) => {
  const color = minute > 45 ? '#F1543F' : '#22A45D'
  return (
    <View style={{
      flexDirection: 'row'
    }}>
      <View style={{
        width: 25
      }}>
        <ActiveTabbar width={18} height={24} fill={color} />
        <Clock style={{top: 5, left: 5, position: 'absolute'}} width={20} height={20} fill={color} />
      </View>
      
      <Text style={{
        color,
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0.6,
        marginTop: 4
      }}>{ minute } { showUnit ? 'phút' : '' }</Text>
    </View>
  )
}
