import axios from 'axios'

const QUERY_PARAMS_SEARCH = (title, type, year, page = 1) => `?apikey=f915e4d&s=${title}&type=${type}&y=${year}&page=${page}`
const QUERY_PARAMS_MOVIE = (imdbID) => `?i=${imdbID}&apikey=f915e4d`
class MovieService {
    constructor() {
        const instance = axios.create({
            baseURL: 'http://www.omdbapi.com/',
            headers: {Accept: 'application/json'}
        });
        
        this.apiClient = instance;
    }
    async searchMovies(title, type, year) {
        const { data } = await this.apiClient.get(QUERY_PARAMS_SEARCH(title, type, year));
        return data.Search;
    }
    async searchMovies2(title, type, year) {
        const { data } = await this.apiClient.get(QUERY_PARAMS_SEARCH(title, type, year));
        return data;
    }
    async getMovie(imdbID) {
        const { data } = await this.apiClient.get(QUERY_PARAMS_MOVIE(imdbID));
        return data;
    }
}
const movieService = new MovieService();

export default movieService;