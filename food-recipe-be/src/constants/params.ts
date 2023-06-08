import { AD_CATEGORY, AD_CONFIG_STATUS, AD_PAYED, AD_STATUS, AD_TYPE, AGENCY_ROLE, APP_LEVEL, CARD_STATUS, CARD_TYPE, CHARGE_TYPE, CONTENT_IMAGE_IS_COVER_TYPE, CONTENT_IMAGE_OBJECT_TYPE, FT_CATEGORY_LEVEL, INGREDIENT_INFO_TYPE, INVITE_STATUS, MONTH, PRICE_POLICY_STATUS, PRICE_POLICY_TYPE, RECIPE_SEARCH_TYPE, SIGNATURE_TYPE, STATUS, TRANSACTION_STATUS, TRANSACTION_TYPE, VIEW_SNAP_TYPE, VIEW_TYPE } from 'constants/entity'

export const AGENCY_FILTER_PROPS = [
  'page',
  'limit',
  'searchKeyword',
  'applicationId',
  'customerId',
  'roles',
  'isOwners'
]

export interface AGENCY_FILTER {
  page: number
  limit: number
  searchKeyword?: string
  applicationId?: number
  customerId?: number
  roles?: Array<AGENCY_ROLE>
  isOwners?: Array<STATUS>
}

export const SIGNATURE_TYPE_PROPS = [SIGNATURE_TYPE.BANK, SIGNATURE_TYPE.CARD]

export const CLIENT_TYPE = {
  RETAIL: 1,
  AGENCY: 2
}

export const TRANSACTION_LOG_TYPE = {
  MATURE: 1,
  COLLECT_MONEY: 2,
  RETURN_CARD: 3
}

export const STORAGE_IS_DEFAULT = {
  DISABLE: 0,
  ENABLE: 1
}

export const VALID_AD_TYPE = [AD_TYPE.PRICE, AD_TYPE.NUTRITION, AD_TYPE.NATIVE]

export const VALID_RECIPE_SEARCH_TYPE = [
  RECIPE_SEARCH_TYPE.RECIPE,
  RECIPE_SEARCH_TYPE.COOK_METHOD,
  RECIPE_SEARCH_TYPE.COOK_EVENT,
  RECIPE_SEARCH_TYPE.TAG,
  RECIPE_SEARCH_TYPE.INGREDIENT
]

export const VALID_STORAGE_IS_DEFAULT = [STORAGE_IS_DEFAULT.DISABLE, STORAGE_IS_DEFAULT.ENABLE]

export const VALID_AD_CONFIG_STATUS = [AD_CONFIG_STATUS.ACTIVE, AD_CONFIG_STATUS.DISABLE]

export const VALID_AD_STATUS = [AD_STATUS.DISABLE, AD_STATUS.ACTIVE]

export const VALID_AD_CATEGORY = [
  AD_CATEGORY.BOOK,
  AD_CATEGORY.CAR_AND_VEHICLE,
  AD_CATEGORY.EDUCATION,
  AD_CATEGORY.ENTERTAIN,
  AD_CATEGORY.EXERCISE_AND_HEALTH,
  AD_CATEGORY.FOOD_AND_DRINK,
  AD_CATEGORY.GAME,
  AD_CATEGORY.HOUSING_AND_GARDENING,
  AD_CATEGORY.MEDICAL,
  AD_CATEGORY.REAL_ESTATE,
  AD_CATEGORY.SHOPPING,
  AD_CATEGORY.SPORT_AND_ENTERTAIN,
  AD_CATEGORY.TOOL,
  AD_CATEGORY.TOURISM
]

export const VALID_AD_PAYED = [
  AD_PAYED.NO,
  AD_PAYED.YES
]

export const VALID_INGREDIENT_INFO_TYPE = [
  INGREDIENT_INFO_TYPE.BENEFIT,
  INGREDIENT_INFO_TYPE.WARNING_OVERUSE,
  INGREDIENT_INFO_TYPE.WARNING_CONSUMER,
  INGREDIENT_INFO_TYPE.WARNING_COMBINE,
  INGREDIENT_INFO_TYPE.TIP_SELECT,
  INGREDIENT_INFO_TYPE.TIP_PREPROCESS,
  INGREDIENT_INFO_TYPE.TIP_PRESERVE
]

export const VALID_VIEW_SNAP_TYPE = [VIEW_SNAP_TYPE.NATIVE_AD, VIEW_SNAP_TYPE.NUTRITION_AD, VIEW_SNAP_TYPE.PRICE_AD]

export const VALID_CONTENT_IMAGE_OBJECT_TYPE = [CONTENT_IMAGE_OBJECT_TYPE.INGREDIENT, CONTENT_IMAGE_OBJECT_TYPE.RECIPE, CONTENT_IMAGE_OBJECT_TYPE.AD, CONTENT_IMAGE_OBJECT_TYPE.FT_POST_THUMBNAIL]

export const VALID_CONTENT_IMAGE_IS_COVER = [CONTENT_IMAGE_IS_COVER_TYPE.DISABLE, CONTENT_IMAGE_IS_COVER_TYPE.ENABLE]

export const VALID_FT_CATEGORY_LEVEL = [FT_CATEGORY_LEVEL.LEVEL_1, FT_CATEGORY_LEVEL.LEVEL_2]

export const VALID_VIEW_TYPE = [VIEW_TYPE.KEYWORD, VIEW_TYPE.RECIPE]

export const VALID_TRANSACTION_LOG_TYPE = [TRANSACTION_LOG_TYPE.MATURE, TRANSACTION_LOG_TYPE.COLLECT_MONEY, TRANSACTION_LOG_TYPE.RETURN_CARD]

export const VALID_CLIENT_TYPE = [CLIENT_TYPE.RETAIL, CLIENT_TYPE.AGENCY]

export const UPDATE_ROLE_PROPS = [
  'agencyId',
  'role'
]

export interface UPDATE_ROLE {
  agencyId: number
  role: AGENCY_ROLE
}

export const APPLICATION_FILTER_PROPS = [
  'page',
  'limit',
  'searchKeyword',
  'maxMember',
  'enableNotify',
  'enableZalo',
  'enableTelegram',
  'enableWhatsapp',
  'appLevel',
  'status'
]

export interface APPLICATION_FILTER {
  page: number
  limit: number
  searchKeyword: string
  fromMemberRange: number
  toMemberRange: number
  maxMember: number
  enableNotify: STATUS
  enableZalo: STATUS
  enableTelegram: STATUS
  enableWhatsapp: STATUS
  appLevel: APP_LEVEL
  status: STATUS
}

export const APPLICATION_QUERY_CONDITION_PROPS = [
  'maxMember',
  'enableNotify',
  'enableZalo',
  'enableTelegram',
  'enableWhatsapp',
  'appLevel',
  'status'
]

export interface APPLICATION_QUERY_CONDITION {
  maxMember?: number
  enableNotify?: STATUS
  enableZalo?: STATUS
  enableTelegram?: STATUS
  enableWhatsapp?: STATUS
  appLevel?: APP_LEVEL
  status?: STATUS
}

export const EXTEND_LICENSE_PROPS = [
  'startDate',
  'expireDate'
]

export interface EXTEND_LICENSE {
  applicationId: number
  startDate: number
  expireDate: number
}

export const BANK_INSERT_PROPS = [
  'name',
  'code',
  'description',
  'applicationId',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy'
]

export interface BANK_INSERT {
  name?: string
  code?: string
  description?: string
  applicationId?: number
  createdAt?: Date
  createdBy?: string
  updatedAt?: Date
  updatedBy?: string
}

export const BANK_UPDATE_PROPS = [
  'name',
  'code',
  'description',
  'updatedAt',
  'updatedBy'
]

export interface BANK_UPDATE {
  name?: string
  code?: string
  description?: string
  updatedAt?: Date
  updatedBy?: string
}

export const BANK_FILTER_PROPS = [
  'page',
  'limit',
  'searchKeyword',
  'applicationId'
]

export interface BANK_FILTER {
  page: number
  limit: number
  searchKeyword?: string,
  applicationId?: number
}

export const CARD_INSERT_PROPS = [
  'number',
  'bankId',
  'type',
  'clientId',
  'name',
  'expireDate',
  'limit',
  'status',
  'returnDate',
  'statementMonth',
  'matureDate',
  'matureTotal',
  'transactionCost',
  'description',
  'applicationId',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy'
]

export interface CARD_INSERT {
  number: string
  bankId: number
  type: CARD_TYPE
  clientId: number
  name: string
  expireDate: number
  limit: number
  status: CARD_STATUS
  returnDate: number
  statementMonth: MONTH
  matureDate: number
  matureTotal: number
  transactionCost: number
  description?: string
  applicationId: number
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string
}

export const CARD_UPDATE_PROPS = [
  'number',
  'bankId',
  'type',
  'clientId',
  'name',
  'expireDate',
  'limit',
  'status',
  'returnDate',
  'statementMonth',
  'matureDate',
  'matureTotal',
  'transactionCost',
  'description',
  'updatedAt',
  'updatedBy'
]

export interface CARD_UPDATE {
  number: string
  bankId: number
  type: CARD_TYPE
  clientId: number
  name: string
  expireDate: number
  limit: number
  status: CARD_STATUS
  returnDate: number
  statementMonth: MONTH
  matureDate: number
  matureTotal: number
  transactionCost: number
  description?: string
  updatedAt: Date
  updatedBy: string
}

export const CARD_FILTER_PROPS = [
  'page',
  'limit',
  'searchKeyword',
  'applicationId',
  'bankId',
  'type',
  'clientId',
  'expireDate',
  'cardLimit',
  'status',
  'returnDate',
  'statementMonth',
  'matureDate',
  'matureTotal',
  'transactionCost'
]

export interface CARD_FILTER {
  page: number
  limit: number
  searchKeyword?: string,
  applicationId?: number
  bankId?: number
  type?: CARD_TYPE
  clientId?: number
  expireDate?: number
  cardLimit?: number
  status?: STATUS
  returnDate?: number
  statementMonth?: MONTH
  matureDate?: number
  matureTotal?: number
  transactionCost?: number
}

export const CLIENT_INSERT_PROPS = [
  'name',
  'phone',
  'email',
  'idNumber',
  'description',
  'zaloId',
  'telegramId',
  'whatsappId',
  'transactionCost',
  'applicationId',
  'status',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy'
]

export interface CLIENT_INSERT {
  name: string
  phone: string
  email: string
  idNumber: string
  description?: string
  zaloId?: string
  telegramId?: string
  whatsappId?: string
  transactionCost?: number
  applicationId: number
  status: STATUS
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string
}

export const CLIENT_UPDATE_PROPS = [
  'name',
  'phone',
  'email',
  'idNumber',
  'description',
  'zaloId',
  'telegramId',
  'whatsappId',
  'transactionCost',
  'status',
  'updatedAt',
  'updatedBy'
]

export interface CLIENT_UPDATE {
  name: string
  phone: string
  email: string
  idNumber: string
  description?: string
  zaloId?: string
  telegramId?: string
  whatsappId?: string
  transactionCost?: number
  status: STATUS
  updatedAt: Date
  updatedBy: string
}

export const CLIENT_FILTER_PROPS = [
  'page',
  'limit',
  'searchKeyword',
  'applicationId',
  'status'
]

export interface CLIENT_FILTER {
  page: number
  limit: number
  searchKeyword?: string,
  applicationId?: number
  status?: Array<STATUS>
}

export const CUSTOMER_INSERT_PROPS = [
  'email',
  'password'
]

export interface CUSTOMER_INSERT {
  email: string
  password: string
}

export const CUSTOMER_CHANGE_PASSWORD_PROPS = [
  'password'
]

export interface CUSTOMER_CHANGE_PASSWORD {
  password: string
}

export const CUSTOMER_UPDATE_INFO_PROPS = [
  'fullname',
  'phone'
]

export interface CUSTOMER_UPDATE_INFO {
  fullname: string
  phone: string
}

export const CUSTOMER_FILTER_PROPS = [
  'page',
  'limit',
  'searchKeyword',
  'status',
  'isAdmin'
]

export interface CUSTOMER_FILTER {
  page: number
  limit: number
  searchKeyword?: string
  status?: Array<STATUS>
  isAdmin?: STATUS
}

export const INVITE_INSERT_PROPS = [
  'email',
  'applicationId',
  'status'
]

export interface INVITE_INSERT {
  email: string
  applicationId: number
  status: INVITE_STATUS.WAITING
}

export const UPDATE_NOTIFY_SETTING_PROPS = [
  'isEnable',
  'isEnableZalo',
  'isEnableTelegram',
  'isEnableWhatsapp'
]

export interface UPDATE_NOTIFY_SETTING {
  isEnable?: STATUS
  isEnableZalo?: STATUS
  isEnableTelegram?: STATUS
  isEnableWhatsapp?: STATUS
}

export const POS_INSERT_PROPS = [
  'name',
  'code',
  'description',
  'bankId',
  'visaTransactionCost',
  'masterTransactionCost',
  'jcbTransactionCost',
  'napasTransactionCost',
  'applicationId',
  'status',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy'
]

export interface POS_INSERT {
  name: string
  code: string
  description?: string
  bankId: number
  visaTransactionCost?: number
  masterTransactionCost?: number
  jcbTransactionCost?: number
  napasTransactionCost?: number
  applicationId: number
  status: STATUS
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string
}

export const POS_UPDATE_PROPS = [
  'name',
  'code',
  'description',
  'bankId',
  'visaTransactionCost',
  'masterTransactionCost',
  'jcbTransactionCost',
  'napasTransactionCost',
  'status',
  'updatedAt',
  'updatedBy'
]

export interface POS_UPDATE {
  name?: string
  code?: string
  description?: string
  bankId?: number
  visaTransactionCost?: number
  masterTransactionCost?: number
  jcbTransactionCost?: number
  napasTransactionCost?: number
  status?: STATUS
  updatedAt: Date
  updatedBy: string
}

export const POS_FILTER_PROPS = [
  'page',
  'limit',
  'searchKeyword',
  'applicationId',
  'bankIds',
  'status',
  'fromVisaTransactionCost',
  'toVisaTransactionCost',
  'fromMasterTransactionCost',
  'toMasterTransactionCost',
  'fromJcbTransactionCost',
  'toJcbTransactionCost',
  'fromNapasTransactionCost',
  'toNapasTransactionCost'
]

export interface POS_FILTER {
  page: number
  limit: number
  searchKeyword?: string,
  applicationId?: number
  bankIds?: Array<number>
  status?: Array<STATUS>
  fromVisaTransactionCost?: number
  toVisaTransactionCost?: number
  fromMasterTransactionCost?: number
  toMasterTransactionCost?: number
  fromJcbTransactionCost?: number
  toJcbTransactionCost?: number
  fromNapasTransactionCost?: number
  toNapasTransactionCost?: number
}

export const PRICE_POLICY_INSERT_PROPS = [
  'agencyId',
  'transactionCost',
  'effectStartTime',
  'effectEndTime',
  'type',
  'status',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy'
]

export interface PRICE_POLICY_INSERT {
  agencyId: number
  transactionCost: number
  effectStartTime: number
  effectEndTime: number
  type: PRICE_POLICY_TYPE
  status: PRICE_POLICY_STATUS
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string
}

export const PRICE_POLICY_UPDATE_PROPS = [
  'transactionCost',
  'effectStartTime',
  'effectEndTime',
  'type',
  'status',
  'updatedAt',
  'updatedBy'
]

export interface PRICE_POLICY_UPDATE {
  transactionCost?: number
  effectStartTime?: number
  effectEndTime?: number
  type?: PRICE_POLICY_TYPE
  status?: PRICE_POLICY_STATUS
  updatedAt: Date
  updatedBy: string
}

export const PRICE_POLICY_FILTER_PROPS = [
  'page',
  'limit',
  'agencyId',
  'types',
  'status',
  'fromTransactionCost',
  'toTransactionCost',
  'fromEffectStartTime',
  'toEffectStartTime',
  'fromEffectEndTime',
  'toEffectEndTime'
]

export interface PRICE_POLICY_FILTER {
  page: number
  limit: number
  agencyId?: number,
  types?: Array<PRICE_POLICY_TYPE>
  status?: Array<STATUS>
  fromTransactionCost?: number
  toTransactionCost?: number
  fromEffectStartTime?: Date
  toEffectStartTime?: Date
  fromEffectEndTime?: Date
  toEffectEndTime?: Date
}

export const TAG_INSERT_PROPS = [
  'name',
  'applicationId',
  'type',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy'
]

export interface TAG_INSERT {
  name: string
  applicationId: number
  type: number
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string
}

export const TAG_UPDATE_PROPS = [
  'name',
  'updatedAt',
  'updatedBy'
]

export interface TAG_UPDATE {
  name: string
  updatedAt: Date
  updatedBy: string
}

export const TAG_FILTER_PROPS = [
  'page',
  'limit',
  'searchKeyword',
  'applicationId',
  'type'
]

export interface TAG_FILTER {
  page: number
  limit: number
  searchKeyword: string,
  applicationId: number
  type: number
}

export const TRANSACTION_INSERT_PROPS = [
  'transactionCost',
  'cardId',
  'matureDate',
  'matureTotal',
  'matureMonth',
  'description',
  'agencyId',
  'posId',
  'chargeType',
  'transactionType',
  'status',
  'applicationId',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy'
]

export interface TRANSACTION_INSERT {
  transactionCost: number
  cardId: number
  matureDate: number
  description: string
  agencyId: number
  posId: number
  chargeType: CHARGE_TYPE
  transactionType: TRANSACTION_TYPE
  status: TRANSACTION_STATUS
  applicationId: number
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string
}

export const TRANSACTION_UPDATE_PROPS = [
  'transactionCost',
  'cardId',
  'matureDate',
  'matureTotal',
  'matureMonth',
  'description',
  'agencyId',
  'posId',
  'chargeType',
  'transactionType',
  'status',
  'updatedAt',
  'updatedBy'
]

export interface TRANSACTION_UPDATE {
  transactionCost: number
  cardId: number
  matureDate: number
  description: string
  agencyId: number
  posId: number
  chargeType: CHARGE_TYPE
  transactionType: TRANSACTION_TYPE
  status: TRANSACTION_STATUS
  updatedAt: Date
  updatedBy: string
}

export const TRANSACTION_FILTER_PROPS = [
  'page',
  'limit',
  'fromTransactionCost',
  'toTransactionCost',
  'cardIds',
  'fromMatureDate',
  'toMatureDate',
  'agencyIds',
  'posIds',
  'chargeTypes',
  'transactionTypes',
  'status',
  'applicationIds'
]

export interface TRANSACTION_FILTER {
  page: number
  limit: number
  fromTransactionCost: number
  toTransactionCost: number
  cardIds: Array<number>
  fromMatureDate: number
  toMatureDate: number
  agencyIds: Array<number>
  posIds: Array<number>
  chargeTypes: Array<CHARGE_TYPE>
  transactionTypes: Array<TRANSACTION_TYPE>
  status: Array<TRANSACTION_STATUS>
  applicationIds: Array<number>
}

export const STAT_DOMAIN_ADMIN = 1
export const STAT_DOMAIN_APPLICATION = 2
export const STAT_DOMAIN_PROPS = [STAT_DOMAIN_ADMIN, STAT_DOMAIN_APPLICATION]
