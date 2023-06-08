import { validUsername, validURL, validLowerCase, validUpperCase, validAlphabets, validEmail2, validNormalCharWithVietnamese } from '@/utils/validate.js'
describe('Utils:validate', () => {
  it('validUsername', () => {
    expect(validUsername('admin')).toBe(true)
    expect(validUsername('editor')).toBe(true)
    expect(validUsername('xxxx')).toBe(false)
  })
  it('validURL', () => {
    expect(validURL('https://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(validURL('http://github.com/PanJiaChen/vue-element-admin')).toBe(true)
    expect(validURL('github.com/PanJiaChen/vue-element-admin')).toBe(false)
  })
  it('validLowerCase', () => {
    expect(validLowerCase('abc')).toBe(true)
    expect(validLowerCase('Abc')).toBe(false)
    expect(validLowerCase('123abc')).toBe(false)
  })
  it('validUpperCase', () => {
    expect(validUpperCase('ABC')).toBe(true)
    expect(validUpperCase('Abc')).toBe(false)
    expect(validUpperCase('123ABC')).toBe(false)
  })
  it('validAlphabets', () => {
    expect(validAlphabets('ABC')).toBe(true)
    expect(validAlphabets('Abc')).toBe(true)
    expect(validAlphabets('123aBC')).toBe(false)
  })
  it('validEmail2', () => {
    expect(validEmail2('mysite@ourearth.com')).toBe(true)
    expect(validEmail2('my.ownsite@ourearth.org')).toBe(true)
    expect(validEmail2('mysite@you.me.net')).toBe(true)
    expect(validEmail2('mysite.ourearth.com')).toBe(false)
    expect(validEmail2('mysite@.com.my')).toBe(false)
    expect(validEmail2('@you.me.net')).toBe(false)
    expect(validEmail2('mysite123@gmail.b')).toBe(false)
    expect(validEmail2('mysite@.org.org')).toBe(false)
    expect(validEmail2('.mysite@mysite.org')).toBe(false)
    expect(validEmail2('mysite()*@gmail.com')).toBe(false)
    expect(validEmail2('mysite.ourearth.com')).toBe(false)
    expect(validEmail2('mysite.ourearth.com')).toBe(false)
    expect(validEmail2('mysite.ourearth.com')).toBe(false)
    expect(validEmail2('flksjfkldsfklsjflsdjfslkjfsl2312kjfslkjfslkjfslkfjlksjflksdjdflksjfsd@lkjksljfsdlkfjdsdlkfs.kddf.kdf')).toBe(true)
  })
  it('validNormalCharWithVietnamese', () => {
    expect(validNormalCharWithVietnamese('0123456789_-Thở oxy hay dùng máy thở chỉ là hai trong số các lựa chọn hỗ trợ sự sống ở khu vực điều trị tích cực và điều quan trọng là việc chuyển bệnh nhân vào ICU không phải phương pháp chữa Covid-19 Trong lúc chưa có thuốc đặc trị chống lại nCoV đây chỉ là cách bác sĩ chăm sóc hỗ trợ bệnh nhân')).toBe(true)
  })
  it('validNormalCharWithVietnamese', () => {
    expect(validNormalCharWithVietnamese('!@#$%^&*()~')).toBe(false)
  })
})
