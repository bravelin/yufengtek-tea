<template>
    <div class="nav-menu">
        <div class="logo"><div>智所未见&nbsp;尽在未来</div></div>
        <ul class="menu">
            <router-link tag="li" :to="{ name: 'home' }">智慧全息</router-link>
            <router-link tag="li" :to="{ name: 'origin' }">物联监控</router-link>
            <router-link tag="li" :to="{ name: 'origin' }">种植分布</router-link>
            <router-link tag="li" :to="{ name: 'origin' }">农事活动</router-link>
            <router-link tag="li" :to="{ name: 'origin' }">出库入库</router-link>
            <router-link tag="li" :to="{ name: 'origin' }">溯源数据</router-link>
        </ul>
    </div>
</template>