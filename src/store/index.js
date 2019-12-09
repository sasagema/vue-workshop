import Vue from 'vue'
import Vuex from 'vuex'

const state = () => ({
    topRated: [],
    searchResult: [],
    

})
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})