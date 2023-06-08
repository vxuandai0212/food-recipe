import React from 'react'
import { FONTS } from 'app/constants'
import { Banner } from 'app/constants/icons'
import styled from 'styled-components/native'

const BannerContainer = styled.View`
  margin-bottom: 24px;
  margin-horizontal: 20px;
  padding-top: 20px;
  padding-left: 20px;
  height: 170px;
  background: #E6F9F2;
  border-radius: 12px;
  position: relative;
`

const BannerTitle = styled.Text`
  margin-bottom: 10px;
  font-family: ${FONTS.POPPINS_BOLD};
  font-size: 28px;
  line-height: 36px;
  letter-spacing: 0.18px;
  color: #010F07;
`
const BannerDescription = styled.Text`
  font-family: ${FONTS.POPPINS_REGULAR};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #010F07;
  opacity: 0.84;
`

export default (props: any) => {
  return (
    <BannerContainer style={{ ...props.customStyle }}>
      <BannerTitle>Free Delivery for {"\n"}1 Month!</BannerTitle>
      <BannerDescription>You've to order at least $10 for {"\n"}using free delivery for 1 month.</BannerDescription>
      <Banner style={{position: 'absolute', zIndex: 2, top: -80, right: -20}} />
    </BannerContainer>
  )
}
