/**
 * Created by jason on 2016/12/2.
 */
import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import routes from './routes'
import mongoose from 'mongoose'
import util from 'util'
import _ from 'lodash'
import cors from 'cors'


/**
 * 全局log方法
 * @param obj
 */
global.log = (...obj) => {
  console.log(util.inspect(obj.length === 1 ? obj : obj.join(''), {
    depth: null,
    colors: true
  }))
}

/**
 * 全局自定义异常
 * @param status
 * @param msg
 * @returns {Error}
 */
global.customError = (status, msg) => {
  log(msg)
  if(typeof status == 'string') {
    msg = status
    status = null
  }
  let error = new Error(msg || '未知异常')
  error.status = status || 500
  return error
}

global.filterMongoValidateError = (err) => {
  log(err)
  if(!!err.errors) err.errors = _.mapValues(err.errors, 'message')
  return err
}

try{
  mongoose.connect('mongodb://localhost/qskjapi') // 连接数据库
} catch (err) {
  log(err)
}
mongoose.Promise = Promise

const app = express()

const port = process.env.PORT || 3003

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
routes(app)

app.get('/', (req,res) => {
  res.send('hello world')
})

app.listen(port, () => {
  log('app listening at localhost:', port)
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    
    res.status(err.status || 500);
    const errr = {
      message: err.message,
        ...err
    }
    res.json(errr);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
      ...err
  });
});

