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

// 진행학기
const semesterMenu = document.querySelector('.semester__menu');
const semesterBtn = document.getElementById('semester__list');
const semesterBtnText = document.querySelector('.semester__btn__text');
const semesterOptionList = document.getElementById('semester__option__list');

semesterBtn.addEventListener('click', () => {
	semesterMenu.classList.toggle('active');
});
semesterOptionList.addEventListener('click', () => {
	semesterOptionList.classList.toggle('click');
});

let semesterOption = semesterMenu.querySelector('.semester__options').children;
let semesterOptions = Array.from(semesterOption);

semesterOptions.forEach((semesterOption) => {
	semesterOption.addEventListener('click', () => {
		let selectedSemesterOption = semesterOption.querySelector(
			'.semester__option__text',
		).innerText;
		semesterBtnText.innerText = selectedSemesterOption;
		semesterMenu.classList.remove('active');
		semesterOptionList.classList.remove('click');
	});
});

// 학과
const departmentMenu = document.querySelector('.department__menu');
const departmentBtn = document.getElementById('department__list');
const departmentBtnText = document.querySelector('.department__btn__text');
const departmentOptionList = document.getElementById(
	'department__option__list',
);

departmentBtn.addEventListener('click', () => {
	departmentMenu.classList.toggle('active');
});
departmentOptionList.addEventListener('click', () => {
	departmentOptionList.classList.toggle('click');
});

let departmentOption = departmentMenu.querySelector(
	'.department__options',
).children;
let departmentOptions = Array.from(departmentOption);

departmentOptions.forEach((departmentOption) => {
	departmentOption.addEventListener('click', () => {
		let selectedDepartmentOption = departmentOption.querySelector(
			'.department__option__text',
		).innerText;
		departmentBtnText.innerText = selectedDepartmentOption;
		departmentMenu.classList.remove('active');
		departmentOptionList.classList.remove('click');
	});
});

// 과목
const subjectMenu = document.querySelector('.subject__menu');
const subjectBtn = document.getElementById('subject__list');
const subjectBtnText = document.querySelector('.subject__btn__text');
const subjectOptionList = document.getElementById('subject__option__list');

subjectBtn.addEventListener('click', () => {
	subjectMenu.classList.toggle('active');
});
subjectOptionList.addEventListener('click', () => {
	subjectOptionList.classList.toggle('click');
});

let subjectOption = subjectMenu.querySelector('.subject__options').children;
let subjectOptions = Array.from(subjectOption);

subjectOptions.forEach((subjectOption) => {
	subjectOption.addEventListener('click', () => {
		let selectedsubjectOption = subjectOption.querySelector(
			'.subject__option__text',
		).innerText;
		subjectBtnText.innerText = selectedsubjectOption;
		subjectMenu.classList.remove('active');
		subjectOptionList.classList.remove('click');
	});
});
