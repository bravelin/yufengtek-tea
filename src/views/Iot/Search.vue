<template>
    <div class="search-wrap">
        <div class="search-input"><i class="iconfont">&#xe62c;</i><input placeholder="搜索摄像头，监测站，智能水肥" type="text" @focus="doFocusInput()" v-model="curr" maxlength="30"/><button @click="doSearch()">搜索</button></div>
        <div class="search-list" :class="{ active: showSearchList }">
            <div class="search-type">
                <div :class="{ active: type == 'FM1' }" @click="doSelectType('FM1')"><img src="../../assets/images/4/9.png" />FM1</div>
                <div :class="{ active: type == 'CAMERA' }" @click="doSelectType('CAMERA')"><img src="../../assets/images/4/10.png" />摄像头</div>
            </div>
            <ul class="search-history" v-show="cacheSearchList.length">
                <li v-for="item in cacheSearchList" :key="item">{{ item }}</li>
            </ul>
            <div v-show="cacheSearchList.length" class="search-history-delete" @click="doDel()">删除历史</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'IotSearch',
        data () {
            return {
                curr: '',
                type: '',
                showSearchList: false,
                cacheSearchList: []
            }
        },
        created () {
            const that = this
        },
        methods: {
            doSelectType (type) {
                const that = this
                if (that.type == type) {
                    that.type = ''
                } else {
                    that.type = type
                }
            },
            doFocusInput () {
                this.showSearchList = true
            },
            doDel () {
                const that = this
                that.cacheSearchList = []
            },
            doSearch () {
                const that = this
                that.showSearchList = false
            }
        }
    }
</script>
