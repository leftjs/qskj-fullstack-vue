/**
 * Created by jason on 2016/12/2.
 */
import jwt from 'jsonwebtoken'
const SECRET = 'qskj-secret'
import {Account} from '../schemas/account'




function promisifyJwtVerify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, function(err, decoded) {
      if(err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}
export const verifyToken = async (token) => {
  return await promisifyJwtVerify(token)
}

const getTokenFromHeaderOrQuerystring = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null
}

/**
 * 根据id 生成token
 * @param id
 * @returns {*}
 */
export const signWithId = (id) => {
  return jwt.sign({id}, SECRET, { expiresIn: '30d'})
}

/**
 * 解析token
 * @param req
 * @param res
 * @param next
 */
export const decodeTokenToAccount = async (req, res, next) => {
  let token = getTokenFromHeaderOrQuerystring(req)
  try {
    let id = await verifyToken(token).id
    
    req.user = await Account.findOne({id})
  }catch(err) {
    console.log(err.message)
  }
  next()
}