/**
 * Created by zhangjiasheng on 16/9/12.
 */
import crypto from 'crypto'

export const md5 = (text) => {
	return crypto.createHash('md5').update(text).digest('hex')
}

export const getCaptcha = (str, salt) => {
	let preStr = `${str}${salt}`
	let md5Str = md5(preStr)
  return md5Str.substring(md5Str.length - 4)
}