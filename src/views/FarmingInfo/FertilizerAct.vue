<!--施肥活动-->
<template>
    <Plane class="fertilizer-act-wrap act-wrap">
        <PlaneTitle>施肥活动</PlaneTitle>
        <div class="plane-content">
            <FertilizerActPie></FertilizerActPie>
            <FertilizerActLine></FertilizerActLine>
        </div>
    </Plane>
</template>
<script>
    import FertilizerActPie from './FertilizerActPie'
    import FertilizerActLine from './FertilizerActLine'

    export default {
        name: 'farming-fertilizer-act',
        components: {
            FertilizerActPie, FertilizerActLine
        }
    }
</script>
