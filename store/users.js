export const state = () => ({
    user: null
});

export const mutations = {
    setUser(state, userData) {
        state.user = userData;
    },

};

export const getters = {
    isAuth(state) {
        return !!state.user;
    },
    isAdmin(state, getters) {
        return getters.isAuth && state.user.is_admin;
    },
};


export const actions = {
    async login({commit, dispatch}, data) {
        const rez = await this.$axios.$post('/users/login', data);

        if (rez.success) {
            commit('cookies/set', {authToken: rez.access_token}, {root: true});

            dispatch('loadCurrUser');
        }

        return rez.success;
    },
    async loadCurrUser({commit, state, rootState}) {
        if (rootState.cookies.authToken) {
            const userData =  await this.$axios.$get('/users/get-curr-user');
            commit('setUser', userData);
        }
    },
    async logout({commit}) {
        await this.$axios.$get('/users/logout');

        commit('setUser', null);
        commit('cookies/set', {authToken: null}, {root: true});

        this.$router.push('/');
    }
};
