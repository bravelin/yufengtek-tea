<!--气候-->
<template>
    <Plane class="app-weather-info-wrap">
        <PlaneTitle>武夷气候</PlaneTitle>
    </Plane>
</template>
<script>
    import Plane from '@/components/Plane'
    import PlaneTitle from '@/components/PlaneTitle'
    export default {
        name: 'app-weather-info',
        components: {
            Plane, PlaneTitle
        },
        created () {
        }
    }
</script>