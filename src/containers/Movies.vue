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
        <button>Load more</button>
    </div>
</template>
<script>
import MovieList from '../components/MovieList'
import MovieSearchForm from '../components/MovieSearchForm'
import movieService from '../services/movie'
import Swal from 'sweetalert2'

export default {
    components: {
        MovieList,
        MovieSearchForm,
    },
    data() {
        return {
            movies: [],
            movieData: {},
            sortOrder: 'descending',
            totalResults: 0,
            message: 'No results found'
        }
    },
    methods: {
        handleSearch(searchParams){
            console.log(searchParams)
            this.search(searchParams);
        },
        handleMovieID(movieID){
            console.log(movieID)
            this.getMovie(movieID)
        },
        async search({ title, type, year }) {
            this.movies = []
            const movies = await movieService.searchMovies2(title, type, year);
            this.totalResults = movies.totalResults;
            this.movies = movies.Search;   
            
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