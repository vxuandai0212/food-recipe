import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Back } from 'app/constants/icons'
import { useNavigation } from '@react-navigation/native'

export default (props: any) => {
  const navigation: any = useNavigation()
  const customStyle = props.customStyle
  const onPress = props.onPress
  const { buttonColor } = props
  return (
    <TouchableWithoutFeedback onPress={
        () => { 
          navigation.goBack()
          if (onPress) { onPress() }
        }
      }>
      <Back style={{ ...customStyle }} fill={buttonColor}/>
    </TouchableWithoutFeedback>
  )
}
