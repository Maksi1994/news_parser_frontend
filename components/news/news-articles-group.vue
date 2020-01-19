<template>
  <section>
      <h3>{{title}}</h3>
  </section>
</template>

<script>
    export default {
        props: ['list', 'title'],
    }
</script>

<style scoped>
    .text {
        cursor: pointer;
        text-decoration: none !important;
        color:#fff;
        border: none;
    }
</style>
