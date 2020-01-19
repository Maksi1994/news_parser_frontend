<template>
  <section class="news-banner">
    <b-carousel

      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="480"
    >
    <nuxt-link v-for="a in list"  :key="a.id" :to="'/news/one/' + a.id" >
      <b-carousel-slide
        :caption="a.title"
        :img-src="a.cover_img"
      ></b-carousel-slide>
    </nuxt-link>
    </b-carousel>
  </section>
</template>

<script>

    export default {
        props: ['list'],
    }
</script>

<style lang="scss">
  .news-banner  {
    position: relative;

    .text {
        cursor: pointer;
        text-decoration: none !important;
        color:#fff;
        border: none;
    }

  .carousel:after {
    content: '';
    position: absolute;
    left:0;
    bottom:0;
    width: 100%;
    height: 40px;
    z-index: 1;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
  }

  .carousel-item img {
    height: 400px;
    object-position: center;
    object-fit: cover;
    }

  .carousel-caption h3 {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
  }

</style>
