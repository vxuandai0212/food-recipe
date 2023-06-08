export const LOG_TYPE_CREATE_AUDIENCE = 1

export const AUDIENCE_TYPE = {
  PERSONAL_SMS: 1,
  PERSONAL_EMAIL: 2,
  PERSONAL_FCM: 3,
  BUSINESS: 4
}

export const AUDIENCE_SORT = {
  UPDATED_AT: 0,
  CREATED_AT: 1,
  AUDIENCE_NAME: 2
}

export const DEFAULT_AUDIENCE_LIST_QUERY = {
  page: 1,
  limit: 10,
  strSearch: '',
  type: AUDIENCE_TYPE.PERSONAL_SMS,
  sort: AUDIENCE_SORT.UPDATED_AT
}