<template>
     <div class="row">
            <movie-list :movies = "watchlist"/> 
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MovieList from './MovieList'
export default {
    components: {
        MovieList
    },
    computed: {
        ...mapGetters({
            watchlist: 'getWatchlist',
            pageNumber: 'getPageNumber'

        })
    }    
}
</script>
