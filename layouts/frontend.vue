<template>
    <section>
        <frontend-header></frontend-header>
        <div class="container mx-auto mt-5">
            <Nuxt/>
        </div>
    </section>
</template>

<script>
    import FrontendHeader from '@/components/frontend-header.vue';

    export default {
        name: "frontend",
        components: {
            FrontendHeader
        }
    }
</script>

<style scoped>

</style>
