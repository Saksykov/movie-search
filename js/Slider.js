import create from './create.js';
import Search from './Search.js';
import Footer from './Footer.js';

export default {

    movies: [],
    value: '',
    page: 1,
    count: 0,
    inDOM: 4,

    init() {
        if (this.value != Search.value) {
            this.page = 1;
            this.value = Search.value;
            this.movies = [];
        }console.log(this.value);

        this.getMovie(this.value, this.page)
            .then(data => {
                for (let j = 0; j < 10; j++) {
                    let mov = [
                        data.Search[j].Title,
                        data.Search[j].Poster,
                        data.Search[j].Year
                    ];
                    this.movies.push(mov);
                }

                this.backArrow = create('img', 'back-arrow', '', null, ['src', '../assets/back.png']);
                this.back = create('div', 'back', this.backArrow);
                this.movieContainer = create('div', 'movie-container', this._createMovies(this.movies, this.count, this.inDOM));  
                this.forwardArrow = create('img', 'forward-arrow', '', null, ['src', '../assets/forward.png']);
                this.forward = create('div', 'forward', this.forwardArrow);
                this.container = create('div', 'slider-container', [this.back, this.movieContainer, this.forward]);
                this.slider = create('section', 'slider', this.container);
                
                document.body.appendChild(this.slider);
                Footer.init();
            });

        
    },
    
    async getMovie(value, page) {
        let response = await fetch(`https://www.omdbapi.com/?s=${value}&page=${page}&apikey=80661894`);
        let data = await response.json();
        return data;
    },

    _createMovies(arr, count, n) {
        const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";
        let res = [];
        for (let i = count; i < count + n; i++) {
            this.movieTitle = create('div', 'movie-title', create('h2', '', `${arr[i][0]}`));
            let poster = arr[i].Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : arr[i][1];
            this.moviePoster = create('div', 'movie-poster', create('img', '', '', null, ['src', poster], ['alt', `The movie titled: ${arr[i][0]}`]));
            this.movieYear = create('p', 'movie-year', `${arr[i][2]}`);
            this.movieElement = create('div', `movie element${i}`, [this.movieTitle, this.moviePoster, this.movieYear]);
            
            res.push(this.movieElement);
        }
        return res;       
    }    
}