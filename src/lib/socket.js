import io from 'socket.io-client'
import Conf from '@/lib/config'

let socket = null
export default {
    init () {
        socket = io(Conf.socketUrl)
        socket.on('reconnecting', () => {
        })
        socket.on('connect', () => {
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