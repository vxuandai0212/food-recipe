import { getFullName } from '@/utils/common.js'
describe('Utils:common', () => {
  it('getFullName', () => {
    expect(getFullName('pham', 'lam')).toBe('pham lam')
    expect(getFullName('pham', null)).toBe('pham')
    expect(getFullName(null, 'van')).toBe('van')
    expect(getFullName('pham', undefined)).toBe('pham')
    expect(getFullName(undefined, 'van')).toBe('van')
    expect(getFullName(undefined, undefined)).toBe('')
    expect(getFullName(null, null)).toBe('')
  })
})
