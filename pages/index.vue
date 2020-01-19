<template>
  <section class="main-page">
    <section class="w-100">
      <news-banner :list="list"> </news-banner>
    </section>

    <section class="container articles-groups mx-auto pt-5 d-flex py-5">
        <news-aritcles-group class="news-aritcles-group" :title="'Latest'"></news-aritcles-group>
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
        }
    }
</script>

<style scoped>
    .main-page {
      margin-top: -44px;
    }

    .articles-groups {
      news-aritcles-group {
        width: 40%;
      }
    }
</style>
