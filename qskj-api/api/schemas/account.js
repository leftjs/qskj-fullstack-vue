/**
 * Created by jason on 2016/12/2.
 */

import mongoose, {Schema} from 'mongoose'

//const PersonSchema = new Schema({
//  name: String,
//  age: Number,
//  stories: [{
//    type: Schema.Types.ObjectId,
//    ref: 'Story'
//  }]
//})
//
//const StorySchema = new Schema({
//  _creator: {
//    type: Schema.Types.ObjectId,
//    ref: 'Person'
//  },
//  title: String,
//  fans: [{
//    type: Schema.Types.ObjectId,
//    ref: 'Person'
//  }]
//})

const AccountSchema = new Schema({
  // 账号类型
  type: {
    type: String,
    default: 'person',
    enum: ['person', 'company']
  },
  email: {
    type: String,
    required: [true, '邮箱不能为空']
  },
  password: {
    type: String,
    required: [true, '密码不能为空']
  },
  
  // 公共属性
  address: String,
  
  // 个人属性
  name: String,
  
  // 公司属性
  companyName: String,
  licenseCode: String ,
  fixPhone: String, // 固话
  scanImage: String // 扫描件url
  
}, {
  timestamps: true,
  toJSON: {
    minimize: true
  }
})

AccountSchema.set('toJSON', {})


export const Account = mongoose.model('Account', AccountSchema)
