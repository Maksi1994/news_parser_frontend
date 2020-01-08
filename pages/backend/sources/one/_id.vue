<template>
    <section class="wrap-container pb-5 mx-auto">
      <div class="top-info">
           <b-img class="logo" left :src="source.logo" :alt="source.name"></b-img>

           <div class="basic-info">
              <h3 class="w-100 mb-4">{{source.name}}</h3>
              <p>Domain: {{source.source}}</p>
              <p>{{source.news_count}} articles</p>
              <p>Last launch: {{last_launch}}</p>
              <p>Active: {{source.active_parse ? 'Yes': 'No'}}</p>
              <p>Visible: {{source.show ? 'Yes': 'No'}}</p>
              <p>Implemented: {{source.implemented ? 'Yes': 'No'}}</p>
           </div>
      </div>
      <div class="d-flex w-1oo align-items-start pt-3">
          <b-card no-body class="w-50 mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" v-b-toggle.accordion-1 variant="info">Categories Map</b-button>
          </b-card-header>
          <b-collapse v-model="showSourceMap" id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-list-group>
          <b-list-group-item v-for="s in source.parsed_by_categories" :key="s.id" class="d-flex justify-content-between align-items-center">
            {{s.name}}
            <b-badge variant="primary" pill>{{s.articles_count}}</b-badge>
          </b-list-group-item>
        </b-list-group>
            </b-card-body>
          </b-collapse>
        </b-card>

        <b-button class="ml-auto mt-1 mb-5 mt-1 d-block" variant="danger" v-b-modal.modal-1>
            <i class="fas fa-trash mr-2"></i>
          Delete</b-button>

        <b-button class="mt-1 ml-5" variant="primary" @click="toggleEditingMode()">
            <i class="fas fa-pen mr-2" v-if="!editing"></i>
        {{editing ? 'Cancel': 'Edit'}}
        </b-button>
      </div>

      <source-editor class="mt-3 border-top" v-if="editing"
      :highlightValidation="0"
      :sourceData="source"
      @saveChanges="save($event)">
    </source-editor>
      <b-modal id="modal-1" title="Delete Source"  @ok="onDelete">
        <h5 class="my-4 p-2">Are you sure that you want to delete source?</h5>
      </b-modal>
    </section>
</template>

<script>
    import SourceEditor from '@/components/sources/source-editor.vue';
    import * as moment from 'moment';

    export default {
        layout: 'backend',
        computed: {
          last_launch() {
            return this.source.news[0]  ? moment(this.source.news[0].created_at).fromNow() : '_';
          }
        },
        data() {
            return {
              editing: false,
              showSourceMap:false,
              source: null
          }
        },
        async asyncData({params, $axios}) {
            const rez = await $axios.get('/backend/news-sources/get-one/' + params.id);

            return {
                source: rez.data
            }
        },
        watch: {
          editing() {
            if (this.editing) {
              this.showSourceMap = false;
            }
          }
        },
        methods: {
            toggleEditingMode() {
                this.editing = !this.editing;
            },
            async reload() {
                const rez = await this.$axios.get('/backend/news-sources/get-one/' + this.source.id);

                this.toggleEditingMode();
                this.source = rez.data;
            },
            async save(data) {
              const {data: {success}} = await this.$axios.post('/backend/news-sources/save', {
                id: this.source.id,
                  ...data
              });

              if (success) {
                this.reload();
              }
            },
            async onDelete() {
              const {data: {success}} = await this.$axios.get('/backend/news-sources/delete/' + this.source.id);

              if (success) {
                this.$router.push('/backend/sources');
              }
            }
        },
        components: {
          SourceEditor
        }
    }
</script>

<style scoped lang="scss">
  .wrap-container {
    width: 700px;

    .logo {
      width: 200px;
    }
  }

  .top-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
</style>
