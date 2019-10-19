import { Message } from 'element-ui';
import { Notification } from 'element-ui';

export default {
    install(app){
        app.prototype.$_toast = toast
        app.prototype.$_notify = notify
    }
}
function notify(msg, type = "info", title = ""){
        Notification({
            message: msg,
            type,
            title
        })
    }
function toast(msg, type = "", duration = 1500) {
        Message({
            message: msg,
            type: type,
            duration: 1500,
            center: true
        })
    }
