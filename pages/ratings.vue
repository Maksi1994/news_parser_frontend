<template>
    <section class="container mx-auto pb-5">
        <div class="d-flex justify-content-end mb-5">
            <b-button class="mt-5 mr-3 filter-item" v-if="list.length" block variant="outline-secondary" @click="toggleFilter('likeable')">Popular
            </b-button>
            <b-button class="mt-5 filter-item" v-if="list.length" block variant="outline-secondary" @click="toggleFilter('discussing')">
                Debatable
            </b-button>
        </div>


        <news-articles-group title="Most Popular" :list="list"></news-articles-group>
        <b-button class="mt-5" v-if="list.length" block variant="primary" @click="loadMore()">{{preloaderBtnTitle}}
        </b-button>
    </section>
</template>

<script>
    import NewsArticlesGroup from '@/components/news/news-articles-group.vue';

    export default {
        name: "ratings",
        layout: 'frontend',
        computed: {
            preloaderBtnTitle() {
                return this.loading ? 'Loading...' : 'Load More';
            },
        },
        data() {
            return {
                loading: false,
                filter: {
                    orderType: 'likeable',
                    order: 'desc',
                    page: 1
                },
                list: [],
                meta: null
            }
        },
        async asyncData({$axios, query, params}) {
            const reqData = {
                orderType: query.orderType,
                order: query.filter,
                page: params.page
            };

            const rez = await $axios.post('/news/get-popular', reqData);

            return {
                filter: reqData,
                list: rez.data.data,
                meta: rez.data.meta
            }
        },
        watch: {
            $route(to) {
                console.log(to);
            }
        },
        methods: {
            loadMore() {
                if (!this.loading) {
                    this.loading = true;
                    console.log('aaa');
                    this.load(this.meta.current_page + 1).then(() => {
                        this.loading = false;
                    });
                }
            },
            async load(page = 1) {
                let reqData = this.filter;
                reqData.page = page;

                const rez = await this.$axios.post('/news/get-popular', reqData);

                console.log(rez);

                this.list = page === 1 ? rez.data.data : this.list.concat(rez.data.data);
                this.meta = rez.data.meta;
            },
            toggleFilter(type) {
                this.filter.order = this.filter.orderType === type ? 'desc' : 'asc';
                this.filter.orderType = type;

                this.$router.push({
                    path: '/ratings',
                    query: this.filter
                })
            }
        },
        components: {
            NewsArticlesGroup
        }
    }
</script>

<style scoped>
        .filter-item {
            width: 150px;
            display: table;
            padding: 10px 40px;
        }
</style>
