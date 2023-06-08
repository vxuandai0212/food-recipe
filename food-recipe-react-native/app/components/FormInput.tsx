import React, { useState } from 'react'
import { verticalScale } from 'react-native-size-matters'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import COLORS from 'app/utils/colors'
import PasswordSwitch from './PasswordSwitch'
import { removeSpaces } from 'app/utils/validation'

const FormInput = (props: any) => {
  const { active, touched, error } = props.meta

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const eyePressHandler = () => setIsPasswordVisible(prevState => !prevState)

  const isPasswordTogglerVisible = () =>
    props.secureField ? <PasswordSwitch isVisible={isPasswordVisible} onPress={eyePressHandler} /> : null

  const isErrorVisible = () => (touched && error ? <Text style={styles.errorText}>{error}</Text> : null)

  const formInputContainerStyle = {
    ...styles.formInputContainer,
    borderBottomColor: active ? COLORS.green : COLORS.grey
  }

  const textChangeHandler = (term: any) => {
    let value = !props.allowSpaces ? removeSpaces(term) : term
    props.input.onChange(value)
  }

  return (
    <View>
      <View style={formInputContainerStyle}>
        <TextInput
          {...props}
          ref={props.refField}
          style={styles.input}
          value={props.input.value}
          onBlur={props.input.onBlur}
          onFocus={props.input.onFocus}
          onChangeText={textChangeHandler}
          placeholderTextColor={COLORS.black}
          secureTextEntry={props.secureField && !isPasswordVisible}
        />
        {isPasswordTogglerVisible()}
      </View>
      {isErrorVisible()}
    </View>
  )
}

export default FormInput

const styles = StyleSheet.create({
  formInputContainer: {
    marginTop: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    flex: 1,
    color: COLORS.black,
    fontSize: verticalScale(14)
  },
  errorText: {
    color: COLORS.red
  }
})
