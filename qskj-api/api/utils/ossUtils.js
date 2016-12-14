/**
 * Created by zhangjiasheng on 7/23/16.
 */
import {Wrapper as OSS } from 'ali-oss'
import multer from 'multer'
const storage = multer.memoryStorage()
import _ from 'lodash'
import uuid from 'node-uuid'

const ossConfig = {
  region: 'oss-cn-hangzhou',
  accessKeyId: 'D7wyxh0NcajbB9Bk',
  accessKeySecret: 'qIB03kCjbjC3q6WIO1rF6FQGIBr5uJ'
}

let client = new OSS({
	region: ossConfig.region,
	accessKeyId: ossConfig.accessKeyId,
	accessKeySecret: ossConfig.accessKeySecret
})

export const uploadSingle = (file) => {
	client.useBucket('qs-api')
	return client.put(`${uuid.v4()}.${file.mimetype.split('\/')[1]}`, file.buffer).then((res) => {
		return Promise.resolve(res.url)
	}).catch((err) => {
		console.log(err)
		return Promise.reject(err)
	})
}

export const uploadMultiple = (files) => {
	return Promise.all(_.map(files, (file) => {
		return uploadSingle(file)
	})).then((res) => {
		return Promise.resolve(res)
	}).catch((err) => {
		return Promise.reject(err)
	})
}

export const uploadMiddleware = multer({ storage: storage })

