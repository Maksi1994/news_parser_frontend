<template>
    <section class="layout-container">
        <frontend-header></frontend-header>
        <div class="content mx-auto">
            <Nuxt/>
        </div>

        <footer class="footer">
            <div class="container mx-auto">
                <b-nav small>
                    <b-nav-item>About</b-nav-item>
                    <b-nav-item to="/">Home</b-nav-item>
                    <b-nav-item to="/news">News</b-nav-item>
                </b-nav>
            </div>
        </footer>
    </section>
</template>

<script>
    import FrontendHeader from '@/components/frontend-header.vue';

    export default {
        name: "frontend",
        components: {
            FrontendHeader
        }
    }
</script>

<style scoped lang="scss">
    .content {
        margin-top: 100px;
        position: relative;
        z-index: 2;
    }

    .layout-container {
        position: relative;
        padding-bottom: 70px;
        min-height: 100vh;

        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            line-height: 60px;
            font-size: 20px;
            background-color: #f5f5f5;
        }

    }

</style>
