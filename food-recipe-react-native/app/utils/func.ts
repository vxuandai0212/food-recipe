import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export const setHeight = (h: any) => (height / 100) * h

export const setWidth = (w: any) => (width / 100) * w

export function trimObject(source: any) {
  Object.keys(source).forEach(function (key) {
    source[key] = typeof source[key] === 'string' ? source[key].trim() : source[key]
  })
  return source
}

export function formatVndMoney(num: any, n: any, x: any, s: any, c: any) {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')'
  num = num.toFixed(Math.max(0, ~~n))

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','))
}
