<template>
    <div class="grid-container">
        <movie-item class="grid-item" v-for="movie in movies" :key="movie.Id" :movie="movie" />

    </div>
</template>
<script>
import MovieItem from '../components/MovieItem'
export default {
    components: {
        MovieItem
    },
    props: {
        movies: {
            type: Array,
            required: true,
            default: () => []
        }
    }
}
</script>
<style>
.grid-container {
  display: grid;
  grid-column-gap: 10px;
    grid-row-gap: 10px;

  grid-template-columns: auto auto auto;
  padding: 10px;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 20px;
  text-align: center;
}
</style>
