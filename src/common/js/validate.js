
// 手机号验证
export function isvalidPhone(str) {
    const reg = /^1[3|4|5|8][0-9]\d{4,8}$/
    return reg.test(str)
  }

  //1-100内的优先级验证
  export function isPriorit(str) {
    const reg = new RegExp("^([1-9][0-9]{0,1}|100)$")
    return reg.test(str)
  }

  // 非中文正则匹配
  export function isIdCard(str) {
    const reg = /^[\w\s]+$/
    return reg.test(str)
  }


