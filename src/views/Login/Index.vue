<template>
    <div class="page login-page">
        <Plane>
            <h2>武夷山市智慧茗园数据平台登录</h2>
            <div class="input-item account"><input ref="loginNameInput" :disabled="isProcessing" v-model="loginName" type="text" autocomplete="off" placeholder="请输入您的账号名称" maxlength="50" tabindex="1"/></div>
            <div class="input-item password"><input ref="passwordInput" :disabled="isProcessing" v-model="password" type="password" autocomplete="off" placeholder="请输入您的登录密码" maxlength="50" tabindex="2"/></div>
            <div class="login-button"><button @click="doLogin()">立即登录</button></div>
            <div class="login-tip" :class="{ active: showTip }">{{ tipStr }}</div>
        </Plane>
    </div>
</template>
<script>
    import StorageTags from '@/lib/storageTags'
    import types from '@/store/constants/types'

    const ls = localStorage
    export default {
        name: 'login-index',
        data () {
            return {
                loginName: '',
                password: '',
                isProcessing: false,
                tipStr: '',
                showTip: false,
                timer: null
            }
        },
        created () {
            const that = this
            const store = that.$store
            store.commit(types.SWITCH_LOADING, false)
            document.body.addEventListener('keypress', that.doPresskey)
        },
        mounted () {
            const that = this
            that.$nextTick(() => {
                const state = that.$store.state
                const loginName = state.userName
                const password = ls.getItem(StorageTags.password) || ''
                const refs = that.$refs
                setTimeout(() => {
                    refs.passwordInput.value = that.password = password
                    refs.loginNameInput.value = that.loginName = loginName
                    if (!loginName) {
                        refs.loginNameInput.focus()
                    } else if (!password) {
                        refs.passwordInput.focus()
                    }
                }, 800)
            })
        },
        methods: {
            showMessage (str) {
                const that = this
                that.tipStr = str
                if (that.timer) {
                    clearTimeout(that.timer)
                }
                that.showTip = true
                that.timer = setTimeout(() => {
                    that.showTip = false
                }, 3000)
            },
            // 执行登录
            doLogin () {
                const that = this
                const store = that.$store
                if (that.checkForm()) {
                    that.isProcessing = true
                    store.commit(types.SWITCH_LOADING, true)
                    that.$ajax({
                        url: '/data/user/login',
                        method: 'post',
                        data: {
                            username: that.loginName.trim(),
                            password: that.password.trim()
                        }
                    }).then(res => {
                        store.commit(types.SWITCH_LOADING, false)
                        if (res.code != 200) {
                            that.showMessage('您输入的账号或者密码不正确！')
                        } else {
                            that.showMessage('登录成功！')
                            const resData = res.repData
                            store.commit(types.UPDATE_USER_INFO, {
                                userToken: resData.tokenKey,
                                userId: '',
                                userName: that.loginName.trim(),
                                userRole: '',
                                password: that.password.trim()
                            })
                            setTimeout(() => { that.$router.push({ name: 'home' }) }, 500)
                        }
                        setTimeout(() => { that.isProcessing = false }, 100)
                    })
                }
            },
            // 校验表单
            checkForm () {
                const that = this
                const refs = that.$refs
                if (!that.loginName.trim()) {
                    refs.loginNameInput.focus()
                    that.showMessage('请输入您的账号！')
                    return false
                }
                if (!that.password.trim()) {
                    refs.passwordInput.focus()
                    that.showMessage('请输入密码！')
                    return false
                }
                return true
            },
            doPresskey (e) { // 回车按键
                if (e.keyCode === 13) {
                    this.doLogin()
                }
            }
        },
        beforeDestroy () { // 移除事件
            document.body.removeEventListener('keypress', this.doPresskey)
        }
    }
</script>
<style lang="scss">
    @import '../../style/views/login.scss';
</style>
