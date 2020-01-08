<template>
  <b-navbar class="fixed-top" toggleable="lg" type="dark" variant="info">
      <logo class="mr-5" link="/">Frontend</logo>

      <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
              <b-nav-item class="mr-3" active-class="active" to="/backend/sources">Sources</b-nav-item>
              <b-nav-item class="mr-3"  active-class="active" to="/backend/news">News</b-nav-item>
          </b-navbar-nav>
      </b-collapse>
  </b-navbar>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>
