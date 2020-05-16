import create from './create.js';
import Search from './Search.js';


export default {

    movies: [],
	value: '',
	mySwiper: null,
	apikey: '191a1c0b',

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
        let response = await fetch(`https://www.omdbapi.com/?s=${this.value}&page=${page}&apikey=${this.apikey}`);
        let data = await response.json();
        return data;
    },

    async getMovieCard() {
		this.getValue();
		let pages = 1;console.log('искусcтевенно ограничил количество запросов, что бы каждый раз не менять апи-кей');
		let n = 10;
        await this.getMovie(1).then(data => {
			const results = parseInt(data.totalResults); console.log(results);
			if (results !== results) {
				Search.searchInfo(this.value, false);
				n = 4;
				this.value = 'star wars';
			}
			else if (results < 10) {
				n = results;
				Search.searchInfo(this.value, true);
			}
			else {
				pages = 3; //Math.floor(results / 10);
				Search.searchInfo(this.value, true);		
			}
		});		
		await this.createMovieCard(pages, n);
		this.initSwiper(); 
    },

    async createMovieCard(pages, n) {                          
		for (let j = 1; j <= pages; j++) {
			await this.getMovie(j)
			.then(data => {
				for (let i = 0; i < n; i++) { 
					let fragment = document.createDocumentFragment();
					this.getRating(data.Search[i].imdbID)
					.then(res => {                                                      
        			    this.movieTitle = create('div', 'movie-title', create('a', '', create('h2', '', `${data.Search[i].Title}`), null, ['href', `https://www.imdb.com/title/${data.Search[i].imdbID}`], ['target', '_blank']));
        			    const poster = data.Search[i].Poster === "N/A" ? '../assets/alt.jpg' : data.Search[i].Poster;
        			    this.moviePoster = create('div', 'movie-poster', create('img', '', '', null, ['src', `${poster}`], ['alt', `The movie titled: ${data.Search[i].Title}`]));
						this.movieYear = create('p', 'movie-year', `${data.Search[i].Year}`);
						this.rating = create('p', 'movie-rating', `IMDB : ${res.Ratings[0].Value}`);
						this.movieInfo = create('div', 'movie-info', [this.movieYear, this.rating]);
        			    this.movieElement = create('div', `swiper-slide`, [this.movieTitle, this.moviePoster, this.movieInfo]);
						fragment.appendChild(this.movieElement);
						this.wrapper.appendChild(fragment);
					}); 		
				}  
			})       
		} 
	},
	
	async getRating(id) {
		const url = `https://www.omdbapi.com/?i=${id}&apikey=${this.apikey}`;
		let res = await fetch(url);
		let data = await res.json();
		return data;
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