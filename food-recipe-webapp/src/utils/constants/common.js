export const DEFAULT_PAGE_LIMIT = 10
export const DEFAULT_LIMIT = 10
export const DEFAULT_PAGE = 1

export const VIEW_MODE_ADMIN = 'admin'
export const VIEW_MODE_CUSTOMER = 'customer'

export const TITLE_BANK = 'Ngân hàng'
export const TITLE_CARD = 'Thẻ'
export const TITLE_POS = 'POS'
export const TITLE_CUSTOMER = 'Đối tác'
export const TITLE_CLIENT = 'Khách hàng'
export const TITLE_DASHBOARD = 'Dashboard'
export const TITLE_TRANSACTION = 'Giao dịch'
export const TITLE_REPORT = 'Báo cáo'
export const TITLE_TOP_CARD = 'Top thẻ'
export const TITLE_PERSONAL_INFO = 'Thông tin cá nhân'
export const TITLE_APPLICATION_INFO = 'Thông tin ứng dụng'
export const TITLE_APPLICATION = 'Ứng dụng'
export const TITLE_TOP_MONEY = 'Top số tiền đã đáo'
export const TITLE_TOP_TRANSACTION = 'Top giao dịch'
export const TITLE_TOP_CLIENT = 'Top khách hàng'
export const TITLE_WARNING_EXPIRE_APPLICATION = 'Ứng dụng sắp hết hạn'

export const TITLE_CARD_EXPIRE = 'Thẻ sắp hết hạn'
export const TITLE_CARD_RETURN = 'Thẻ cần trả'
export const TITLE_CARD_STATEMENT = 'Thẻ cần sao kê'
export const TITLE_CARD_MATURE = 'Thẻ cần đáo'

export const SIGNATURE_TYPE_BANK = 1
export const SIGNATURE_TYPE_CARD = 2

export const MONTHS = [
  { key: 1, label: '1', value: 1 },
  { key: 2, label: '2', value: 2 },
  { key: 3, label: '3', value: 3 },
  { key: 4, label: '4', value: 4 },
  { key: 5, label: '5', value: 5 },
  { key: 6, label: '6', value: 6 },
  { key: 7, label: '7', value: 7 },
  { key: 8, label: '8', value: 8 },
  { key: 9, label: '9', value: 9 },
  { key: 10, label: '10', value: 10 },
  { key: 11, label: '11', value: 11 },
  { key: 12, label: '12', value: 12 }
]

export const YEARS = () => {
  const minYear = 2000
  const maxYear = 2100
  const options = []
  for (let i = minYear; i <= maxYear; i++) {
    const option = { key: i, label: i, value: i }
    options.push(option)
  }
  return options
}

export const APPLICATION_STATUS = [
  { key: 1, label: 'Khoá', value: 1 },
  { key: 2, label: 'Hoạt động', value: 2 }
]

export const CLIENT_STATUS_TYPE = {
  ACTIVE: 2,
  LOCK: 1
}

export const CLIENT_UPDATE_PARAMS = ['id', 'name', 'phone', 'email', 'idNumber', 'description',
  'zaloId', 'telegramId', 'whatsappId', 'transactionCost', 'applicationId', 'status']

export const CLIENT_STATUS = [
  { key: 1, label: 'Khoá', value: 1 },
  { key: 2, label: 'Hoạt động', value: 2 }
]

export const CLIENT_TYPE = {
  RETAIL: { value: 1, label: 'Khách lẻ' },
  AGENCY: { value: 2, label: 'Khách đại lý' }
}

export const CLIENT_TYPE_OPTIONS = [
  { key: CLIENT_TYPE.RETAIL.value, label: CLIENT_TYPE.RETAIL.label, value: CLIENT_TYPE.RETAIL.value },
  { key: CLIENT_TYPE.AGENCY.value, label: CLIENT_TYPE.AGENCY.label, value: CLIENT_TYPE.AGENCY.value }
]

export const CLIENT_TYPE_MAP = new Map([
  [CLIENT_TYPE.RETAIL.value, CLIENT_TYPE.RETAIL.label],
  [CLIENT_TYPE.AGENCY.value, CLIENT_TYPE.AGENCY.label]])

export const POS_STATUS_TYPE = {
  ACTIVE: 2,
  LOCK: 1
}

export const POS_STATUS = [
  { key: 1, label: 'Khoá', value: 1 },
  { key: 2, label: 'Hoạt động', value: 2 }
]

export const APPLICATION_LEVEL = [
  { key: 1, label: '1 Cấp (1 người dùng)', value: 1 },
  { key: 2, label: '2 Cấp (1 quản lý, nhiều đại lý)', value: 2 },
  { key: 3, label: '3 Cấp (1 giám đốc, nhiều quản lý, nhiều đại lý)', value: 3 }
]

export const AGENCY_ROLE = [
  { key: 1, label: 'Đại lý', value: 1 },
  { key: 2, label: 'Quản lý', value: 2 },
  { key: 3, label: 'Giám đốc', value: 3 }
]

export const GRANT_MODE = {
  GRANT: 1,
  REVOKE: 2
}

export const INVITE_STATUS_WAITING = 1
export const INVITE_STATUS_EXPIRED = 2
export const INVITE_STATUS_ACCEPTED = 3

export const PRICE_POLICY_STATUS_DRAFT = 1
export const PRICE_POLICY_STATUS_PENDING = 2
export const PRICE_POLICY_STATUS_APPLYING = 3
export const PRICE_POLICY_STATUS_EXPIRED = 4

export const PRICE_POLICY_TYPE_AGENCY = 1

export const CARD_UPDATE_PARAMS = ['id', 'number', 'bankId', 'type', 'name', 'expireDate', 'limit', 'applicationId']

export const TRANSACTION_LOG_TYPE = {
  MATURE: 1,
  COLLECT_MONEY: 2,
  RETURN_CARD: 3
}

export const CARD_TYPE_KEY = {
  VISA: 'Visa',
  MASTER: 'Master',
  JCB: 'Jcb',
  NAPAS: 'Napas'
}

export const CARD_TYPE_VALUE = {
  VISA: 1,
  MASTER: 2,
  JCB: 3,
  NAPAS: 4
}

export const CARD_TYPE = [
  { key: CARD_TYPE_VALUE.VISA, label: CARD_TYPE_KEY.VISA, value: CARD_TYPE_VALUE.VISA },
  { key: CARD_TYPE_VALUE.MASTER, label: CARD_TYPE_KEY.MASTER, value: CARD_TYPE_VALUE.MASTER },
  { key: CARD_TYPE_VALUE.JCB, label: CARD_TYPE_KEY.JCB, value: CARD_TYPE_VALUE.JCB },
  { key: CARD_TYPE_VALUE.NAPAS, label: CARD_TYPE_KEY.NAPAS, value: CARD_TYPE_VALUE.NAPAS }
]

export const CARD_TYPE_MAP = new Map([
  [CARD_TYPE_VALUE.VISA, CARD_TYPE_KEY.VISA],
  [CARD_TYPE_VALUE.MASTER, CARD_TYPE_KEY.MASTER],
  [CARD_TYPE_VALUE.JCB, CARD_TYPE_KEY.JCB],
  [CARD_TYPE_VALUE.NAPAS, CARD_TYPE_KEY.NAPAS]
])

export const CARD_STATUS = [
  { key: 1, label: 'Ẩn', value: 1 },
  { key: 2, label: 'Hoạt động', value: 2 },
  { key: 3, label: 'Đã trả', value: 3 },
  { key: 4, label: 'Rút', value: 4 },
  { key: 5, label: 'Trả góp', value: 5 }
]

export const CARD_STATUS_TYPE = {
  HIDDEN: 1,
  ACTIVE: 2,
  RETURN: 3,
  WITHDRAW: 4,
  INSTALLMENT: 5
}

export const CHARGE_TYPE = [
  { key: 1, label: 'POS', value: 1 },
  { key: 2, label: 'Chuyển khoản', value: 2 }
]

export const TRANSACTION_TYPE = [
  { key: 1, label: 'Nạp', value: 1 },
  { key: 2, label: 'Rút', value: 2 }
]

export const TRANSACTION_STATUS = [
  { key: 1, label: 'Đang đáo', value: 1 },
  { key: 2, label: 'Đang thu phí', value: 2 },
  { key: 3, label: 'Hoàn thành', value: 3 },
  { key: 4, label: 'Đã trả thẻ', value: 4 }
]

export const TRANSACTION_STATUS_KEY = {
  PROCESSING: 1,
  COLLECT_FEE: 2,
  DONE: 3,
  RETURN_CARD: 4
}

export const TRANSACTION_STATUS_VALUE = {
  PROCESSING: 'Đang đáo',
  COLLECT_FEE: 'Đang thu phí',
  DONE: 'Hoàn thành',
  RETURN_CARD: 'Đã trả thẻ'
}

export const TRANSACTION_STATUS_TAG = {
  [TRANSACTION_STATUS_KEY.PROCESSING]: { type: 'warning', label: TRANSACTION_STATUS_VALUE.PROCESSING },
  [TRANSACTION_STATUS_KEY.COLLECT_FEE]: { type: 'danger', label: TRANSACTION_STATUS_VALUE.COLLECT_FEE },
  [TRANSACTION_STATUS_KEY.DONE]: { type: 'success', label: TRANSACTION_STATUS_VALUE.DONE },
  [TRANSACTION_STATUS_KEY.RETURN_CARD]: { type: 'info', label: TRANSACTION_STATUS_VALUE.RETURN_CARD }
}

export const TRANSACTION_STATUS_MAP = new Map([
  [TRANSACTION_STATUS_KEY.PROCESSING, TRANSACTION_STATUS_VALUE.PROCESSING],
  [TRANSACTION_STATUS_KEY.COLLECT_FEE, TRANSACTION_STATUS_VALUE.COLLECT_FEE],
  [TRANSACTION_STATUS_KEY.DONE, TRANSACTION_STATUS_VALUE.DONE],
  [TRANSACTION_STATUS_KEY.RETURN_CARD, TRANSACTION_STATUS_VALUE.RETURN_CARD]
])

export const TRANSACTION_UPDATE_PARAMS = ['id', 'transactionCost', 'cardId', 'matureTotal',
  'description', 'posId', 'chargeType', 'transactionType', 'status', 'applicationId'
]

export const CLIENT_TYPE_KEY = {
  RETAIL: 1,
  AGENCY: 2
}

export const CLIENT_TYPE_VALUE = {
  RETAIL: 'Khách lẻ',
  AGENCY: 'Khách đại lý'
}

export const NOTIFY_SETTING_TYPE_AGENCY = 1
export const NOTIFY_SETTING_TYPE_CLIENT = 2

export const ACTIVITY_LOG_TYPE_VIEW_BANK = 1
export const ACTIVITY_LOG_TYPE_ADD_BANK = 10
export const ACTIVITY_LOG_TYPE_VIEW_CARD = 2
export const ACTIVITY_LOG_TYPE_ADD_CARD = 20
export const ACTIVITY_LOG_TYPE_VIEW_CLIENT = 3
export const ACTIVITY_LOG_TYPE_ADD_CLIENT = 30
export const ACTIVITY_LOG_TYPE_VIEW_POS = 4
export const ACTIVITY_LOG_TYPE_ADD_POS = 40
export const ACTIVITY_LOG_TYPE_VIEW_TRANSACTION = 5
export const ACTIVITY_LOG_TYPE_ADD_TRANSACTION = 50

export const TOKEN_TYPE_ACCESS = 1
export const TOKEN_TYPE_REFRESH = 2
export const TOKEN_TYPE_RESET_PASSWORD = 3
export const TOKEN_TYPE_VERIFY_EMAIL = 4

export const TAG_TYPE_CARD = 1

export const STAT_DOMAIN = {
  ADMIN: 1,
  APPLICATION: 2
}

export const UNIT_TYPE = {
  QUANTITY: { label: 'Định lượng', value: 1 },
  NUTRITION: { label: 'Dinh dưỡng', value: 2 }
}

export const UNIT_TYPE_OPTION = [
  { label: UNIT_TYPE.QUANTITY.label, key: UNIT_TYPE.QUANTITY.value, value: UNIT_TYPE.QUANTITY.value },
  { label: UNIT_TYPE.NUTRITION.label, key: UNIT_TYPE.NUTRITION.value, value: UNIT_TYPE.NUTRITION.value }
]

export const STORAGE_IS_DEFAULT = {
  DISABLE: { label: 'Không', value: 0 },
  ACTIVE: { label: 'Mặc định', value: 1 }
}

export const CONTENT_IMAGE_OBJECT_TYPE = {
  INGREDIENT: 1,
  RECIPE: 2,
  AD: 3,
  FT_POST_THUMBNAIL: 4
}

export const CONTENT_IMAGE_IS_COVER = {
  ENABLE: 1,
  DISABLE: 0
}

export const VIEW_TYPE = {
  RECIPE: 1,
  RECIPE_PRICE: 2,
  RECIPE_NUTRITION: 3,
  KEYWORD: 4,
  AD: 5
}

export const AD_STATUS = {
  DISABLE: { label: 'Tắt', value: 0 },
  ACTIVE: { label: 'Kích hoạt', value: 1 }
}

export const AD_TYPE = {
  NATIVE: { label: 'native', value: 1 },
  PRICE: { label: 'price', value: 2 },
  NUTRITION: { label: 'nutrition', value: 3 }
}
