<template>
    <section class="news-card">
        <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
                <b-col md="6" v-if="imgPosition === 'left'">
                    <nuxt-link :to="'/news/one/' + data.id">
                        <b-card-img :src="data.cover_img" class="rounded-0"></b-card-img>
                    </nuxt-link>
                </b-col>

                <b-col md="6" class="d-flex flex-column">
                    <b-card-body :title="data.title">
                        <b-card-text class="card-text">
                            {{data.short_content}}
                        </b-card-text>
                    </b-card-body>

                    <nuxt-link class="link" :to="'/news/one/' + data.id">
                        <b-button class="ml-auto d-block mb-3 mr-4 mt-auto" variant="info" size="sm">Read Article</b-button>
                    </nuxt-link>

                </b-col>

                <b-col md="6" v-if="imgPosition === 'right'">
                    <b-card-img  :src="data.cover_img" class="rounded-0"></b-card-img>
                </b-col>
            </b-row>
        </b-card>
    </section>
</template>

<script>
    export default {
        props: ['data', 'imgPosition']
    }
</script>

<style scoped>

    .link {
        text-decoration: none;
    }

    .news-card .card-title {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .news-card .card-text {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
