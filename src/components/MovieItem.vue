<template>
<div>
    <div >
            {{ movie.Title}} ({{ movie.Year}}) <br/>
        <div @click="getMovieInfo(movie.imdbID)">
            <img v-if="movie.Poster === 'N/A'" src='../assets/noimage.png' width="170" height="250"/>
            <img v-else :src="movie.Poster" width="170" height="250"/>  
        </div>
        <br>
        <button v-if="!isWatchlist" @click="addToWatchlist(movie)">Add to watchlist</button>
        <button v-else @click="removeFromWatchlist(movie)">Remove from watchlist</button>
    </div>
</div>
</template>
<script>
import Swal from 'sweetalert2'
import movieService from '../services/movie-api'

export default {
    props: {
        movie: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    computed: {
        isWatchlist() {
            console.log(this.$route.path)
            return this.$route.path === '/watchlist'?true:false
            
        }

    },
    methods: {
        movieInfo(imdbID){
        //Sad ne salje id nazad, nego direktno pristupa servisu
        console.log('MI ' + imdbID)
            this.$emit('movieID', imdbID);
        },
        addToWatchlist(movie) {
            console.log(movie)
            this.$store.dispatch('addToWatchlist', movie)
        },
        removeFromWatchlist(movie) {
            console.log(movie)
            this.$store.dispatch('removeFromWatchlist', movie)
        },
        getMovieInfo(imdbID) {
        //Sad ne salje id nazad, nego direktno pristupa servisu

            this.getMovie(imdbID)
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
        }

        }
}
</script>

