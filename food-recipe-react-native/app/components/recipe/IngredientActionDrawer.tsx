import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'

import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import { Ad } from 'app/constants/icons'
import { forwardRef, useImperativeHandle } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from 'app/constants/types/screen'
import { useSelector } from 'react-redux'
import { Ingredient } from 'app/constants/types/data'
import { AppState } from 'app/constants/types/state'

export default forwardRef((props: any, ref: any) => {
  const ingredient = useSelector((state: AppState) => state.detail.currentIngredient) as Ingredient
  const benefits = useSelector((state: AppState) => state.detail.benefits)
  const warnings = useSelector((state: AppState) => state.detail.warnings)
  const selectTips = useSelector((state: AppState) => state.detail.selectTips)
  const preprocessTips = useSelector((state: AppState) => state.detail.preprocessTips)
  const preserveTips = useSelector((state: AppState) => state.detail.preserveTips)

  const navigation: any = useNavigation()

  const images: any = []
  if (ingredient && ingredient.url) {
    images.push(ingredient.url)
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Chi tiết thực phẩm</Text>
        <Text style={styles.panelSubtitle}>{ingredient && ingredient.name}</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={() => navigation.navigate(SCREEN.VIEW_IMAGE, { images })}>
        <Text style={styles.panelButtonTitle}>Xem toàn màn hình</Text>
      </TouchableOpacity>
      {
        benefits && benefits.length > 0 &&
        <TouchableOpacity style={{ ...styles.panelButton, flexDirection: 'row', justifyContent: 'center' }} onPress={() => navigation.navigate(SCREEN.INGREDIENT_BENEFIT)}>
          <Text style={styles.panelButtonTitle}>Lợi ích</Text>
          <Ad style={{ marginTop: 1, marginLeft: 5 }} width={24} height={24} fill="#982111" />
        </TouchableOpacity>
      }
      {
        warnings && warnings.length > 0 &&
        <TouchableOpacity style={{ ...styles.panelButton, flexDirection: 'row', justifyContent: 'center' }} onPress={() => navigation.navigate(SCREEN.INGREDIENT_WARNING)}>
          <Text style={styles.panelButtonTitle}>Lưu ý</Text>
          <Ad style={{ marginTop: 1, marginLeft: 5 }} width={24} height={24} fill="#982111" />
        </TouchableOpacity>
      }
      {
        selectTips && selectTips.length > 0 &&
        <TouchableOpacity style={{ ...styles.panelButton, flexDirection: 'row', justifyContent: 'center' }} onPress={() => navigation.navigate(SCREEN.TIP, {
          title: 'Mẹo lựa chọn',
          tips: selectTips
        })}>
          <Text style={styles.panelButtonTitle}>Mẹo lựa chọn</Text>
          <Ad style={{ marginTop: 1, marginLeft: 5 }} width={24} height={24} fill="#982111" />
        </TouchableOpacity>
      }
      {
        preprocessTips && preprocessTips.length > 0 &&
        <TouchableOpacity style={{ ...styles.panelButton, flexDirection: 'row', justifyContent: 'center' }} onPress={() => navigation.navigate(SCREEN.TIP, { 
          title: 'Mẹo sơ chế',
          tips: preprocessTips
        })}>
          <Text style={styles.panelButtonTitle}>Mẹo sơ chế</Text>
          <Ad style={{ marginTop: 1, marginLeft: 5 }} width={24} height={24} fill="#982111" />
        </TouchableOpacity>
      }
      {
        preserveTips && preserveTips.length > 0 &&
        <TouchableOpacity style={{ ...styles.panelButton, flexDirection: 'row', justifyContent: 'center' }} onPress={() => navigation.navigate(SCREEN.TIP, {
          title: 'Mẹo bảo quản',
          tips: preserveTips
        })}>
          <Text style={styles.panelButtonTitle}>Mẹo bảo quản</Text>
          <Ad style={{ marginTop: 1, marginLeft: 5 }} width={24} height={24} fill="#982111" />
        </TouchableOpacity>
      }
    </View>
  )

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  )

  useImperativeHandle(ref, () => ({
    openDrawer() {
      bs.current.snapTo(0)
    }
  }))

  const bs: any = React.createRef()
  const fall = new Animated.Value(1)

  const opacity: any = Animated.add(0.1, Animated.multiply(fall, 1.0))

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{ opacity: opacity }}>
        { props.children }
      </Animated.View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
})
