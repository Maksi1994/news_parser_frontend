<template>
    <section class="container">
        <div class="d-flex justify-content-between px-3 mb-5">
            <b-form-group class=" w-25 mb-0" id="input-group-3  " label="Source:">
                <b-form-select
                        class="mb-0"
                        value-field="id"
                        text-field="name"
                        v-model="sourceId"
                        :options="sources"
                        required
                ></b-form-select>
            </b-form-group>

            <b-input-group prepend="Search" class="align-self-end mb-sm-0 w-50">
                <b-input id="inline-form-input-username" placeholder="..."></b-input>

                <b-button class="ml-2"><i class="fas fa-search"></i> <i class="fas fa-times-circle"></i> </b-button>
            </b-input-group>
        </div>

        <div class="tags d-flex flex-wrap border-bottom px-3">
            <button type="button" class="btn mr-3 mb-3 shadow-sm"
                    @click="changeFilter('categoryId', c.id)"
                    :class="{
        'btn-success': categoryId == c.id,
        'btn-secondary': categoryId != c.id
      }" v-for="c in categories">
                {{c.name}} <span class="badge badge-light ml-2">{{c.articles_count}}</span>
            </button>
        </div>

        <div class="news-flow d-flex flex-wrap pt-5 px-3 justify-content-between">
            <div class="item news-item mb-3" v-for="(a, index) in news">
                <news-card :img-position="index % 2 === 0 ? 'left' : 'right'" :data="a"></news-card>
            </div>
        </div>

        <div class="d-flex pagination position-fixed mt-5 justify-content-center">
            <b-pagination
                    @change="changePage($event)"
                    v-model="meta.current_page"
                    :total-rows="meta.total"
                    :per-page="meta.per_page"
            ></b-pagination>
        </div>
    </section>
</template>

<script>
    import newsCard from '@/components/news/news-card.vue';

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
            },
            sourceId(val) {
                this.changeFilter('sourceId', val);
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
            changePage(page) {
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
        },
        components: {
            newsCard
        }
    }
</script>

<style scoped lang="scss">
    .source-select {
        margin-bottom: 0;
    }

    .fieldset {
        margin-bottom: 0;
    }

    .pagination {
        justify-content: center;
        background: #fff;
        position: fixed;
        bottom: -17px;
        width: 100%;
        height: 100px;
        left: 0;
        align-items: center;
        box-shadow: 0 0 5px 3px #d1d1d1;
    }

    .news-flow {
        padding-bottom: 150px;

        .news-item {
            width: 48%;
        }
    }
</style>
