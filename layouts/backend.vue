<template>
    <section>
        <backend-header></backend-header>
        <div class="content">
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
  .content {
    margin-top: 100px;
  }
</style>
