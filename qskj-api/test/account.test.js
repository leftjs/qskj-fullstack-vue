/**
 * Created by jason on 2016/12/11.
 */
import { should } from 'chai'
import axios from 'axios'
import {md5,getCaptcha} from '../api/utils/md5Utils'
should()

const req = axios.create({
  baseURL: 'http://localhost:3003'
});

describe('test accounts', () => {
  
  
  let userId = ''
  
  it.skip('send validation mail', () => {
    return req.post('/account/send/validation/mail', {
      email: 'leftjs@foxmail.com',
      salt: 'test'
    }).then((res) => {
      
      
      console.log(res.data)
      res.data['accepted'].length.should.to.be.above(0)
      res.data['salt'].should.not.be.null
      
      
      //return res
    })
  })
  
  it('register will be ok', () => {
    let info = {
      email: 'leftjs@foxmail.com',
      password: '123',
      salt: '123',
      captcha: ''
    }
    info.captcha = getCaptcha(info.email, info.salt)
    return req.post('/account/register', info).then((res) => {
      userId = res.data._id
      res.status.should.equal(200)
    })
  })
  
  it('finish personal detail info', () => {
    const info = {
      address: '江苏省泰州市兴化市临城镇',
      name: '张小手',
      type: 'person'
    }
    return req.put(`/account/detail/${userId}`,info).then((res) => {
      res.data.should.have.deep.property('address', info.address)
      res.data.should.have.deep.property('name', info.name)
      res.data.should.have.deep.property('type', info.type)
      
    })
  })
  
  it('finish company detail info', () => {
    const info = {
      address: '江苏省泰州市兴化市临城镇',
      companyName: '青霜科技',
      licenseCode: '1123123',
      fixPhone: '010-123123',
      scanImage: 'http://www.baidu.com',
      type: 'company'
    }
    return req.put(`/account/detail/${userId}`,info).then((res) => {
      res.data.should.have.deep.property('address', info.address)
      res.data.should.have.deep.property('companyName', info.companyName)
      res.data.should.have.deep.property('type', info.type)
      res.data.should.have.deep.property('licenseCode', info.licenseCode)
      res.data.should.have.deep.property('fixPhone', info.fixPhone)
      res.data.should.have.deep.property('scanImage', info.scanImage)
      
    })
  })
  
  it('login will return token', () => {
    return req.post('/account/login', {
      email: 'leftjs@foxmail.com',
      password: '123'
    }).then(res => {
      res.data.should.be.length.above(1)
    })
  })
})