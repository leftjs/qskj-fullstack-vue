/**
 * Created by jason on 2016/12/7.
 */
import requireDir from 'require-dir'
import _ from 'lodash'
export default (app) => {
  const dir = requireDir('.')
  _.mapValues(dir, item => {
    item.default(app)
  })
}