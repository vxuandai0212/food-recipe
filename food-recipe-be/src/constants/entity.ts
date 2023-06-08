export enum STATUS {
  DISABLE = 1,
  ACTIVE = 2
}

export enum CLIENT_TYPE {
  RETAIL = 1,
  AGENCY = 2
}

export enum ROLE {
  ADMIN = 'admin',
  SINGLE = 'single',
  MULTIPLE = 'multiple'
}

export enum APP_LEVEL {
  ONE = 1,
  TWO = 2,
  THREE = 3
}

export enum AGENCY_ROLE {
  EMPLOYEE = 1,
  MANAGER = 2,
  DIRECTOR = 3
}

export enum INVITE_STATUS {
  WAITING = 1,
  EXPIRED = 2,
  ACCEPTED = 3
}

export enum PRICE_POLICY_STATUS {
  DRAFT = 1,
  PENDING = 2,
  APPLYING = 3,
  EXPIRED = 4
}

export enum PRICE_POLICY_TYPE {
  AGENCY = 1
}

export enum CARD_TYPE {
  VISA = 1,
  MASTER = 2,
  JCB = 3,
  NAPAS = 4
}

export enum CONTENT_IMAGE_OBJECT_TYPE {
  INGREDIENT = 1,
  RECIPE = 2,
  AD = 3,
  FT_POST_THUMBNAIL = 4
}

export enum AD_TYPE {
  PRICE = 1,
  NUTRITION = 2,
  NATIVE = 3
}

export enum RECIPE_SEARCH_TYPE {
  RECIPE = 1,
  COOK_METHOD = 2,
  COOK_EVENT = 3,
  TAG = 4,
  INGREDIENT = 5
}

export enum CONTENT_IMAGE_IS_COVER_TYPE {
  ENABLE = 1,
  DISABLE = 0
}

export enum FAVORITE_RECIPE_TYPE {
  VIEW = 1,
  VIEW_PRICE = 2,
  VIEW_NUTRITION = 3
}

export enum STORAGE_IS_DEFAULT {
  DISABLE = 0,
  ENABLE = 1
}

export enum CARD_STATUS {
  HIDDEN = 1,
  ACTIVE = 2,
  RETURN = 3,
  WITHDRAW = 4,
  INSTALLMENT = 5
}

export enum CHARGE_TYPE {
  POS = 1,
  TRANSFER = 2
}

export enum TRANSACTION_TYPE {
  RECHARGE = 1,
  WITHDRAW = 2
}

export enum TRANSACTION_STATUS {
  MATURING = 1,
  COLLECT_MONEY = 2,
  DONE = 3,
  RETURN_CARD = 4
}

export enum NOTIFY_SETTING_TYPE {
  AGENCY = 1,
  CLIENT = 2
}

export enum ACTIVITY_LOG_TYPE {
  VIEW_BANK = 1,
  ADD_BANK = 10,
  VIEW_CARD = 2,
  ADD_CARD = 20,
  VIEW_CLIENT = 3,
  ADD_CLIENT = 30,
  VIEW_POS = 4,
  ADD_POS = 40,
  VIEW_TRANSACTION = 5,
  ADD_TRANSACTION = 50
}

export enum TOKEN_TYPE {
  ACCESS = 1,
  REFRESH = 2,
  RESET_PASSWORD = 3,
  VERIFY_EMAIL = 4
}

export enum TAG_TYPE {
  CARD = 1
}

export enum SIGNATURE_TYPE {
  BANK = 1,
  CARD = 2
}

export enum MONTH {
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12
}

export enum AD_CONFIG_TYPE {
  PRICE = 1,
  NUTRITION = 2,
  NATIVE = 3
}

export enum AD_CONFIG_STATUS {
  DISABLE = 0,
  ACTIVE = 1
}

export enum VIEW_TYPE {
  RECIPE = 1,
  KEYWORD = 2
}

export enum VIEW_SNAP_TYPE {
  NATIVE_AD = 1,
  PRICE_AD = 2,
  NUTRITION_AD = 3
}

export enum AD_STATUS {
  DISABLE = 0,
  ACTIVE = 1
}

export enum AD_PAYED {
  NO = 0,
  YES = 1
}

export enum AD_CATEGORY {
  BOOK = 1,
  EDUCATION = 2,
  TOOL = 3,
  EXERCISE_AND_HEALTH = 4,
  SPORT_AND_ENTERTAIN = 5,
  FOOD_AND_DRINK = 6,
  CAR_AND_VEHICLE = 7,
  ENTERTAIN = 8,
  SHOPPING = 9,
  TOURISM = 10,
  HOUSING_AND_GARDENING = 11,
  GAME = 12,
  MEDICAL = 13,
  REAL_ESTATE = 14
}

export enum INGREDIENT_INFO_TYPE {
  BENEFIT = 1,
  WARNING_OVERUSE = 2,
  WARNING_CONSUMER = 3,
  WARNING_COMBINE = 4,
  TIP_SELECT = 5,
  TIP_PREPROCESS = 6,
  TIP_PRESERVE = 7
}

// fancythings
export enum FT_CATEGORY_LEVEL {
  LEVEL_1 = 1,
  LEVEL_2 = 2
}
