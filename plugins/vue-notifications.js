import Vue from 'vue'
import VueNotifications from 'vue-notifications'
import Noty from 'noty' // https://github.com/needim/noty
import 'noty/lib/noty.css'
import 'noty/lib/themes/sunset.css'
function toast({ title, message, type, timeout, cb }) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return new Noty({ theme: 'sunset', text: message, timeout, type }).show()
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)

Vue.mixin({
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: 'Success',
      timeout: 1000
    },
    showInfoMsg: {
      type: VueNotifications.types.info,
      title: 'Info'
    },
    showWarnMsg: {
      type: VueNotifications.types.warn,
      title: 'Warning'
    },
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: 'Error',
      timeout: 5000
    }
  }
})
