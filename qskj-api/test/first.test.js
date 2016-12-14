/**
 * Created by jason on 2016/12/11.
 */

import { should } from 'chai'
should()
describe('first test', () => {
  it('ok', () => {
    let a = Object.assign({}, {a: '123'})
    a.should.be.an('object')
  })
})