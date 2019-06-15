<template>
    <div class="page login-custom-page">
        <div class="dialog">
            <h2>用户登录</h2>
            <input type="password" style="display:none" name="password"/>
            <input type="text" style="display:none" name="loginName"/>
            <div class="input-item account">
                <input ref="loginNameInput" :disabled="isProcessing" v-model="loginName" type="text" name="loginName" disableautocomplete autocomplete="off" maxlength="50" tabindex="1"/>
                <i></i><i></i><i></i><i></i>
            </div>
            <div class="input-item password">
                <input ref="passwordInput" :disabled="isProcessing" v-model="password" type="password" name="password" disableautocomplete autocomplete="new-password" maxlength="50" tabindex="2"/>
                <i></i><i></i><i></i><i></i>
            </div>
            <div class="remember" :class="{ active: loginRemember }" @click="switchLoginRemember()"><i class="iconfont">&#xe641;</i><div></div>记住密码</div>
            <div class="login-button"><button @click="doLogin()">登录</button></div>
            <div class="login-tip" :class="{ active: showTip }">{{ tipStr }}</div>
        </div>
        <div class="title">
            <h1 :class="{ active: showMainTitle }">武夷山市智慧茗园数据平台</h1>
            <h4 :class="{ active: showSubTitle }">基于物联网监控的大数据服务，为茶叶质量保驾护航</h4>
        </div>
    </div>
</template>
<script>
    import StorageTags from '@/lib/storageTags'
    import types from '@/store/constants/types'
    import initSocket from '@/lib/socket'

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
                timer: null,
                showMainTitle: false,
                showSubTitle: false,
                loginRemember: !(ls.getItem(StorageTags.loginRemember) == '0')
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

                setTimeout(() => { that.showMainTitle = true }, 1000)
                setTimeout(() => { that.showSubTitle = true }, 2000)
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
            switchLoginRemember () {
                const that = this
                that.loginRemember = !that.loginRemember
                if (that.loginRemember) { // 存用户名密码至ls
                    ls.setItem(StorageTags.userName, that.loginName)
                    ls.setItem(StorageTags.password, that.password)
                } else { // 从ls中清除用户名密码
                    ls.removeItem(StorageTags.userName)
                    ls.removeItem(StorageTags.password)
                }
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
                            const userType = {
                                'BS+': '2', 'DT': '1'
                            }
                            store.commit(types.UPDATE_USER_INFO, {
                                userToken: resData.tokenKey,
                                userId: '',
                                userName: that.loginName.trim(),
                                userRole: userType[resData.user_type] || '0',
                                password: that.password.trim(),
                                loginRemember: that.loginRemember,
                            })
                            setTimeout(() => { that.$router.push({ name: 'home' }) }, 500)
                            initSocket()
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
    @import '../../style/views/loginCustom.scss';
</style>
