import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { FONTS } from 'app/constants'
import { useDispatch, useSelector } from 'react-redux'
import * as ACTIONS from 'app/store/action-type'

export default (props: any) => {
  const customStyle: any = props.customStyle

  const dispatch = useDispatch()

  const searchKeyword = useSelector((state: any) => state.search.query.searchKeyword)
  const onChangeSearchKeyword = (data: any) => dispatch({ type: ACTIONS.SEARCH_SET_QUERY_SEARCH_KEYWORD, data })
  const onSubmitEditingSearchKeyword = () => {
    if (searchKeyword) {
      dispatch({ type: ACTIONS.SEARCH_SUBMIT })
    }
  }
  const placeholder = 'Bạn muốn nấu món gì?'

  return (
    <TextInput
      style={{...styles.searchContainer, ...customStyle}}
      onChangeText={onChangeSearchKeyword}
      onSubmitEditing={onSubmitEditingSearchKeyword}
      value={searchKeyword}
      placeholder={placeholder}
      keyboardType="default"
    />
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    height: 48,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#FBFBFB',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EBE4E4',
    borderRadius: 8,
    paddingLeft: 10,
    paddingBottom: 6,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    fontFamily: FONTS.POPPINS_REGULAR
  }
})
