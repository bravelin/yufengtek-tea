import io from 'socket.io-client'
import Conf from '@/lib/config'
import store from '@/store/index'

let socket = null
export default {
    init () {
        console.log(store)
        socket = io(Conf.socketUrl)
        console.log(socket)
        socket.on('reconnecting', () => {
        })
        socket.on('connect', (e) => {
            console.log(e)
        })
        socket.on('reconnect', () => {
        })
        socket.on('disconnect', () => {
        })
        socket.on('connect_failed', () => {
        })
        socket.on('reconnect_failed', () => {
        })
        socket.on('reconnecting', () => {
        })
    }
}