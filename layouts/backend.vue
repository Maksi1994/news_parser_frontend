<template>
    <section>
        <backend-header></backend-header>
        <div>
            <Nuxt/>
        </div>
    </section>
</template>

<script>
    import BackendHeader from '@/components/backend-header.vue';

    export default {
        name: "backend",
        middleware: 'is-admin',
        components: {
            BackendHeader
        }
    }
</script>

<style scoped>

</style>
