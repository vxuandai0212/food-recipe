import { Audience } from '@/types/audience';
import { ServiceType } from '@/types/common';
import { ContactStatusEnum, ImportedContactData, ImportError } from '@/types/contact';
import { Tag } from '@/types/tag';
import { AUDIENCE_TYPE } from '@/utils/constants/audience';
import { validEmail2, validOnlyNumber } from './validate';
import { parseTime } from '@/utils/common';
import { Campaign } from '@/types/campaign';
import { IMPORT_CONTACT_CONSTRAINT } from '@/utils/constants/contact';
import { getDate, getFirebaseAppsFrom } from '.';

export function getServiceTypeName(type: ServiceType): string {
  return new Map([
    [ServiceType.SMS, 'SMS'],
    [ServiceType.Email, 'Email'],
    [ServiceType.FCM, 'FCM'],
    [ServiceType.VTF, 'Viettel Family']
  ]).get(type) || '';
}
export function checkStringEmpty(str: string):boolean {
  return str !== undefined && str !== null && str.length > 0;
}
export function convertLongToDateTagCreate(value):any {
  const date = new Date(value);
  let hour = date.getHours();
  const minutes = date.getMinutes();
  let hc = 'AM';
  if (hour > 11) {
    hc = 'PM'
    if (hour > 12) {
      hour = hour - 12
    }
  }
  if (minutes < 10) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + ' ' + hour + ':0' + minutes + '' + hc
  } else {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + ' ' + hour + ':' + minutes + '' + hc
  }
}

export function contactStatusMap(): Map<ContactStatusEnum, string> {
  return new Map([
    [ContactStatusEnum.SUBSCRIBED, 'Đã đăng kí'],
    [ContactStatusEnum.NOT_YET_SUB, 'Chưa đăng kí'],
    [ContactStatusEnum.ARCHIVED, 'Đã lưu trữ']
  ]);
}

export function getImportContactTypeName(type: number) {
  return new Map([
    [AUDIENCE_TYPE.PERSONAL_SMS, 'số điện thoại'],
    [AUDIENCE_TYPE.PERSONAL_EMAIL, 'email'],
    [AUDIENCE_TYPE.PERSONAL_FCM, 'token'],
    [AUDIENCE_TYPE.BUSINESS, 'nhân viên']
  ]).get(type);
}
export function validateEmail(email:string | null | undefined): ImportError[] {
  const errors: ImportError[] = [];
  if (!email) {
    return [];
  } else if (email.length > IMPORT_CONTACT_CONSTRAINT.MAX_LENGTH_EMAIL) {
    errors.push(ImportError.EMAIL_MAX_LENGTH);
  } else {
    if (!validEmail2(email)) {
      errors.push(ImportError.EMAIL_INVALID);
    }
  }
  return errors;
}
export function validatePhone(phone: string | null | undefined): ImportError[] {
  const errors: ImportError[] = [];
  if (!phone) {
    return [];
  } else if (phone.length > IMPORT_CONTACT_CONSTRAINT.MAX_LENGTH_PHONE) {
    errors.push(ImportError.PHONE_MAX_LENGTH);
  } else if (!validOnlyNumber(phone)) {
    errors.push(ImportError.PHONE_INVALID);
  }
  return errors;
}
export function validateTokenInFcmType(token: string | undefined): ImportError[] {
  const errors: ImportError[] = [];
  if (!token) {
    errors.push(ImportError.TOKEN_EMPTY);
  } else if (token.length > IMPORT_CONTACT_CONSTRAINT.MAX_LENGTH_DEVICE_TOKEN) {
    errors.push(ImportError.TOKEN_MAX_LENGTH);
  }
  return errors;
}
export function validateFbKeyInFcmType(key: string | undefined): ImportError[] {
  const errors: ImportError[] = [];
  if (!key) {
    errors.push(ImportError.FB_KEY_EMPTY);
  } else if (key.length > IMPORT_CONTACT_CONSTRAINT.MAX_LENGTH_FIREBASE_KEY) {
    errors.push(ImportError.FIREBASE_KEY_MAX_LENGTH);
  }
  return errors;
}
export function validateEmpCodeInBusinessType(empCode: string | undefined): ImportError[] {
  const errors: ImportError[] = [];
  if (!empCode) {
    errors.push(ImportError.EMP_CODE_EMPTY);
  } else if (empCode.length > IMPORT_CONTACT_CONSTRAINT.MAX_LENGTH_EMPLOYEE_CODE) {
    errors.push(ImportError.EMP_CODE_MAX_LENGTH);
  }
  return errors;
}

function validateDob(dob: string | undefined | null) {
  const errors: ImportError[] = [];
  if (!dob) {
    return [];
  } else {
    const birthdayRegex = /^\d{1,2}\/\d{1,2}\/\d{4,}$/;
    if (!birthdayRegex.test(dob)) {
      errors.push(ImportError.BIRTHDAY_INVALID);
    } else {
      const date = getDate(dob);
      if (date && date > new Date()) {
        errors.push(ImportError.BIRTHDAY_AFTER_NOW);
      }
    }
    return errors;
  }
}

function validateFirebaseApps(firebaseAppsInput: string | null | undefined) {
  const errors: ImportError[] = [];
  const firebaseApps = getFirebaseAppsFrom(firebaseAppsInput);
  if (firebaseAppsInput && firebaseApps.length === 0) {
    errors.push(ImportError.FIREBASE_APP_INVALID);
  }
  if (firebaseAppsInput && firebaseApps.length > 0) {
    firebaseApps.forEach(fbApp => {
      if (!fbApp.fbAppCode) {
        errors.push(ImportError.FIREBASE_APP_CODE_EMPTY);
      } else if (fbApp.fbAppCode.length > IMPORT_CONTACT_CONSTRAINT.MAX_LENGTH_FIREBASE_APPCODE) {
        errors.push(ImportError.FIREBASE_APP_CODE_MAX_LENGTH);
      }
      if (fbApp.devices) {
        fbApp.devices.forEach(device => {
          if (device.deviceName && device.deviceName.length > IMPORT_CONTACT_CONSTRAINT.MAX_LENGTH_DEVICE_NAME) {
            errors.push(ImportError.FIREBASE_APP_DEVICE_NAME_MAX_LENGTH);
          }
          if (!device.token) {
            errors.push(ImportError.FIREBASE_APP_DEVICE_TOKEN_EMPTY);
          } else if (device.token.length > IMPORT_CONTACT_CONSTRAINT.MAX_LENGTH_DEVICE_TOKEN) {
            errors.push(ImportError.FIREBASE_APP_DEVICE_TOKEN_MAX_LENGTH);
          }
        })
      }
    })
  }
  return errors;
}

export function validateImportedContact(data: ImportedContactData, audienceType): ImportError[] {
  const errors: ImportError[] = [];
  if (audienceType === AUDIENCE_TYPE.PERSONAL_EMAIL) {
    if (!data.email) {
      errors.push(ImportError.EMAIL_EMPTY);
    }
  }
  if (audienceType === AUDIENCE_TYPE.PERSONAL_SMS) {
    if (!data.phone) {
      errors.push(ImportError.PHONE_EMPTY);
    }
  }
  if (audienceType === AUDIENCE_TYPE.PERSONAL_FCM) {
    errors.push(...validateTokenInFcmType(data.token));
    errors.push(...validateFbKeyInFcmType(data.firebaseKey));
  }
  if (audienceType === AUDIENCE_TYPE.BUSINESS) {
    errors.push(...validateEmpCodeInBusinessType(data.employeeCode));
    errors.push(...validateFirebaseApps(data.firebaseApps));
  }
  if (data.fullname && data.fullname.length > IMPORT_CONTACT_CONSTRAINT.MAX_LENGTH_FULLNAME) {
    errors.push(ImportError.FULLNAME_MAX_LENGTH);
  }
  errors.push(...validatePhone(data.phone));
  errors.push(...validateEmail(data.email));
  errors.push(...validateDob(data.dob));
  if (data.address && data.address.length > IMPORT_CONTACT_CONSTRAINT.MAX_LENGTH_ADDRESS) {
    errors.push(ImportError.ADDRESS_MAX_LENGTH);
  }
  if (data.tags) {
    data.tags.split('|').forEach(tag => {
      if (tag.length > IMPORT_CONTACT_CONSTRAINT.MAX_LENGTH_TAG_NAME) {
        errors.push(ImportError.TAG_NAME_MAX_LENGTH);
      }
    })
  }
  return errors.reduce((acc: ImportError[], value) => {
    if (acc.every(err => err !== value)) {
      acc.push(value);
    }
    return acc;
  }, [])
}

export function isTwoTagListHasDifferences(tagList1: Tag[] | null, tagList2: Tag[] | null) {
  if (!tagList1 && !tagList2) {
    return false;
  }
  if ((!tagList1 && tagList2) || (tagList1 && !tagList2)) {
    return true;
  }
  if (tagList1 && tagList2) {
    if (tagList1.length !== tagList2.length) {
      return true;
    }
    return !tagList1.every(tag1 => {
      return tagList2.some(tag2 => tag2.id === tag1.id);
    })
  }
}

export function getLogFromAudience(audience: Audience): string {
  if (audience && audience.createdAt && audience.createdBy) {
    const time = parseTime(new Date(audience.createdAt), '{w}, ngày {d} tháng {m} năm {Y}');
    return `Thêm mới ${time} bởi ${audience.createdBy}`;
  }
  return 'Loading audience log';
}

export function getLogFromCampaign(campaign: Campaign): string {
  if (campaign && campaign.updatedAt && campaign.updatedBy) {
    const time = parseTime(new Date(campaign.updatedAt), '{w}, ngày {d} tháng {m} năm {Y}');
    return `Chỉnh sửa ${time} bởi ${campaign.updatedBy}`
  }
  return 'Loading campaign log';
}

export function getImportErrorIconMap(): Map<ImportError, string> {
  return new Map([
    [ImportError.EMAIL_EMPTY, 'import-email-empty'],
    [ImportError.EMAIL_MAX_LENGTH, 'import-email-max-length'],
    [ImportError.EMAIL_INVALID, 'import-email-invalid'],
    [ImportError.PHONE_EMPTY, 'import-phone-empty'],
    [ImportError.PHONE_MAX_LENGTH, 'import-phone-max-length'],
    [ImportError.PHONE_INVALID, 'import-phone-invalid'],
    [ImportError.FB_KEY_EMPTY, 'import-fb-key-empty'],
    [ImportError.TOKEN_EMPTY, 'import-token-empty'],
    [ImportError.EMP_CODE_EMPTY, 'import-emp-code-empty'],
    [ImportError.BIRTHDAY_INVALID, 'import-birthday-invalid'],
    [ImportError.BIRTHDAY_AFTER_NOW, 'import-birthday-after-now'],
    [ImportError.FULLNAME_MAX_LENGTH, 'import-fullname-max-length'],
    [ImportError.ADDRESS_MAX_LENGTH, 'import-address-max-length'],
    [ImportError.TAG_NAME_MAX_LENGTH, 'import-tag-name-max-length'],
    [ImportError.FIREBASE_KEY_MAX_LENGTH, 'import-firebase-key-max-length'],
    [ImportError.TOKEN_MAX_LENGTH, 'import-token-max-length'],
    [ImportError.EMP_CODE_MAX_LENGTH, 'import-emp-code-max-length'],
    [ImportError.FIREBASE_APP_INVALID, 'import-firebase-app-invalid'],
    [ImportError.FIREBASE_APP_DEVICE_NAME_MAX_LENGTH, 'import-firebase-app-device-name-max-length'],
    [ImportError.FIREBASE_APP_CODE_EMPTY, 'import-firebase-app-appcode-empty'],
    [ImportError.FIREBASE_APP_CODE_MAX_LENGTH, 'import-firebase-app-appcode-max-length'],
    [ImportError.FIREBASE_APP_DEVICE_TOKEN_EMPTY, 'import-firebase-app-device-token-empty'],
    [ImportError.FIREBASE_APP_DEVICE_TOKEN_MAX_LENGTH, 'import-firebase-app-device-token-max-length']
  ]);
}
export function getImportContactErrorMap() {
  return new Map([
    [ImportError.EMAIL_EMPTY, 'Email không được để trống'],
    [ImportError.EMAIL_MAX_LENGTH, 'Email tối đa 200 ký tự'],
    [ImportError.EMAIL_INVALID, 'Phải có định dạng email'],
    [ImportError.FB_KEY_EMPTY, 'Firebase key không được để trống'],
    [ImportError.TOKEN_EMPTY, 'Token không được để trống'],
    [ImportError.EMP_CODE_EMPTY, 'Mã nhân viên không được để trống'],
    [ImportError.PHONE_EMPTY, 'Số điện thoại không được để trống'],
    [ImportError.PHONE_MAX_LENGTH, 'Số điện thoại tối đa 20 ký tự'],
    [ImportError.PHONE_INVALID, 'Số điện thoại chỉ chứa kí tự số'],
    [ImportError.BIRTHDAY_INVALID, 'Ngày sinh phải đúng định dạng dd/mm/yyyy'],
    [ImportError.BIRTHDAY_AFTER_NOW, 'Ngày sinh không được sau hôm nay'],
    [ImportError.FULLNAME_MAX_LENGTH, 'Họ tên tối đa 200 ký tự'],
    [ImportError.ADDRESS_MAX_LENGTH, 'Địa chỉ tối đa 500 ký tự'],
    [ImportError.TAG_NAME_MAX_LENGTH, 'Tên tag tối đa 100 ký tự'],
    [ImportError.FIREBASE_KEY_MAX_LENGTH, 'Firebase key tối đa 100 ký tự'],
    [ImportError.TOKEN_MAX_LENGTH, 'Token tối đa 100 ký tự'],
    [ImportError.EMP_CODE_MAX_LENGTH, 'Mã nhân viên tối đa 50 ký tự'],
    [ImportError.FIREBASE_APP_INVALID, 'Ứng dụng firebase không hợp lệ'],
    [ImportError.FIREBASE_APP_DEVICE_NAME_MAX_LENGTH, 'Ứng dụng firebase: tên thiết bị tối đa 200 kí tự'],
    [ImportError.FIREBASE_APP_CODE_EMPTY, 'Ứng dụng firebase: mã ứng dụng không được để trống'],
    [ImportError.FIREBASE_APP_CODE_MAX_LENGTH, 'Ứng dụng firebase: mã ứng dụng tối đa 50 kí tự'],
    [ImportError.FIREBASE_APP_DEVICE_TOKEN_EMPTY, 'Ứng dụng firebase: Token không được để trống'],
    [ImportError.FIREBASE_APP_DEVICE_TOKEN_MAX_LENGTH, 'Ứng dụng firebase: Token tối đa 100 kí tự']
  ])
}
