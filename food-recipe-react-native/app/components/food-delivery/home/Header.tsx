import React from 'react'
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import styled from 'styled-components/native'
import { COLORS, FONTS, COUNTRY_CODE } from 'app/constants'
import { SIZES } from 'app/constants'
import { DownArrow } from 'app/constants/icons'

const Container = styled.View`
  height: ${Platform.OS === 'ios' ? 65 : 114}px;
  width: ${SIZES.window.width};
  border-bottom-color: #e1e1e1;
  border-bottom-width: 0.5;
`

const DeliveryTo = styled.Text`
  margin-top: ${Platform.OS === 'ios' ? 5 : 54}px;
  margin-bottom: 2px;
  height: 20px;
  text-align: center;
  font-family: ${FONTS.POPPINS_REGULAR};
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: #22a45d;
`

const FilterContainter = styled.View`
  position: relative;
`

const Location = styled.Text`
  height: 26px;
  text-align: center;
  font-family: ${FONTS.POPPINS_MEDIUM};
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.488889px;
  color: #010f07;
  position: relative;
`
const Filter = styled.Text`
  height: 24px;
  font-family: ${FONTS.POPPINS_REGULAR};
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  letter-spacing: -0.4px;
  color: #010f07;
  position: absolute;
  bottom: 13px;
  right: 20px;
`

const Header = () => {
  return (
    <Container>
      <DeliveryTo>delivery to</DeliveryTo>
      <FilterContainter>
        <TouchableOpacity>
          <Location>San Francisco <DownArrow width={18} height={18} /></Location>
        </TouchableOpacity>
        <Filter>Filter</Filter>
      </FilterContainter>
    </Container>
  )
}

export default Header
