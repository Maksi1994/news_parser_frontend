<template>
    <section>
        <frontend-header></frontend-header>
        <div class="content mx-auto">
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
.content {
  margin-top: 100px;
}
</style>
