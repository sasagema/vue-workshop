import axios from 'axios'

const QUERY_PARAMS = (title, type, year) => `?i=tt3896198&apikey=f915e4d&s=${title}&type=${type}&y=${year}`

class MovieService {
    constructor() {
        const instance = axios.create({
            baseURL: 'http://www.omdbapi.com/',
            headers: {Accept: 'application/json'}
        });
        
        this.apiClient = instance;
    }
    async searchMovies(title, type, year) {
        const { data } = await this.apiClient.get(QUERY_PARAMS(title, type, year));
        return data.Search;
    }
}
const movieService = new MovieService();

export default movieService;