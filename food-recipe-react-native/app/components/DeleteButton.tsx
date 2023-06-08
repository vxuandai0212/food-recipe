import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MaterilaIcons from 'react-native-vector-icons/MaterialIcons'

import COLORS from 'app/utils/colors'

const DeleteButton = ({ onDelete }: any) => {
  return (
    <TouchableOpacity onPress={onDelete}>
      <MaterilaIcons size={25} name="delete" color={COLORS.red} style={styles.deleteIcon} />
    </TouchableOpacity>
  )
}

export default DeleteButton

const styles = StyleSheet.create({
  deleteIcon: {
    marginTop: 20,
    marginHorizontal: 10
  }
})
