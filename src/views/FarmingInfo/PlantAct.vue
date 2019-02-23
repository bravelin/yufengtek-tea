<!--种植活动-->
<template>
    <Plane class="plant-act-wrap act-wrap">
        <PlaneTitle>种植活动</PlaneTitle>
        <div class="plane-content">
            <PlantActPie></PlantActPie>
            <PlantActLine></PlantActLine>
        </div>
    </Plane>
</template>
<script>
    import PlantActPie from './PlantActPie'
    import PlantActLine from './PlantActLine'
    export default {
        name: 'farming-plant-act',
        components: {
            PlantActPie, PlantActLine
        }
    }
</script>
