<template>
    <section class="main-page">
        <section class="w-100">
            <news-banner :list="list | slice(0, 6)"></news-banner>
        </section>

        <section class="container articles-groups mx-auto pt-5 d-flex py-5">
            <news-articles-group :list="list | slice(6)" class="news-aritcles-group"
                                 title="Latest News"></news-articles-group>
        </section>
    </section>
</template>

<script>
    import NewsBanner from '@/components/news/news-banner.vue';
    import NewsArticlesGroup from '@/components/news/news-articles-group.vue';

    export default {
        layout: 'frontend',
        data() {
            return {
                list: []
            }
        },
        async asyncData({$axios}) {
            const rez = await $axios.get('/news/get-latest-news');

            return {
                list: rez.data
            }
        },
        components: {
            NewsBanner,
            NewsArticlesGroup
        },
        filters: {
            slice(array, from, count) {
                return count ? array.slice(from, count) : array.slice(from) ;
            }
        }
    }
</script>

<style scoped>
    .main-page {
        margin-top: -44px;
    }

</style>
