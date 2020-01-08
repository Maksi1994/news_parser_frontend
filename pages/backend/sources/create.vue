<template>
    <div class="container">
        <source-editor  class="w-75 mx-auto"
        @saveChanges="save($event)"
        :highlightValidation="false">
      </source-editor>
    </div>
</template>

<script>
    import SourceEditor from '@/components/sources/source-editor.vue';

    export default {
        layout: 'backend',
        components: {
            SourceEditor
        },
        methods: {
          async save(data) {
            const {data: {success, id}} = await this.$axios.post('/backend/news-sources/save', data);

            if (success) {
              this.$router.push('/backend/sources/one/' + id);
            }
          }
        }
    }
</script>

<style scoped>

</style>
