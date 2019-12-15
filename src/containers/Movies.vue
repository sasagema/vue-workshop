<template>
    <div>
        <movie-search-form @search = "handleSearch"/>
        <p v-if="movies !== undefined && movies.length > 0"> 
            Titles: {{totalResults}}
            <span class="sort">
                Sort by year:
                <input type="radio" id="descending" value="descending" v-model="sortOrder">
                <label for="descending">↓</label>
                <input type="radio" id="ascending" value="ascending" v-model="sortOrder" checked>
                <label for="ascending">↑</label>
            </span>
         </p>
         <p v-if="showMessage">{{message}}</p>
        <div class="row">
            <movie-list :movies = "sortMovies" @movieImdbID = "handleMovieID"/> 
        </div>
        <button @click="handleLoadMore" :disabled="isPageEnd" v-if="currentPage > 0">{{currentPage}} of {{pageNumber}} Load more</button>
    </div>
</template>
<script>
import MovieList from '../components/MovieList'
import MovieSearchForm from '../components/MovieSearchForm'
import movieService from '../services/movie-api'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'


export default {
    name: "Movies",
    components: {
        MovieList,
        MovieSearchForm,
    },
    data() {
        return {
            movieData: {},
            sortOrder: 'descending',
            message: 'No results found'
        }
    },
    methods: {
       
        handleSearch(searchParams){
            console.log(searchParams)
            this.search(searchParams);
        },
        handleLoadMore() {
            console.log('Handle')
            this.$store.dispatch('loadMoreMovies')
        },
        //primer emmitovanja movieID iz MovieItem
        handleMovieID(movieID){
            console.log(movieID)
            this.getMovie(movieID)
        },
     /*    async search({ title, type, year }) {
            this.movies = []
            const movies = await movieService.searchMovies2(title, type, year);
            this.totalResults = movies.totalResults;
            this.movies = movies.Search;   
            
        }, */
        async search(params) {
            //this.movies = []
            //Sad je movies computed 
            this.$store.dispatch('searchMovies',params)
            //Sada se sami getteri mapiraju
            //this.totalResults = this.$store.getters.getTotalResults;
            //this.movies = this.$store.getters.getSearchResults;   
            
        },
        async getMovie(imdbID) {
            const data = await movieService.getMovie(imdbID);
            this.movieData = data;
            console.log(data)
            Swal.fire({
                title: data.Title + ' (' + data.Year + ')',
                text: data.Plot,
                html: '<b>Director: </b>' + data.Director + '<br>' + data.Plot + ' <br><b>Rating: ' + data.imdbRating + '</b>' ,
                imageUrl: data.Poster === 'N/A' ? 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/large/film-184890147._CB470041630_.png' : data.Poster,
                imageWidth: 170,
                imageHeight: 250,
            })
            /*alert(  'Title: '+ data.Title + 
                    '\nRating: ' + data.imdbRating +
                    '\nYear: ' + data.Year +
                    '\nPlot: ' + data.Plot );
            */
        }

    },
    computed: {
        ...mapGetters({
            movies: 'getSearchResults',
            totalResults: 'getTotalResults',
            currentPage: 'getCurrentPage',
            pageNumber: 'getPageNumber'
        }),
         isPageEnd() {
            return this.currentPage === this.pageNumber
        },
        showMessage(){
            if(this.movies === undefined){
                return true;
            }else{
                return false;
            }
        },
        sortMovies(){
            let sorted;
            if(this.movies === undefined){
                return sorted=[];
            }
            sorted = this.movies.slice(0).sort((a, b) => {
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

</style>