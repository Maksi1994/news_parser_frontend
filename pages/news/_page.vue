<template>
  <section class="container">
    <div class="tags d-flex flex-wrap border-bottom px-3">
      <button type="button" class="btn mr-3 mb-3 shadow-sm"
      @click="changeFilter('categoryId', c.id)"
      :class="{
        'btn-success': categoryId == c.id,
        'btn-secondary': categoryId != c.id
      }"  v-for="c in categories">
      {{c.name}} <span class="badge badge-light ml-2">{{c.articles_count}}</span>
      </button>
    </div>
  </section>
</template>

<script>
    export default {
        layout: 'frontend',
        data() {
          return {
            sources: [],
            categories: [],
            news: [],
            meta: null,
            sourceId: null,
            categoryId: null
          }
        },
        async asyncData({$axios, params, query}) {
            const filtersData = await $axios.get('/news/get-filters/' + (query.sourceId || ''));
            const sourceId = filtersData.data.categories.length ? filtersData.data.categories[0].id : null;

            let categoryId = query.categoryId;
            let newsRez = [];

            if (!categoryId && filtersData.data.categories.length) {
              categoryId = filtersData.data.categories[0].id
            }

            if (categoryId) {
              newsRez = await $axios.post('/news/get-list/', {
                 page: params.page,
                 categoryId
              });
            }

            return {
                sources: filtersData.data.sources,
                categories: filtersData.data.categories,
                news: newsRez.data.data,
                meta: newsRez.data.meta,
                sourceId,
                categoryId
            };
        },
        watch: {
          $route() {
            this.load();
          }
        },
        created() {
          console.log(this.categoryId);
        },
        methods: {
          changeRoute(page, sourceId, categoryId) {
            this.$router.push({
              path: '/news/' + page,
              query: {
                categoryId: categoryId,
                sourceId: sourceId
              }
            })
          },
          chagPage(page) {
            this.meta.current_page = page;
            this.changeRoute(this.meta.current_page, this.sourceId, this.categoryId);
          },
          changeFilter(type, val) {
            this[type] = val;
            this.changeRoute(1, this.sourceId, this.categoryId);
          },
          async load() {
              const filtersData = await this.$axios.get('/news/get-filters/' + this.sourceId);
              const newsRez = await this.$axios.post('/news/get-list/', {
                 page: this.meta.current_page,
                 categoryId: this.categoryId
              });

              this.news = newsRez.data.data;
              this.meta = newsRez.data.meta;
              this.categories = filtersData.data.categories;
          }
        }
    }
</script>

<style scoped>

</style>
