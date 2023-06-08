
/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
export function lowerCaseAll(string) {
  return string.toLowerCase()
}

import { AUDIENCE } from '@/utils/constant'
export function statusName(status) {
  const statusMap = new Map([
    [AUDIENCE.STATUS_SUB_CODE, AUDIENCE.STATUS_SUB],
    [AUDIENCE.STATUS_CANCEL_SUB_CODE, AUDIENCE.STATUS_CANCEL_SUB],
    [AUDIENCE.STATUS_NOT_SUB_CODE, AUDIENCE.STATUS_NOT_SUB],
    [AUDIENCE.STATUS_ARCHIVED_CODE, AUDIENCE.STATUS_ARCHIVED]])
  return statusMap.get(status)
}

export function contactImportTypeName(type) {
  const importTypeMap = new Map([
    [AUDIENCE.IMPORT_FIRST_CODE, AUDIENCE.IMPORT_FIRST_CHOICE],
    [AUDIENCE.IMPORT_SECOND_CODE, AUDIENCE.IMPORT_SECOND_CHOICE]
  ])
  return importTypeMap.get(type)
}

// export const contactFieldMap = new Map([
//   ['email', AUDIENCE.EMAIL_ADDRESS],
//   ['firstName', AUDIENCE.FIRSTNAME],
//   ['lastName', AUDIENCE.LASTNAME],
//   ['tagsName', AUDIENCE.TAGS],
//   ['street', AUDIENCE.STREET],
//   ['district', AUDIENCE.DISTRICT_TOWN],
//   ['province', AUDIENCE.PROVINCE_CITY],
//   ['code', AUDIENCE.PORTAL_ZIP],
//   ['country', AUDIENCE.COUNTRY],
//   ['phone', AUDIENCE.PHONE_NUMBER],
//   ['birthday', AUDIENCE.BIRTHDAY],
//   ['ipAddress', AUDIENCE.IP_ADDRESS],
//   ['language', AUDIENCE.LANGUAGE],
//   ['status', AUDIENCE.STATUS],
//   ['source', AUDIENCE.SOURCE],
//   ['rate', AUDIENCE.CONTACT_QUALITY],
//   ['createdAt', AUDIENCE.CREATED_AT],
//   ['updatedAt', AUDIENCE.UPDATED_AT],
//   ['fullName', AUDIENCE.CONTACT_NAME],
//   ['address', AUDIENCE.ADDRESS],
//   ['listTags', AUDIENCE.TAGS],
//   ['isVip', 'VIP'],
//   ['lstNotes', AUDIENCE.NOTE],
//   ['createdBy', AUDIENCE.CREATED_BY],
//   ['updatedBy', AUDIENCE.UPDATED_BY],
//   ['employeeCode', AUDIENCE.EMPLOYEE_CODE],
//   ['fullname', AUDIENCE.FULLNAME]
// ])

// export function importColumnName(field) {
//   if (!field) return ''
//   return contactFieldMap.get(field)
// }

