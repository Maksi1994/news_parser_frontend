<template>
    <section class="container one-article mx-auto mt-5">
        <one-article :data="data" @delete="onDelete"></one-article>
    </section>
</template>

<script>
    import oneArticle from '@/components/news/one-article.vue';

    export default {
        layout: 'frontend',
        async asyncData({params, $axios}) {
            const {data} = await $axios.get('/news/get-one/' + params.id);

            return {
                data
            }
        },
        methods: {
            async onDelete() {
                const {data: {success}} = await this.$axios.get('/backend/news/delete/' + this.data.id);

                if (success) {
                    this.$router.push('/backend/news');
                }
            }
        },
        components: {
            oneArticle
        }
    }
</script>

<style scoped>

</style>
