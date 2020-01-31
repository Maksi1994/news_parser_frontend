<template>
    <section class="w-100">
        <h3 class="component-title">{{title}}</h3>

        <div class="contain content-container d-flex flex-wrap">
            <div class="card-item mb-3" v-for="a in list" :key="a.id">
                <b-card
                        :title="a.title"
                        :img-src="a.cover_img"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">

                    <nuxt-link class="d-table ml-auto" :to="'/news/one/'+ a.id">
                        <b-button  variant="primary">Read</b-button>
                    </nuxt-link>

                </b-card>
            </div>
        </div>

    </section>
</template>

<script>
    export default {
        props: ['list', 'title'],
    }
</script>

<style scoped lang="scss">
    .component-title {
        padding-left: 20px;
        margin-bottom: 30px;
    }

    .text {
        cursor: pointer;
        text-decoration: none !important;
        color: #fff;
        border: none;
    }

    .card-item {
        .card {
            height: 495px;
        }

        &:not(:nth-child(3n)) {
            margin-right: 75px;
        }

        .card-title {
            height: 85px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

    }

</style>
