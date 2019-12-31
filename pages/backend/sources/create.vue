<template>
    <source-editor v-if="data" :sourceData="data"></source-editor>
</template>

<script>
    import SourceEditor from '@/components/sources/source-editor.vue';

    export default {
        layout: 'backend',
        components: {
            SourceEditor
        },
        async asyncData({$axios}) {
           return {
               data: {
                   name: "AAAA"
               }
           }
        }
    }
</script>

<style scoped>

</style>
