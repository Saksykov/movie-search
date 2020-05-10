import create from './create.js';
import Search from './Search.js';
import Footer from './Footer.js';


export default {

    movies: [],
    value: '',
    page: 1,
    results: 0,

    init() {       
        this.value = Search.value; 
        this.movies = [];

        this.getMovie(this.page)
        .then(data => {
            this.wrapper = create('div', 'swiper-wrapper', this.createMovieCard(data));              
            this.prev = create('div', 'swiper-button-prev');                 
            this.next = create('div', 'swiper-button-next');
            this.container = create('div', 'swiper-container', this.wrapper);
            this.swiper = create('section', 'swiper', [this.prev, this.container, this.next]);

            document.body.appendChild(this.swiper);
            Footer.init();
            this.initSwiper();
        })
        
    },
    
    async getMovie(page) {
        let response = await fetch(`https://www.omdbapi.com/?s=${this.value}&page=${page}&apikey=80661894`);
        let data = await response.json();
        page++;
        return data;
    },

    createMovieCard(data) {    
        this.results = parseInt(data.totalResults);
        
        let count = 10;
        if (this.results < 50) count = this.results;
                
        while (count > 0) {
            let n = 10;                                                                           
            if (count < 10) n = count;
            for (let i = 0; i < n; i++) {
                this.movieTitle = create('div', 'movie-title', create('h2', '', `${data.Search[i].Title}`));
                this.moviePoster = create('div', 'movie-poster', create('img', '', '', null, ['src', `${data.Search[i].Poster}`], ['alt', `The movie titled: ${data.Search[i].Title}`]));
                this.movieYear = create('p', 'movie-year', `${data.Search[i].Year}`);
                this.movieElement = create('div', `swiper-slide`, [this.movieTitle, this.moviePoster, this.movieYear]);
                
                this.movies.push(this.movieElement);
            }
                
            count -= n;            
        }
        return this.movies;                     
    },

    initSwiper() {
        const mySwiper =  new Swiper('.swiper-container', {
            slidesPerView: 4,
            spaceBetween: 60,
            direction: 'horizontal',
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            breakpoints: {
              319: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              980: {
                slidesPerView: 3,
              },
              1278: {
                slidesPerView: 4,
              },
            }
        });
        return mySwiper;
    }
}