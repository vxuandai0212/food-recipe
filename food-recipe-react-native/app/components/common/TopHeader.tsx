import React from 'react'
import { View, Text } from 'react-native'
import BackButton from 'app/components/common/BackButton'

export default (props: any) => {
  const { title, ingredientName } = props
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, justifyContent: 'center', marginTop: 25, marginBottom: 10 }}>
      <BackButton customStyle={{ position: 'absolute', left: 0 }} buttonColor="black" />
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700'
          }}>
          {title}
        </Text>
        { ingredientName && <Text style={{ fontSize: 14, color: 'gray', height: 30}}>{ingredientName}</Text> }
      </View>
    </View>
  )
}
