<template>
    <div class="text" @click="$router.push(link)">
 <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'logo',
        props: ['link']
    }
</script>

<style scoped>
    .text {
        cursor: pointer;
        text-decoration: none !important;
        color:#fff;
        border: none;
    }
</style>
