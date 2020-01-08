<template>
  <section class="container mx-auto">
     <b-button class="ml-auto d-block mb-5" variant="primary" @click="$router.push('/backend/sources/create')">
       <i class="fas fa-plus mr-2"></i>
       Add New Source</b-button>
    <div class='table-content'>
      <b-table  striped hover @row-clicked="openSource($event)" :items="previewList"></b-table>
  </div>
 </section>
</template>

<script>
    import * as _ from 'lodash';
    export default {
        layout: 'backend',
        computed: {
          previewList() {
              return this.list.map(row => {
                return {
                  name: row.name,
                  implemented: (row.implemented) ? 'Yes' : 'No',
                  active: (row.active_parse) ? 'Yes': 'No',
                  visible: (row.show) ? 'Yes': 'No',
                }
              });
          }
        },
        data() {
            return {
                  list: null,
                  page: 1,
                  meta: null,
            }
        },
        async asyncData({params, $axios}) {
            const rez = await $axios.post('/backend/news-sources/get-list', {
              page: params.page || 1
            });

            return {
                list: rez.data.data,
                meta: rez.data.meta
            }
        },
        methods: {
            openSource({name}) {
              const {id} = _.find(this.list, ['name', name]);

              this.$router.push('/backend/sources/one/' + id);
            }
        }
    }
</script>

<style scoped>
  .table-content {
    min-height: 60vh;
  }
</style>
