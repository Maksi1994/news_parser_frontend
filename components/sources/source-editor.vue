<template>
    <section>

    </section>
</template>

<script>
    export default {
        params: ['sourceData'],
        data() {
            return {
                form: this.sourceData
            }
        },
        methods: {
            save() {
                this.$emit('aaa', true);
            }
        },
    }
</script>

<style scoped>

</style>
