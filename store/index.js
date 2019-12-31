const cookieparser = process.server ? require('cookieparser') : undefined;


export const state = () => ({
    user: null
});

export const mutations = {};

export const getters = {


};

export const actions = {
    async nuxtServerInit ({ commit, dispatch }) {
        commit('cookies/initCookies');
        return dispatch('users/loadCurrUser');
    },

};
