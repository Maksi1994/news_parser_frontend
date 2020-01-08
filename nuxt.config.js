module.exports = {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [
        '@node_modules/@fortawesome/fontawesome-free/css/all.css',
        '@node_modules/bootstrap/dist/css/bootstrap.css',
        '@node_modules/bootstrap-vue/dist/bootstrap-vue.css',
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@plugins/vue-bootstrap.js',
        '@plugins/vuelidate.js',
        '@plugins/ui-elements.js',
        '@plugins/axios.js'
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
        'cookie-universal-nuxt'
    ],
    axios: {
        baseURL: 'https://news-parser.com/api'
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    }
}
