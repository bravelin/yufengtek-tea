import config from '@/lib/config'
import store from '@/store/index'
import ns from '@/store/constants/ns'
import types from '@/store/constants/types'

const socket = new WebSocket(config.refreshDataSocketUrl)
socket.onopen = function (e) {
    console.log('web socket open...')
}
socket.onmessage = function (e) {
    console.log('refresh socket message...', e)
}

socket.onerror = function (e) {
    console.log('refresh socket error....', e)
}

socket.onclose = function (e) {
    console.log('refresh socket close....', e)
}

socket.send = function (e) {
    console.log('refresh send successful...', e)
}
export default socket
