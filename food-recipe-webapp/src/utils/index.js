/**
 * Created by PanJiaChen on 16/11/18.
 */
// import { COMMON } from '@/utils/constant'

/**
 * Parse seconds to "hh:mm:ss"
 * @returns {string}
 * @param {number} seconds
 */
export function parseSecondToTime(seconds) {
  if (seconds < 0 || (typeof (seconds) !== 'number')) {
    return '';
  }
  if (seconds === 0) {
    return '00:00:00';
  }
  const hour = Math.floor(seconds / (60 * 60));
  const min = Math.floor((seconds % (60 * 60)) / 60);
  const second = (seconds % 60);
  const formater = (num) => num.toString().padStart(2, '0');
  return `${formater(hour)}:${formater(min)}:${formater(second)}`;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 * @created by sopen_lampv
 */
import { COMMON } from './constant'
export function parseVNTime(time, vformat, pad, isFourDigitYear) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = vformat || '{d}/{m}/{y} {h}:{i}{a}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const hours = date.getHours()
  let formatObj
  if (isFourDigitYear) {
    formatObj = {
      d: date.getDate(),
      m: date.getMonth() + 1,
      y: date.getFullYear(),
      h: hours < 12 ? hours : hours - 12,
      i: date.getMinutes(),
      a: hours < 12 ? 'AM' : 'PM',
      w: date.getDay()
    }
  } else {
    formatObj = {
      d: date.getDate(),
      m: date.getMonth() + 1,
      y: date.getFullYear() % 100,
      h: hours < 12 ? hours : hours - 12,
      i: date.getMinutes(),
      a: hours < 12 ? 'AM' : 'PM',
      w: date.getDay()
    }
  }

  const time_str = format.replace(/{([dmyhiaw])+}/g, (result, key) => {
    const value = formatObj[key]
    if (key === 'w') {
      return [COMMON.SUNDAY, COMMON.MONDAY, COMMON.TUESDAY, COMMON.WEDNESDAY, COMMON.THURSDAY, COMMON.FRIDAY, COMMON.SATURDAY][value]
    }
    if (pad) {
      return value.toString().padStart(2, '0')
    }
    return value.toString()
  })
  return time_str
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * Remove all space in object properties if that property is a string
 * @param {object} source
 */
export function trimObject(source) {
  Object.keys(source).forEach(function(key) {
    source[key] = typeof source[key] === 'string' ? source[key].trim() : source[key]
  })
  return source
}
/**
 * convert Array of Object to String with separate
 * @param
 * @param
 */
export function convertArrayToStringWithSeparate(array, separate, field) {
  if (!array) return null
  const items = array.map(item => item[field])
  return items.join(separate)
}

// convert date from excel (number type) to JS Date
export function excelDateToJSDate(serial) {
  const utc_days = Math.floor(serial - 25569)
  const utc_value = utc_days * 86400
  const date_info = new Date(utc_value * 1000)

  const fractional_day = serial - Math.floor(serial) + 0.0000001

  let total_seconds = Math.floor(86400 * fractional_day)

  const seconds = total_seconds % 60

  total_seconds -= seconds

  const hours = Math.floor(total_seconds / (60 * 60))
  const minutes = Math.floor(total_seconds / 60) % 60

  return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds)
}

/**
 * @returns Date
 * @param {string} dateStr
 * string input dd/mm/yyyy
 */
export function getDate(dateStr) {
  const arr = dateStr.split('/');
  if (arr.length === 3) {
    const dayOfMonth = arr[0];
    const monthIndex = arr[1] - 1;
    const year = arr[2];
    return new Date(year, monthIndex, dayOfMonth);
  } else {
    return null;
  }
}

// /**
//  * @class
//  * @constructor
//  */
// class FirebaseApp {
//   constructor(){
//     this.fbAppCode =
//   }
// }

/**
 *
 * @param {string | undefined | null} str
 * @returns {{fbAppCode: string, devices: {deviceName: string, token: string}[]}[]}
 * VTF,token_1;Iphone 5,token_2;Iphone6|PMTC,token_3;Xiao Mi X,token_4;Samsung
 */
export function getFirebaseAppsFrom(str) {
  if (!str) {
    return [];
  }
  const appStrArr = str.split('|');
  const firebaseAppArr = [];
  appStrArr.forEach(appStr => {
    const appArr = appStr.split(',');
    if (appArr && appArr.length > 1) {
      const fbAppCode = appArr[0];
      const devices = [];
      appArr.slice(1).forEach(appInfo => {
        const appInfoArr = appInfo.split(';');
        const token = appInfoArr[0];
        const deviceName = appInfoArr.length > 1 ? appInfoArr[1] : null;
        devices.push({ token, deviceName })
      })
      firebaseAppArr.push({ fbAppCode, devices })
    }
  })

  return firebaseAppArr;
}
