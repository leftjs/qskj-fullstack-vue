/**
 * Created by jason on 2016/12/7.
 */
import {Router} from 'express'
import {sendMail} from '../utils/mailUtils'
import {md5,getCaptcha} from '../utils/md5Utils'
import {decodeTokenToAccount, signWithId} from '../utils/auth'
import { Account } from '../schemas/account'
import _ from 'lodash'
function generateRoute() {
  const router = Router()
  
  // add routes
  /**
   * 下发验证码邮件验证邮箱
   */
  router.post('/send/validation/mail', async (req, res, next) => {
    let {email, salt} = req.body
    let captcha = getCaptcha(email, salt)
    try {
      let result = await sendMail(email,
          '青霜科技注册绑定邮箱验证码邮件,请勿回复',
          `<h1>亲爱的客户，您好！</h1><br><h3>您的绑定验证码是:</h3><p style="font-size: 20px; color: red;">${captcha}</p><br><p>本邮件由系统自动发送，请勿直接回复！</p><p>感谢您的访问，祝您使用愉快！</p><br><p>青霜科技</p><p><a href="http://www.greenicetech.cn">www.greenicetech.cn</a></p>`
      )
      res.json(_.merge({}, result, {salt}))
    }catch (err) {
      next(err)
    }
  })
  
  /**
   * 快速注册
   */
  router.post('/register', async (req, res, next) => {
    let { email, captcha, password, salt } = req.body
    if ( getCaptcha(email, salt) !== captcha ) return next(customError(400, '验证码不正确'))
    try{
      res.json(await Account.create({email,password: md5(password)}))
    }catch (err){
      next(filterMongoValidateError(err))
    }
  })
  
  /**
   * 登录
   */
  router.post('/login', async (req,res,next) => {
    let {email, password} = req.body
    try {
      let user = await Account.findOne({email, password: md5(password)})
      if (user) {
        res.json(await signWithId(user._id))
      }else throw customError(400, '邮箱或密码不正确')
    }catch (err) {
      next(filterMongoValidateError(err))
    }
  })
  
  /**
   * 完善信息
   */
  router.put('/detail/:id', async (req,res,next) => {
    let {
        // 公共
        address,
        type, // person or company
    
        // 个人
        name,
        // 公司
        companyName,
        licenseCode,
        fixPhone,
        scanImage,
    } = req.body
    let id = req.params['id']
    try {
      let result = await Account.update({_id: id}, {$set: {name, address, companyName, licenseCode, fixPhone, scanImage, type}}, { runValidators: true })
      if (result.ok > 0) {
        res.json(await Account.findOne({_id: id}))
      }
    }catch (err) {
      return next(filterMongoValidateError(err))
    }
  })
  
  
  return router
  
}

export default (app) => {
  app.use('/account', generateRoute())
}