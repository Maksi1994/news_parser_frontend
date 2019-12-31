import * as _ from 'lodash';

export const state = () => ({

});

export const mutations = {
    initCookies(state) {
        _.forOwn(this.$cookies.getAll(), (val, key) => {
            state[key] = val
        });
    },
    set(state, data) {
        _.forOwn(data, (val, key) => {
            state[key] = val;
            this.$cookies.set(key, val);
        });
    },
};
