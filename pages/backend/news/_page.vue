<template>
  <section class="container mx-auto">
    <div class="filters mb-5 mt-5 d-flex justify-content-end">
      <b-button class="mr-3" @click="setFilter('new')" :variant="orderType === 'new' ? 'success' : 'secondary'">Newest</b-button>
      <b-button @click="setFilter('source')" :variant="orderType === 'source' ? 'success' : 'secondary'">By Source</b-button>
    </div>

    <div class='table-content'>
      <b-table  striped hover @row-clicked="openArticle($event)" :items="previewList"></b-table>
    </div>

  <div class="pagination mt-5 pb-5">
    <b-pagination
        @change="changePage($event)"
        v-model="meta.current_page"
        :total-rows="meta.total"
        :per-page="20"
        aria-controls="my-table"
      ></b-pagination>
  </div>

 </section>
</template>

<script>
    import * as _ from 'lodash';
    import * as moment from 'moment';

    export default {
        layout: 'backend',
        computed: {
          previewList() {
            return _.map(this.list, ({id, title, created_at, source}) =>  {
              return {
                title,
                created_at: moment(created_at).fromNow(),
                source: source.name
              };
            });
          }
        },
        async asyncData({$axios, params, query}) {
            const rez = await $axios.post('/backend/news/get-list/', {
              page: params.page,
              order: 'desc',
              orderType: query.orderType || 'new'
            });

            return {
                list: rez.data.data,
                meta: rez.data.meta,
                orderType: query.orderType || 'new'
            }
        },
        watch: {
          $route({query}) {
            this.orderType = query.orderType;
            this.load();
          }
        },
        methods: {
            async load() {
              const rez = await this.$axios.post('/backend/news/get-list/', {
                page: this.meta.current_page,
                order: 'desc',
                orderType:'new'
              });

              this.list = rez.data.data;
              this.meta = rez.data.meta;
            },
            changePage(page) {
              this.$router.push({
                path: '/backend/news/' + page,
                query: { orderType: this.orderType }
              });
            },
            openArticle({title}) {
                const {id} = _.find(this.list, {title});

                this.$router.push('/backend/news/one/' + id);
            },
            setFilter(orderType) {
                this.$router.push({
                  path: '/backend/news/' + (orderType == this.orderType ? this.meta.current_page : 1),
                  query: { orderType: orderType }
                });
            }
        }
    }
</script>

<style scoped>
.table-content {
  padding-bottom: 150px;
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

    b-pagination {
      margin-bottom: 0;
    }
  }
</style>
