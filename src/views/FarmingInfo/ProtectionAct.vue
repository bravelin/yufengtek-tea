<!--植保活动-->
<template>
    <Plane class="protection-act-wrap act-wrap">
        <PlaneTitle>植保活动</PlaneTitle>
        <div class="plane-content">
            <ProtectionActPie></ProtectionActPie>
            <ProtectionActLine></ProtectionActLine>
        </div>
    </Plane>
</template>
<script>
    import ProtectionActPie from './ProtectionActPie'
    import ProtectionActLine from './ProtectionActLine'

    export default {
        name: 'farming-fertilizer-act',
        components: {
            ProtectionActPie, ProtectionActLine
        }
    }
</script>