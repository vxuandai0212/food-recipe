import moment from 'moment'
import { CARD_TYPE_MAP } from '@/utils/constants/common'

/** @class */
export class Role {
  constructor() {
    this.applicationId = null
    this.isOwner = null
  }
}

/** @class */
export class Pagination {
  constructor() {
    this.page = null;
    this.limit = null;
  }
}

/** @class */
export class BaseQuery {
  constructor() {
    this.page = null;
    this.limit = null;
    this.strSearch = '';
  }
}

import { parseTime } from '@/utils/common';
export class ContactExportData {
  constructor(contact) {
    this['Địa chỉ email'] = contact.email;
    this['Tags'] = convertTagsToString(contact.tags);
    this['Địa chỉ'] = contact.address;
    this['Số điện thoại'] = contact.phone;
    this['Ngày sinh'] = contact.birthday ? parseTime(new Date(contact.birthday), '{d}/{m}/{Y}') : '';
    this['Họ và tên'] = contact.fullname;
    this['Mã nhân viên'] = contact.employeeCode;
  }
}
/**
   * @param {{name: string}[]} tags
   * @returns {string}
   */
function convertTagsToString(tags) {
  if (!tags) {
    return '';
  }
  const tagNames = tags.map(tag => tag.name);
  return tagNames.join('|');
}

export class MessageFailExportData {
  constructor(message, applications) {
    const { applicationId, featureName, sentAt, errorCode, errorMessage, title, receiver } = message
    this['Thời gian gửi'] = moment(sentAt).format('DD-MM-Y HH:mm:ss')
    this['Ứng dụng'] = applications[applicationId].appName
    this['Loại tin'] = featureName
    this['Mã lỗi'] = errorCode
    this['Chi tiết lỗi'] = errorMessage
    this['Tiêu đề'] = title
    this['Người nhận'] = receiver
  }
}

export class MediaTrackExportData {
  constructor(track) {
    const { sentAt, appName, type, subject, totalReceiver, openReceiver, interactReceiver } = track
    this['Thời gian gửi'] = moment(sentAt).format('DD-MM-Y HH:mm:ss')
    this['Ứng dụng'] = appName
    this['Loại track'] = type
    this['Tiêu đề'] = subject
    this['Tổng số người nhận'] = totalReceiver
    this['Tổng số người mở'] = openReceiver
    this['Tỉ lệ mở'] = openReceiver && totalReceiver ? (openReceiver / totalReceiver) * 100 : 0
    this['Tổng số người tương tác'] = interactReceiver
    this['Tỉ lệ tương tác'] = interactReceiver && totalReceiver ? (interactReceiver / totalReceiver) * 100 : 0
  }
}

export class ContactPhoneExportData {
  constructor(contact) {
    this['Địa chỉ email'] = contact.email;
    this['Tags'] = convertTagsToString(contact.tags);
    this['Địa chỉ'] = contact.address;
    this['Số điện thoại'] = contact.phone;
    this['Ngày sinh'] = contact.birthday ? parseTime(new Date(contact.birthday), '{d}/{m}/{Y}') : '';
    this['Họ và tên'] = contact.fullname;
    this['Mã nhân viên'] = contact.employeeCode;
  }
}

export class ContactEmailExportData {
  constructor(contact) {
    this['Địa chỉ email'] = contact.email;
    this['Tags'] = convertTagsToString(contact.tags);
    this['Địa chỉ'] = contact.address;
    this['Số điện thoại'] = contact.phone;
    this['Ngày sinh'] = contact.birthday ? parseTime(new Date(contact.birthday), '{d}/{m}/{Y}') : '';
    this['Họ và tên'] = contact.fullname;
    this['Mã nhân viên'] = contact.employeeCode;
  }
}

export class ContactFcmExportData {
  constructor(contact) {
    this['Địa chỉ email'] = contact.email;
    this['Tags'] = convertTagsToString(contact.tags);
    this['Địa chỉ'] = contact.address;
    this['Số điện thoại'] = contact.phone;
    this['Ngày sinh'] = contact.birthday ? parseTime(new Date(contact.birthday), '{d}/{m}/{Y}') : '';
    this['Họ và tên'] = contact.fullname;
    this['Mã nhân viên'] = contact.employeeCode;
    this['Firebase key'] = contact.firebaseKey;
    this['Token'] = contact.token;
  }
}

export class ContactBusinessExportData {
  constructor(contact) {
    this['Địa chỉ email'] = contact.email;
    this['Tags'] = convertTagsToString(contact.tags);
    this['Địa chỉ'] = contact.address;
    this['Số điện thoại'] = contact.phone;
    this['Ngày sinh'] = contact.birthday ? parseTime(new Date(contact.birthday), '{d}/{m}/{Y}') : '';
    this['Họ và tên'] = contact.fullname;
    this['Mã nhân viên'] = contact.employeeCode;
    this['Ứng dụng firebase'] = 'not yet handle'
  }
}

// D2T start
export class EmailStatusExportData {
  constructor(data) {
    this['Địa chỉ email'] = data.email;
    this['Trạng thái'] = data.statusName;
    this['Ngày kiểm tra cuối'] = data.lastCheckTimeStr;
  }
}
// D2T end

export class PosDebtExportData {
  constructor(transaction) {
    const { createdAt, createdBy, matureAmount, matureFeeRate, cardNumber } = transaction
    this['Thời gian'] = createdAt ? moment(createdAt).format('DD-MM-Y HH:mm:ss') : createdAt
    this['Số tiền'] = matureAmount
    this['Phí (%)'] = matureFeeRate
    this['Thành tiền'] = matureAmount * (matureFeeRate / 100)
    this['Thẻ nhận'] = cardNumber
    this['Người thực hiện'] = createdBy
  }
}

export class PosDebtExportSummary {
  constructor(totalMatureAmount, totalMatureFee) {
    this['Tổng số tiền đáo'] = totalMatureAmount
    this['Tổng số tiền phí'] = totalMatureFee
  }
}

export class ClientDebtExportData {
  constructor(transaction) {
    const { createdAt, cardNumber, cardType, bankCode, matureMonth, matureTotal,
      alreadyMatureAmount, remainMatureAmount, customerFee,
      customerAlreadyPaid, customerFeeRemain } = transaction
    this['Thời gian tiếp nhận'] = createdAt ? moment(createdAt).format('DD-MM-Y HH:mm:ss') : createdAt
    this['Số thẻ'] = cardNumber
    this['Loại thẻ'] = cardType ? CARD_TYPE_MAP.get(cardType) : cardType
    this['Ngân hàng'] = bankCode
    this['Tháng đáo'] = matureMonth
    this['Số tiền đáo'] = matureTotal
    this['Số tiền đã đáo'] = alreadyMatureAmount
    this['Số tiền cần đáo'] = remainMatureAmount
    this['Số tiền khách phải trả'] = customerFee
    this['Số tiền khách đã trả'] = customerAlreadyPaid
    this['Số tiền khách cần trả'] = customerFeeRemain
  }
}

export class ClientDebtExportSummary {
  constructor(totalMatureAmount, totalAlreadyMatureAmount,
    totalRemainMatureAmount, totalCustomerFee, totalCustomerAlreadyPaid, totalCustomerFeeRemain) {
    this['Tổng số tiền đáo'] = totalMatureAmount
    this['Tổng số tiền đã đáo'] = totalAlreadyMatureAmount
    this['Tổng số tiền cần đáo'] = totalRemainMatureAmount
    this['Tổng số tiền khách phải trả'] = totalCustomerFee
    this['Tổng số tiền khách đã trả'] = totalCustomerAlreadyPaid
    this['Tổng số tiền khách cần trả'] = totalCustomerFeeRemain
  }
}
