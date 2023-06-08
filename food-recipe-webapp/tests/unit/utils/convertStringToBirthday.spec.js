import { convertStringToBirthday } from '@/utils/index'
describe('Utils:convertStringToBirthday', () => {
  const b = '18-06-1991'
  it('timestamp', () => {
    expect(convertStringToBirthday('18/06/1991')).toEqual(new Date(1991, 5, 18))
  })
  it('timestamp', () => {
    expect(convertStringToBirthday(b)).toEqual(new Date(1991, 5, 18))
  })
  it('timestamp', () => {
    expect(convertStringToBirthday('18-13-1900')).toBeNull()
  })
  it('timestamp', () => {
    expect(convertStringToBirthday('18-0-1900')).toBeNull()
  })
  it('timestamp', () => {
    expect(convertStringToBirthday('32-12-1900')).toBeNull()
  })
  it('timestamp', () => {
    expect(convertStringToBirthday('0-12-1900')).toBeNull()
  })
  it('timestamp', () => {
    expect(convertStringToBirthday('30-2-2020')).toEqual(new Date(2020, 2, 1))
  })
})
