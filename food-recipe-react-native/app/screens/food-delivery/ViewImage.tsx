import React from 'react'
import { Modal } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import { AppState } from 'app/constants/types/state'

export default (props: any) => {
  const recipe = useSelector((state: AppState) => state.detail.item)
  let data: any = []
  if (recipe && recipe.thumbnails && recipe.thumbnails.length > 0) {
    data = recipe.thumbnails.map((i: any) => ({ url: i.url }))
  } else {
    data = [{ url: 'https://res.cloudinary.com/fit1501040028/image/upload/c_scale/bcae5bc7-ae5a-4e60-a2bc-02494a03e5b2' }]
  }
  const navigation: any = useNavigation()
  return (
    <Modal statusBarTranslucent visible={true} transparent={true}>
      <ImageViewer
        onCancel={() => navigation.goBack()}
        imageUrls={data}
        renderIndicator={() => <Text/>}
        enableSwipeDown={true}
      />
    </Modal>
  )
}
