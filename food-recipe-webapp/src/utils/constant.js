export const DEFAULT_PAGE = 1

export const DEFAULT_LIMIT = 10

export const APP_CONST = {
  APPCODE_COLUMN: 'Mã ứng dụng',
  APPNAME_COLUMN: 'Tên ứng dụng',
  STATUS_COLUMN: 'Trạng thái'
}
export const FEATURE = {
  SMS_API: 1,
  SMS_CAMPAIGN: 2,
  EMAIL_API: 3,
  EMAIL_CAMPAIGN: 4,
  FCM_API: 5,
  FCM_CAMPAIGN: 6
}
export const FEATURE_CONST = {
  CODE_COLUMN: 'Mã tính năng',
  NAME_COLUMN: 'Tên tính năng',
  TYPE_COLUMN: 'Nhóm tính năng',
  STATUS_COLUMN: 'Trạng thái'
}

export const ROLE_CONST = {
  ADMIN: 'admin',
  USER: 'user',
  ROLE: 'role',
  APP: 'app',
  VIEW: 'view',
  MAKE_CHANGE: 'make-changes'
}

export const STORAGE = {
  BUCKET: 'notify',
  TEMPLATE_DOMAIN: 'template',
  CAMPAIGN_DOMAIN: 'campaign'
}

export const ACTION = {
  RENAME: 'Đổi tên',
  RETURN: 'Trả',
  MATURE: 'Đáo',
  COLLECT_MONEY: 'Thu phí',
  ADD: 'Thêm mới',
  DELETE: 'Xóa',
  UPDATE: 'Cập nhật',
  MOVE: 'Di chuyển',
  CLOSE: 'Đóng',
  EDIT: 'Sửa',
  CONFIRM: 'Xác nhận',
  CANCEL: 'Hủy',
  CLONE: 'Tạo bản sao',
  OPEN: 'Mở',
  REGISTER: 'Đăng kí',
  SAVE: 'Lưu',
  CHANGE_PASSWORD: 'Đổi mật khẩu',
  ARCHIVE: 'Lưu trữ',
  ARCHIVE_ALL: 'Lưu trữ tất cả',
  OPEN_EMAIL: 'Mở email',
  CLICK_LINK_IN_EMAIL: 'Click link trong email',
  CANCEL_SUB: 'Hủy đăng kí',
  NOTE: 'Ghi chú',
  LOCK: 'Khóa',
  UNLOCK: 'Mở khóa',
  REVOKE: 'Xóa',
  GRANT_ACCESS: 'Cấp quyền truy cập ứng dụng cho',
  GRANT_PERMISSION: 'Thêm quyền cho',
  REVOKE_PERMISSION: 'Huỷ quyền cho',
  REVOKE_PERMISSION_CHANGE: 'Thông tin quyền được giữ nguyên cho',
  VIEW_TEMPLATE: 'Xem tin',
  PREVIEW: 'Preview',
  CANCEL_SCHEDULE: 'Hủy lịch',
  REMOVE_TAG_FOR: 'Bỏ tag cho các',
  ADD_TAG_FOR: 'Thêm tag cho các'
}

export const ROLE = {
  ADMIN: 'admin',
  SINGLE: 'single',
  MULTIPLE: 'multiple'
}

export const FIELD = {
  AD: 'quảng cáo',
  AD_CUSTOMER: 'khách hàng',
  MATURE: 'đáo',
  CAMPAIGN: 'campaign',
  AUDIENCE: 'audience',
  CONTACT: 'thuê bao',
  NOTE: 'ghi chú',
  AGENCY: 'đại lý',
  APPLICATION: 'ứng dụng',
  CARD: 'thẻ',
  CUSTOMER: 'đối tác',
  CLIENT: 'khách hàng',
  FEATURE: 'tính năng',
  ALIAS: 'tiêu đề',
  TOKEN: 'token',
  FB_APP: 'firebase app',
  TAG: 'tag',
  CONTRACT: 'gói dịch vụ',
  TRANSACTION: 'giao dịch',
  POS: 'pos',
  BANK: 'ngân hàng',
  EVENT: 'dịp chế biến',
  UNIT: 'đơn vị',
  NUTRITION: 'chất dinh dưỡng',
  BENEFIT: 'lợi ích',
  WARNING: 'chú ý',
  TIP: 'mẹo',
  INGREDIENT: 'thành phần',
  STORAGE: 'nơi lưu trữ',
  COOK_METHOD: 'cách chế biến',
  RECIPE: 'công thức',
  CONFIG: 'cấu hình',
  FT_CATEGORY: 'danh mục',
  FT_POST: 'bài viết'
}
export const COMMON = {
  MONDAY: 'Thứ hai',
  TUESDAY: 'Thứ ba',
  WEDNESDAY: 'Thứ tư',
  THURSDAY: 'Thứ năm',
  FRIDAY: 'Thứ sáu',
  SATURDAY: 'Thứ bảy',
  SUNDAY: 'Chủ nhật'
}

export const CAMPAIGN_TYPE = {
  SMS: 1,
  EMAIL: 2,
  FCM: 3
}

export const ACTIVITY_COLOR = {
  CAMPAIGN: {
    FONT: '#D10B54',
    BG: '#F9F7F7'
  },
  API: {
    FONT: '#6987C9',
    BG: '#F2F3F8'
  },
  SMS: {
    FONT: '#DF9400',
    BG: '#FFFAF0'
  },
  EMAIL: {
    FONT: '#00C7E1',
    BG: '#F6FEFF'
  },
  FCM: {
    FONT: '#00D8AD',
    BG: '#E2FFF9'
  }
}

export const CAMPAIGNS = {
  RECEIVER_DEFAULT_PAGE_SIZE: 10,
  FILE_SIZE_LIMIT: 209715200,
  SIZE_LIST_FILE: 10,
  SMS: 'SMS',
  EMAIL: 'Email',
  FCM: 'FCM',
  VTF: 'Viettel Family',
  SORT: 'Sắp xếp',
  OPEN: 'Mở',
  CLICK: 'Click',
  EDIT: 'Sửa',
  SENDING_CODE: 1,
  SENT_CODE: 2,
  DRAFT_CODE: 3,
  SCHEDULED_CODE: 4
}

export const VALIDATE = {
  required(field) {
    return `${field} không được để trống`;
  },
  NUMBER: 'Chỉ được phép dán dữ liệu số',
  REQUIRED: 'Bạn chưa chọn (nhập) điều kiện',
  ONLY_VIETNAMESE_CHAR: 'chỉ sử dụng kí tự a-z, A-Z, dấu cách, tiếng Việt có dấu.',
  ONLY_VIETNAMESE_CHAR_NUMBER_WITHOUT_SPACE: 'chỉ sử dụng kí tự a-z, A-Z, 0-9, tiếng Việt có dấu.',
  ONLY_VNMESE_NUM_SPACE_DASH_UNDERSCORE: 'Chỉ nhập azAZ09-_ tiếng Việt có dấu',
  ONLY_CHAR_NUM_DASH_UNDERSCORE: 'Chỉ nhập azAZ09-_',
  ONLY_VNMESE_NUM_SPACE: 'Chỉ nhập azAZ 09 tiếng Việt có dấu'

}

export const EMPLOYEE = {
  WORKING_STATUS_CODE: 1,
  WORKING_STATUS_LABEL: 'Đang làm việc',
  QUIT_STATUS_CODE: 2,
  QUIT_STATUS_LABEL: 'Đã nghỉ việc'
}

export const AUDIENCE = {
  VIETTEL_AUDIENCE_ID: 1,
  ALL: 'Tất cả',
  ANY: 'Bất kỳ',
  AND: 'VÀ',
  OR: 'HOẶC',
  VIEW: 'Xem',
  CREATE_AT: 'Tạo lúc',
  CANCEL: 'Huỷ',
  TAG_NAME: 'Tên tag',
  NO_ACTION: 'Không có hoạt động',
  ADD_NEW_SUCCESS: 'Thêm mới thành công',
  FIND_AND_ADD_TAG: 'Tìm hoặc thêm tag',
  RENAME: 'Đổi tên',
  SEND: 'Gửi',
  CREATE_T: 'Tạo tag',
  SORT: 'Sắp xếp',
  DELETE: 'Xoá',
  HOUR_AM: 'AM',
  HOUR_PM: 'PM',
  CHOOSE: 'Chọn',
  TODAY: 'Hôm nay',
  YESTERDAY: 'Hôm qua',
  WEEKAGO: '1 tuần trước',
  NAME: 'Tên audience',
  DESCRIPTION: 'Mô tả',
  CONTACT: 'Thuê bao',
  SUB: 'Đăng kí',
  STATISTIC: 'Thống kê',
  ALL_CONTACT: 'Tất cả thuê bao',
  ARCHIVED_CONTACT: 'Thuê bao bị lưu trữ',
  INDEX: 'STT',
  UNSUB_CONTACT: 'Hủy đăng kí cho thuê bao',
  SEGMENTS: 'Segments',
  TAGS: 'Tags',
  ARCHIVE_ALL_CONTACT: 'Lưu trữ tất cả thuê bao',
  EMAIL_ADDRESS: 'Địa chỉ email',
  LASTNAME: 'Họ',
  FIRSTNAME: 'Tên',
  ADDRESS: 'Địa chỉ',
  STREET: 'Phố',
  PROVINCE_CITY: 'Tỉnh/Thành phố',
  DISTRICT_TOWN: 'Quận/Huyện',
  PORTAL_ZIP: 'Portal/Zip',
  COUNTRY: 'Đất nước',
  PHONE_NUMBER: 'Số điện thoại',
  BIRTHDAY: 'Ngày sinh',
  STATUS: 'Trạng thái',
  EMPLOYEE_CODE: 'Mã nhân viên',
  FULLNAME: 'Họ và tên',
  CHOOSE_TAG: 'Chọn tag:',
  FIND_TAG: 'Tìm tag',
  ADD_CONTACT: 'Thêm thuê bao',
  DELETE_CONTACT: 'Xóa thuê bao',
  EDIT_CONTACT_INFO: 'Sửa thông tin hồ sơ',
  IMPORT_CONTACT: 'Import thuê bao',
  STATUS_NOT_SUB_CODE: 3,
  STATUS_SUB_CODE: 1,
  STATUS_CANCEL_SUB_CODE: 2,
  STATUS_ARCHIVED_CODE: 4,
  VIP_CODE: 1,
  NOT_VIP_CODE: 0,
  OVERALL: 'Tổng quan',
  STATUS_SUB: 'Đã đăng kí',
  STATUS_NOT_SUB: 'Chưa đăng kí',
  STATUS_CANCEL_SUB: 'Hủy đăng kí',
  STATUS_ARCHIVED: 'Đã lưu trữ',
  DEVELOPE: 'Tăng trưởng',
  LAST_DAY: 'ngày qua',
  LAST_YEAR: 'Năm qua',
  LAST_CAMPAIGN: 'Campaign gần đây',
  CAMPAIGN_ACTIVITY: 'Hoạt động của campaign',
  OPEN_PERCENTAGE: 'Tỉ lệ mở',
  CLICK_PERCENTAGE: 'Tỉ lệ click',
  TOP_LOCATION: 'Top địa điểm',
  SOURCE: 'Nguồn',
  CONTACT_QUALITY: 'Chất lượng thuê bao',
  CREATED_AT: 'Ngày thêm',
  CREATED_BY: 'Người thêm',
  UPDATED_BY: 'Người cập nhật',
  UPDATED_AT: 'Ngày cập nhật',
  FIND_SEGMENT: 'Tìm segment',
  CREATE: 'Tạo mới',
  EDIT: 'Sửa',
  SEGMENT_NAME: 'Tên segment: ',
  ACTION: 'Thao tác',
  RE_SUB: 'Đăng kí lại',
  ADD: 'Thêm',
  NOTE: 'Ghi chú',
  ALL_ACTIVITY: 'Tất cả hoạt động',
  LANGUAGE: 'Ngôn ngữ',
  LOCATION: 'Vị trí',
  CONTACT_NAME: 'Tên',
  INVALID: ' không hợp lệ.',
  NO_DATA: 'Không có dữ liệu',
  IMPORT_FIRST_CHOICE: 'File exel',
  IMPORT_SECOND_CHOICE: 'Sao chép từ file',
  IMPORT_FIRST_CODE: 1,
  IMPORT_SECOND_CODE: 2,
  CONTACT_STATUS: 'Trạng thái thuê bao',
  DETAIL: 'Chi tiết',
  COLUMN: 'cột',
  REMAIN: 'Còn',
  CHAR: 'kí tự',
  CONTACT_EXPORT_WORKSHEET_NAME: 'Danh sách thuê bao'
}

export const OBJ_CONDITION_AUDIENCE = [
  {
    'key': 'SUBCRIBER_DATA',
    'label': 'Dữ liệu thuê bao',
    'value': [
      {
        'key': 'CONTACT_RATING',
        'label': 'Rating thuê bao',
        'satisfys': [
          {
            'key': 'IS',
            'label': 'bằng'
          },
          {
            'key': 'IS_NOT',
            'label': 'khác'
          },
          {
            'key': 'IS_GREATER_THAN',
            'label': 'lớn hơn'
          },
          {
            'key': 'IS_LESS_THAN',
            'label': 'nhỏ hơn'
          }
        ],
        'conditions': [

        ]
      },
      {
        'key': 'DATE_ADDED',
        'label': 'Ngày thêm',
        'satisfys': [
          {
            'key': 'IS_AFTER',
            'label': 'sau'
          },
          {
            'key': 'IS_BEFORE',
            'label': 'trước'
          },
          {
            'key': 'IS',
            'label': 'bằng'
          },
          {
            'key': 'IS_WITHIN',
            'label': 'trong'
          },
          {
            'key': 'IS_NOT_WITHIN',
            'label': 'ngoài'
          }
        ],
        'conditions': [
          {
            'key': 'A_SPECIFIC_DATE',
            'label': 'thời gian cụ thể'
          }
        ]
      },
      {
        'key': 'INFO_CHANGED',
        'label': 'Thay đổi thông tin',
        'satisfys': [
          {
            'key': 'IS_AFTER',
            'label': 'sau'
          },
          {
            'key': 'IS_BEFORE',
            'label': 'trước'
          },
          {
            'key': 'IS',
            'label': 'bằng'
          },
          {
            'key': 'IS_WITHIN',
            'label': 'trong'
          },
          {
            'key': 'IS_NOT_WITHIN',
            'label': 'ngoài'
          }
        ],
        'conditions': [
          {
            'key': 'A_SPECIFIC_DATE',
            'label': 'thời gian cụ thể'
          }
        ]
      },
      {
        'key': 'CONTACT_STATUS',
        'label': 'Trạng thái thuê bao',
        'satisfys': [
          {
            'key': 'IS',
            'label': 'là'
          },
          {
            'key': 'IS_NOT',
            'label': 'không phải'
          }
        ],
        'conditions': [
          {
            'key': 'SUBSCRIBED',
            'label': 'Đã đăng ký'
          },
          {
            'key': 'UNSUBSCRIBED',
            'label': 'Đã huỷ đăng ký'
          },
          {
            'key': 'NON_SUBSCRIBED',
            'label': 'Chưa đăng ký'
          }
        ]
      }
    ]
  },
  {
    'key': 'MERGE_FIELDS',
    'label': 'Thông tin cá nhân',
    'value': [
      {
        'key': 'ADDRESS',
        'label': 'Địa chỉ',
        'satisfys': [
          {
            'key': 'CONTAINS',
            'label': 'chứa từ khoá'
          },
          {
            'key': 'DOES_NOT_CONTAIN',
            'label': 'không chứa từ khoá'
          },
          {
            'key': 'IS_BLANK',
            'label': 'rỗng'
          },
          {
            'key': 'IS_NOT_BLANK',
            'label': 'không rỗng'
          }
        ],
        'conditions': [

        ]
      },
      {
        'key': 'BIRTHDAY',
        'label': 'Ngày sinh',
        'satisfys': [
          {
            'key': 'MONTH_IS',
            'label': 'tháng sinh'
          },
          {
            'key': 'DAY_IS',
            'label': 'ngày sinh'
          },
          {
            'key': 'IS_DD_MM',
            'label': 'ngày tháng sinh (dd/mm)'
          },
          {
            'key': 'IS_BLANK',
            'label': 'rỗng'
          },
          {
            'key': 'IS_NOT_BLANK',
            'label': 'không rỗng'
          }
        ],
        'conditions': [

        ]
      },
      {
        'key': 'EMAIL_ADDRESS',
        'label': 'Địa chỉ Email',
        'satisfys': [
          {
            'key': 'IS',
            'label': 'là'
          },
          {
            'key': 'IS_NOT',
            'label': 'không phải'
          },
          {
            'key': 'CONTAINS',
            'label': 'chứa từ khoá'
          },
          {
            'key': 'DOES_NOT_CONTAIN',
            'label': 'không chứa từ khoá'
          },
          {
            'key': 'STARTS_WITH',
            'label': 'bắt đầu bằng từ khoá'
          },
          {
            'key': 'ENDS_WITH',
            'label': 'kết thúc bằng từ khoá'
          }
        ],
        'conditions': [

        ]
      },
      {
        'key': 'LAST_NAME',
        'label': 'Họ và tên',
        'satisfys': [
          {
            'key': 'IS',
            'label': 'là'
          },
          {
            'key': 'IS_NOT',
            'label': 'không phải'
          },
          {
            'key': 'CONTAINS',
            'label': 'chứa từ khoá'
          },
          {
            'key': 'DOES_NOT_CONTAIN',
            'label': 'không chứa từ khoá'
          },
          {
            'key': 'STARTS_WITH',
            'label': 'bắt đầu bằng từ khoá'
          },
          {
            'key': 'ENDS_WITH',
            'label': 'kết thúc bằng từ khoá'
          },
          {
            'key': 'IS_BLANK',
            'label': 'rỗng'
          },
          {
            'key': 'IS_NOT_BLANK',
            'label': 'không rỗng'
          }
        ],
        'conditions': [

        ]
      },
      {
        'key': 'PHONE_NUMBER',
        'label': 'Số điện thoại',
        'satisfys': [
          {
            'key': 'IS',
            'label': 'là'
          },
          {
            'key': 'IS_NOT',
            'label': 'không phải'
          },
          {
            'key': 'CONTAINS',
            'label': 'chứa từ khoá'
          },
          {
            'key': 'DOES_NOT_CONTAIN',
            'label': 'không chứa từ khoá'
          },
          {
            'key': 'STARTS_WITH',
            'label': 'bắt đầu bằng từ khoá'
          },
          {
            'key': 'ENDS_WITH',
            'label': 'kết thúc bằng từ khoá'
          },
          {
            'key': 'IS_BLANK',
            'label': 'rỗng'
          },
          {
            'key': 'IS_NOT_BLANK',
            'label': 'không rỗng'
          }
        ],
        'conditions': [

        ]
      },
      {
        'key': 'VIPS',
        'label': 'VIP',
        'satisfys': [
          {
            'key': 'IS_A_MEMBER_OF',
            'label': 'là VIP'
          },
          {
            'key': 'IS_NOT_A_MEMBER_OF',
            'label': 'không phải VIP'
          }
        ],
        'conditions': [

        ]
      }
    ]
  },
  {
    'key': 'TAGS',
    'label': 'Tags',
    'value': [
      {
        'key': 'TAGS',
        'label': 'Tags',
        'satisfys': [
          {
            'key': 'CONTACT_IS_TAGGED',
            'label': 'thuê bao chứa tag'
          },
          {
            'key': 'CONTACT_IS_NOT_TAGGED',
            'label': 'thuê bao không chứa tag'
          }
        ],
        'conditions': [

        ]
      }
    ]
  }
]
