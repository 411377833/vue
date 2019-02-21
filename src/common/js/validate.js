
// 手机号验证
export function isvalidPhone(str) {
    const reg = /^1[3|4|5|8][0-9]\d{4,8}$/
    return reg.test(str)
  }