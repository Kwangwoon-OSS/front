let swiperCards = new Swiper('.card__content', {
	loop: true,
	spaceBetween: 32,
	grabCursor: true,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	breakpoints: {
		600: {
			slidesPerView: 2,
		},
		968: {
			slidesPerView: 3,
		},
	},

	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
	},
});
