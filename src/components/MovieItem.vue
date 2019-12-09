<template>
    <div @click="movieInfo(movie.imdbID)">
            {{ movie.Title}} ({{ movie.Year}}) <br/>
        <img v-if="movie.Poster === 'N/A'" src='../assets/noimage.png' width="170" height="250"/>
        <img v-else :src="movie.Poster" width="170" height="250"/>
        <br>
    </div>
</template>
<script>
export default {
    props: {
        movie: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    methods: {
        movieInfo(imdbID){
        console.log('MI ' + imdbID)
            this.$emit('movieID', imdbID);
        }
    }
}
</script>

