<template>
    <div>
        <movie-search-form @search = "handleSearch"/>
        <p v-if="movies.length > 0 "> 
            Titles: {{movies.length}}
            <span class="sort">
                Sort by year:
                <input type="radio" id="descending" value="descending" v-model="sortOrder">
                <label for="descending">↓</label>
                <input type="radio" id="ascending" value="ascending" v-model="sortOrder" checked>
                <label for="ascending">↑</label>
            </span>
         </p>
         <p v-else-if="typeof image_array === 'undefined' && showMessage">{{message}}</p>
        <div class="row">
            
            <movie-list :movies = "sortMovies" /> 
        </div>
    </div>
</template>
<script>
import MovieList from '../components/MovieList'
import MovieSearchForm from '../components/MovieSearchForm'
import movieService from '../services/movie'
export default {
    components: {
        MovieList,
        MovieSearchForm
    },
    data() {
        return {
            movies: [],
            sortOrder: 'descending',
            message: 'No results found',
            showMessage: false
        }
    },
    methods: {
        handleSearch(searchParams){
            console.log(searchParams)
            this.search(searchParams);
        },
        async search({ title, type, year }) {
            this.movies = []
            const movies = await movieService.searchMovies(title, type, year);
            this.movies = movies;
            this.showMessage = true;
            
            
            
        }

    },
    computed: {
        sortMovies(){
            const sorted = this.movies.slice(0).sort((a, b) => {
               if(this.sortOrder === 'ascending'){
                   return a.Year - b.Year;
               }
               if(this.sortOrder === 'descending'){
                   return b.Year - a.Year;
               }
               
            });
            return sorted;
        }
    }
            
  

}

</script>
<style>
.sort {
    padding-left: 50px
}
 .row {
     flex: 1;
     flex-direction: row;
     display: flex;
 }
</style>