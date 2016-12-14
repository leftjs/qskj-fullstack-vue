/**
 * Created by jason on 2016/12/12.
 */
export default {
  login(email, pass, cb) {
    cb = arguments[arguments - 1]
    if (localStorage.token) {
      if (cb) cb(true)
    }
  },
  loggedIn() {
    return !!localStorage.token``
  },
  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },
  
  onChange() {}
}