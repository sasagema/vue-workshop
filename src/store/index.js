import Vue from 'vue'
import Vuex from 'vuex'
import moviesService from '../services/movie-api'

Vue.use(Vuex);

const state = () => ({
    topRated: [],
    searchResults: [],
    totalResults: 0,
    pageNumber: 0,
    currentPage: 0,
    searchParams: {
        title: "",
        type: "",
        year: "",
    },
    watchlist: []
    
    

})
const getters = {
    getSearchResults: (state) => {
        return state.searchResults
    },
    getTotalResults: (state) => {
        return state.totalResults
    },
    getPageNumber: (state) => {
        return state.pageNumber
    },
    getCurrentPage: (state) => {
        return state.currentPage
    },
    getSearchParams: (state) => {
        return state.searchParams
    },
    getWatchlist: (state) => {
        return state.watchlist
    }
}
const actions = {
    async searchMovies({commit},params){
        const result = await moviesService.searchMovies(params)
        const data = {params, result}
        commit('SEARCH_MOVIES', data)
        
    },
    async loadMoreMovies({commit}) {

        if(this.state.currentPage < this.state.pageNumber) {
            console.log('loadMoreMovies IF')
            const nextPage = this.state.currentPage + 1
            const result = await moviesService.loadMoreMovies({...this.state.searchParams}, nextPage)
            commit('LOAD_MORE_MOVIES', result)          
        }
        
    },
    addToWatchlist({commit}, movie) {
        console.log("add " + movie)
        commit('ADD_TO_WATCHLIST', movie)
    },
    removeFromWatchlist({commit}, movie) {
        console.log("remove " + movie)
        commit('REMOVE_FROM_WATCHLIST', movie)
    }

}
const mutations = {
    SEARCH_MOVIES(state, {params, result}) {
        state.searchResults = result.Search
        state.totalResults = result.totalResults
        state.totalResults = result.totalResults
        //state.pageNumber = result.totalResults % 10 === 0?result.totalResults / 10:Math.floor(result.totalResults / 10) + 1

        state.pageNumber = Number.isInteger(result.totalResults / 10)?result.totalResults / 10:Math.floor(result.totalResults / 10) + 1
        state.currentPage = 1
        state.searchParams = {...params}
        console.log(state.searchParams)
    },
    LOAD_MORE_MOVIES(state, movies) {
        state.searchResults.push(...movies )
        state.currentPage++
    },
    ADD_TO_WATCHLIST(state, movie) {
        if(!state.watchlist.includes(movie)){
            state.watchlist.push(movie);
        }
        
    },
    REMOVE_FROM_WATCHLIST(state, movie) {
        state.watchlist = state.watchlist.filter((item) => item.imdbID !== movie.imdbID)
    }
    
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})