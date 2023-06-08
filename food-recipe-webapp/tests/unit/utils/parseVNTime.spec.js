import { parseVNTime } from '@/utils/index.js'
describe('Utils:parseTime', () => {
  const d = new Date('2020-07-04 17:54:01') // "2018-07-13 17:54:01"
  it('timestamp', () => {
    expect(parseVNTime(d)).toBe('4/7/20 5:54PM')
  })
  it('timestamp', () => {
    expect(parseVNTime(d, '{d}/{m}/{y} {h}:{i}{a}', true)).toBe('04/07/20 05:54PM')
  })
  it('timestamp', () => {
    expect(parseVNTime(d, '{d}/{m}/{y} {h}:{i}{a}', true, true)).toBe('04/07/2020 05:54PM')
  })
  it('timestamp', () => {
    expect(parseVNTime(d, '{d}/{m}/{y} {h}:{i}{a},{w}', true, true)).toBe('04/07/2020 05:54PM,Thứ bảy')
  })
  it('timestamp', () => {
    expect(parseVNTime(null)).toBe(null)
  })
})
