import https from 'https';

export default function ({$axios, store, $cookies, redirect}) {

    $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

    $axios.onRequest(config => {

        if (store.state.cookies.authToken) {
            config.headers.common['Authorization'] = 'Bearer ' + store.state.cookies.authToken;
        }

    });

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status);

        if (code === 400) {
            redirect('/400')
        }
    });
}
