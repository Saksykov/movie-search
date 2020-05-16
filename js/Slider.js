import create from './create.js';
import Search from './Search.js';


export default {

    movies: [],
	value: '',
	mySwiper: null,

    init() {       

        this.wrapper = create('div', 'swiper-wrapper');              
        this.prev = create('div', 'swiper-button-prev');                 
        this.next = create('div', 'swiper-button-next');
        this.container = create('div', 'swiper-container', this.wrapper);
        this.swiper = create('section', 'swiper', [this.prev, this.container, this.next])
        document.body.appendChild(this.swiper);

        this.getMovieCard();             
    },
    
    async getMovie(page) {
        let response = await fetch(`https://www.omdbapi.com/?s=${this.value}&page=${page}&apikey=8d17e8a4`);
        let data = await response.json();
        return data;
    },

    getMovieCard() {
		this.getValue();
		
        this.getMovie(1).then(data => {
            if (parseInt(data.totalResults) <= 20) {
				this.wrapper.appendChild(this.createMovieCard(data, parseInt(data.totalResults)));
				this.initSwiper();
			}
            else {
				this.wrapper.appendChild(this.createMovieCard(data));
				console.log('искусевенно ограничил количество запросов, что бы не каждый раз не менять апи-кей');
                const count = 2; //Math.floor(parseInt(data.totalResults) / 10) - 1;
                for (let i = 0; i < count; i++) {
                    this.getMovie(i+2).then(res => {
						this.wrapper.appendChild(this.createMovieCard(res));
						if (i == count - 1) this.initSwiper();   						     
					});				 
				}	     
            }
        });
    },

    createMovieCard(data, n = 10) {                          
        const fragment = document.createDocumentFragment();                                                       
        for (let i = 0; i < n; i++) {
            this.movieTitle = create('div', 'movie-title', create('h2', '', `${data.Search[i].Title}`));
            const poster = data.Search[i].Poster === "N/A" ? '../assets/alt.jpg' : data.Search[i].Poster;
            this.moviePoster = create('div', 'movie-poster', create('img', '', '', null, ['src', `${poster}`], ['alt', `The movie titled: ${data.Search[i].Title}`]));
            this.movieYear = create('p', 'movie-year', `${data.Search[i].Year}`);
            this.movieElement = create('div', `swiper-slide`, [this.movieTitle, this.moviePoster, this.movieYear]);
            this.movies.push(this.movieElement);

            fragment.appendChild(this.movieElement);
        }     
        return fragment;              
    },

    initSwiper() {
        this.mySwiper =  new Swiper('.swiper-container', {
			observer: true,
            slidesPerView: 4,
            spaceBetween: 60,
			direction: 'horizontal',
			grabCursor: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            breakpoints: {
              319: {
                slidesPerView: 1,
              },
              450: {
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
	},

	destroySwiper() {
		if (this.mySwiper) {
			this.mySwiper.destroy();
			this.mySwiper = null;
		}	
	},
	
	getValue() {
		this.value = Search.value;
	}
}