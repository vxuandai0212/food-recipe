export class ExportDataFactory {
  static createContactExportData(type, contact) {
    switch (type) {
      case AUDIENCE_TYPE.PERSONAL_SMS:
        return new ContactPhoneExportData(contact);
      case AUDIENCE_TYPE.PERSONAL_EMAIL:
        return new ContactEmailExportData(contact);
      case AUDIENCE_TYPE.PERSONAL_FCM:
        return new ContactFcmExportData(contact);
      case AUDIENCE_TYPE.BUSINESS:
        return new ContactBusinessExportData(contact);
    }
    return null;
  }
}

export function createSuccessNotify(callback, action, field) {
  action = action.replace(/^\w/, c => c.toUpperCase())
  callback.$notify({
    title: 'Thành công',
    message: `${action} ${field} thành công`,
    type: 'success',
    duration: 2000,
    position: 'bottom-right'
  })
}

export const randomPassword = () => Math.random().toString(36).slice(-8)

import {
  ContactBusinessExportData,
  ContactEmailExportData,
  ContactFcmExportData,
  ContactPhoneExportData,
  MessageFailExportData,
  MediaTrackExportData,
  EmailStatusExportData,
  PosDebtExportData,
  PosDebtExportSummary,
  ClientDebtExportSummary,
  ClientDebtExportData
} from '@/types/common-type';
import XLSX from 'xlsx';
import { exportExcelFromWorkSheets } from '@/vendor/Export2Excel';
import { AUDIENCE_TYPE } from './constants/audience';
import { CARD_TYPE_VALUE } from './constants/common'

export function exportContact(contactList, fileName, audienceType) {
  const exportData = contactList.map(contact =>
    ExportDataFactory.createContactExportData(audienceType, contact));
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const contactWorkbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(contactWorkbook, worksheet, 'Danh sách thuê bao');
  exportExcelFromWorkSheets({ workbook: contactWorkbook, filename: fileName });
}

export function exportFailMessage(messageList, applications, filename) {
  try {
    const exportData = messageList.map(message => new MessageFailExportData(message, applications));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách');
    exportExcelFromWorkSheets({ workbook: workbook, filename: filename });
  } catch (error) {
    console.log(error)
  }
}

export function exportMediaTrack(mediaTrack, filename) {
  try {
    const exportData = mediaTrack.map(track => new MediaTrackExportData(track));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách');
    exportExcelFromWorkSheets({ workbook, filename });
  } catch (error) {
    console.log(error)
  }
}

/**
 * Hàm export trạng thái active của email
 * @param lstDataExport
 */
export function exportEmailStatus(lstDataExport, filename) {
  try {
    const exportData = lstDataExport.map(emailStatus => new EmailStatusExportData(emailStatus));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách');
    exportExcelFromWorkSheets({ workbook, filename });
  } catch (error) {
    console.log(error)
  }
}

export function exportPosDebt(lstDataExport) {
  try {
    let totalMatureAmount = 0
    let totalMatureFee = 0
    if (lstDataExport && lstDataExport.length > 0) {
      for (let j = 0; j < lstDataExport.length; j++) {
        const log = lstDataExport[j]
        const { matureAmount, matureFeeRate } = log
        totalMatureAmount += matureAmount
        totalMatureFee += matureAmount * (matureFeeRate / 100)
      }
    }
    const exportSummary = [new PosDebtExportSummary(totalMatureAmount, totalMatureFee)]
    const sheetSummary = XLSX.utils.json_to_sheet(exportSummary)
    const exportData = lstDataExport.map(item => new PosDebtExportData(item))
    const sheetData = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, sheetSummary, 'Tổng hợp')
    XLSX.utils.book_append_sheet(workbook, sheetData, 'Chi tiết')
    exportExcelFromWorkSheets({ workbook, filename: 'Báo cáo POS' })
  } catch (error) {
    console.log(error)
  }
}

export function exportClientDebt(lstDataExport, totalMatureAmount, totalAlreadyMatureAmount,
  totalRemainMatureAmount, totalCustomerFee, totalCustomerAlreadyPaid, totalCustomerFeeRemain) {
  try {
    const exportSummary = [new ClientDebtExportSummary(totalMatureAmount, totalAlreadyMatureAmount,
      totalRemainMatureAmount, totalCustomerFee, totalCustomerAlreadyPaid, totalCustomerFeeRemain)]
    const sheetSummary = XLSX.utils.json_to_sheet(exportSummary)
    const exportData = lstDataExport.map(item => new ClientDebtExportData(item))
    const sheetData = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, sheetSummary, 'Tổng hợp')
    XLSX.utils.book_append_sheet(workbook, sheetData, 'Chi tiết')
    exportExcelFromWorkSheets({ workbook, filename: 'Báo cáo khách hàng' })
  } catch (error) {
    console.log(error)
  }
}

export function convertBreakLine(input) {
  return input.replace(/\n/g, '<br/>')
}

export class Role {
  constructor(field, fieldCode, action) {
    this.field = field
    this.fieldCode = fieldCode
    this.action = action
  }
  static getRoleFromRawRole(rawRole) {
    const rawRoleParts = rawRole.split('.')
    if (rawRoleParts) {
      const field = rawRoleParts[1] || null
      const fieldCode = rawRoleParts[2] || null
      const action = rawRoleParts[3] || null
      return new Role(field, fieldCode, action)
    }
  }
}

/**
 *
{d} Day of the month as a numeric value (01 to 31)
{D} Day of the month as a numeric value (0 to 31)
{H} Hour (00 to 23)
{h} Hour (00 to 11)
{I} Minutes (0 to 59)
{i} Minutes (00 to 59)
{k} Hour (0 to 23)
{l} Hour (00 to 11)
{g} Month name in full (January to December)
{m} Month name as a numeric value (00 to 12)
{M} Month name as a numeric value (0 to 12)
{p} AM or PM
{S} Seconds (0 to 59)
{s} Seconds (00 to 59)
{w} Weekday name in full (Sunday to Saturday, Sunday=0 and Saturday=6)
{Y} Year as a numeric, 4-digit value
{y} Year as a numeric, 2-digit value
 * parse time to string
 * @param {Date} timeInput
 * @param {string} format
 * @returns {string}
 */
export function parseTime(timeInput, format) {
  if (arguments.length === 0 || !timeInput) {
    return null
  }
  let time
  if (typeof timeInput === 'object') {
    time = timeInput
  } else {
    return null
  }
  const formatObj = {
    d: time.getDate().toString().padStart(2, 0),
    D: time.getDate().toString(),
    m: (time.getMonth() + 1).toString().padStart(2, 0),
    M: (time.getMonth() + 1).toString(),
    g: (time.getMonth() + 1).toString(),
    y: (time.getFullYear() % 100).toString().padStart(2, 0),
    Y: time.getFullYear().toString(),
    H: time.getHours().toString().padStart(2, 0),
    h: time.getHours() < 12 ? time.getHours() : time.getHours() - 12,
    l: time.getHours() < 12 ? time.getHours().toString().padStart(2, 0) : (time.getHours() - 12).toString().padStart(2, 0),
    k: time.getHours().toString(),
    i: time.getMinutes().toString().padStart(2, 0),
    I: time.getMinutes().toString(),
    s: time.getSeconds().toString().padStart(2, 0),
    S: time.getSeconds().toString(),
    w: time.getDay().toString(),
    p: time.getHours() < 12 ? 'AM' : 'PM'
  }
  const timeStr = format.replace(/{([dmMyYHiIsSDkghlwp])+}/g, (result, key) => {
    if (key === 'g') {
      const monthMap = new Map([
        ['1', 'January'], ['2', 'February'], ['3', 'March'], ['4', 'April'], ['5', 'May'], ['6', 'June'],
        ['7', 'July'], ['8', 'August'], ['9', 'September'], ['10', 'October'], ['11', 'November'], ['12', 'December']
      ])
      return monthMap.get(formatObj[key])
    }
    if (key === 'w') {
      const weekdayMap = new Map([
        ['0', 'thứ bảy'], ['1', 'thứ hai'], ['2', 'thứ ba'], ['3', 'thứ tư'], ['4', 'thứ năm'],
        ['5', 'thứ sáu'], ['6', 'thứ bảy']
      ])
      return weekdayMap.get(formatObj[key])
    }
    return formatObj[key]
  })
  return timeStr
}

export function formatCardNumber(value) {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || ''
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join('-')
  } else {
    return value
  }
}

export function formatVndMoney(value) {
  return `${value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`
}

export const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const getCardType = (number) => {
  let re = new RegExp('^4')

  if (number.match(re) != null) {
    return CARD_TYPE_VALUE.VISA
  }

  if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) {
    return CARD_TYPE_VALUE.MASTER
  }

  re = new RegExp('^35(2[89]|[3-8][0-9])')
  if (number.match(re) != null) {
    return CARD_TYPE_VALUE.JCB
  }

  return CARD_TYPE_VALUE.NAPAS
}
