<!--气候-->
<template>
    <Plane class="app-weather-info-wrap">
        <PlaneTitle>武夷气候</PlaneTitle>
        <div class="curr-time">{{ currTime }}</div>
        <div class="plane-content">
            <div class="weather"><em>9</em><i></i>晴天  17:02更新</div>
            <ul>
                <li><div>北风</div><div>2级</div></li>
                <li><div>相对湿度</div><div>26%</div></li>
                <li><div>气压</div><div>1020.5mb</div></li>
            </ul>
        </div>
    </Plane>
</template>
<script>
    import Plane from '@/components/Plane'
    import PlaneTitle from '@/components/PlaneTitle'
    import { formatTime } from '@/lib/util'
    export default {
        name: 'app-weather-info',
        components: {
            Plane, PlaneTitle
        },
        data () {
            return {
                currTime: ''
            }
        },
        created () {
            const that = this
            setInterval(() => {
                that.currTime = formatTime(new Date(), 'yyyy年MM月dd日 hh:mm:ss')
            }, 1000)
        }
    }
</script>