const baseURL =
	'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com';

const host = window.location.hostname === '127.0.0.1' ? baseURL : '/api';
console.log(window.location.hostname);

function ready() {
	// https://kihyeoksong.tistory.com/71 참고해서 작성
}

document.body.addEventListener('load', getData());

// 과목 정보 가져오기
async function getSubject() {
	fetch(host + '/subject')
		.then((response) => response.json())
		.then((data) => {
			const len = data.length;
			const template = [];

			// 과목명 드롭메뉴 옵션으로 추가
			for (let i = 0; i < len; i++) {
				const subjectName = data[i].name;
				template.push(`<li class="subject__option">`);
				template.push(
					`<span class="subject__option__text">${subjectName}</span>`,
				);
				template.push(`</li>`);
			}
			document.getElementById('subject__option__list').innerHTML =
				template.join('');

			// 선택 시 과목명 보이게
			const subjectBtn = document.getElementById('subject__list');
			const subjectMenu = document.querySelector('.subject__menu');
			const subjectOptionList = document.getElementById(
				'subject__option__list',
			);
			const subjectBtnText = document.querySelector('.subject__btn__text');

			subjectBtn.addEventListener('click', () => {
				subjectMenu.classList.toggle('active');
			});
			subjectOptionList.addEventListener('click', () => {
				subjectOptionList.classList.toggle('click');
			});

			let subjectOption =
				subjectMenu.querySelector('.subject__options').children;
			let subjectOptions = Array.from(subjectOption);

			subjectOptions.forEach((subjectOption) => {
				subjectOption.addEventListener('click', () => {
					let selectedSubjectOption = subjectOption.querySelector(
						'.subject__option__text',
					).innerText;

					subjectBtnText.innerText = selectedSubjectOption;
					subjectMenu.classList.remove('active');
					subjectOptionList.classList.remove('click');
				});
			});
		});
}

async function getData() {
	fetch(host + '/posts/newposts')
		.then((response) => response.json())
		.then((data) => {
			getSubject();

			// 따끈따근한 글 내용 보이기
			const len = data.length;
			const templateArr = [];

			// console.log(`length : ${len}`);
			// console.log(data);
			for (let i = 0; i < 6; i++) {
				// content_data = data[i].content;
				const template = [];

				// template.push(
				// 	`<article class="card__article swiper-slide" id="new__card">`,
				// );
				// template.push(`<div class="card__data">`);
				// template.push(`<div class="card__head">`);
				// template.push(`<div class="card__head__category">`);
				// template.push(`<i class="fa-regular fa-folder-open"></i>
				// <span>프로젝트</span>`);
				// template.push(`</div>`);
				// template.push(`<div class="card__head__deadline"><i class="fa-regular fa-hourglass-half"></i>
				// 							<span>마감 ${i}일 전</span>
				// </div>`);
				// template.push(`</div>`);
				// template.push(`<div class="card__date">`);
				// template.push(`<span>마감일 | 2023.09.30</span>`);
				// template.push(`</div>`);
				// template.push(`<div class="card__main">`);
				template.push(`<p class="card__description">`);
				template.push(`${data[i].content}`);
				template.push(`</p>`);
				// template.push(`</div>`);
				// template.push(`<div class="card__btn">
				// <a href="#" class="card__button">View More</a></div>`);
				// template.push(`</div>`);
				// template.push(`</article>`);

				templateArr[i] = template.join('');

				// h.push(`<p class = "card__description">${data[i].content}</p>`);///

				// document.getElementById(`test__${i + 1}`).innerHTML = template.join('');
			}

			// console.log(`0번째 html => ${templateArr[0]}`);
			// console.log(`1번째 html => ${templateArr[1]}`);
			for (let i = 0; i < 6; i++) {
				document.getElementById(`test__${i}`).innerHTML += templateArr[i];

				// 과목 id 로컬스토리지 저장
				window.localStorage.setItem(`subjectId__${i}`, data[i].id);
				// console.log(window.localStorage.getItem(`${i}__newCard`));
			}

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
		});
}

// newPost card 과목 ID 가져오기
async function setID(elem) {
	const newPostID = elem.id;
	const getSubjectID = window.localStorage.getItem(newPostID);

	await fetch(host + '/posts/' + getSubjectID)
		.then((res) => res.json())
		.then((data) => {
			window.localStorage.setItem('selectID', data.id);
			console.log(data);
			console.log(`title : ${data.title}`);
			window.location.href = '../pages/post_detail.html';
		});
}

// const btn = document.getElementById('card__detail__button');
// btn.onclick = function () {
// 	alert('!!');
// };

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
// const subjectMenu = document.querySelector('.subject__menu');
// const subjectBtn = document.getElementById('subject__list');
// const subjectBtnText = document.querySelector('.subject__btn__text');
// const subjectOptionList = document.getElementById('subject__option__list');

// subjectBtn.addEventListener('click', () => {
// 	subjectMenu.classList.toggle('active');
// });
// subjectOptionList.addEventListener('click', () => {
// 	subjectOptionList.classList.toggle('click');
// });

// let subjectOption = subjectMenu.querySelector('.subject__options').children;
// let subjectOptions = Array.from(subjectOption);

// subjectOptions.forEach((subjectOption) => {
// 	subjectOption.addEventListener('click', () => {
// 		let selectedsubjectOption = subjectOption.querySelector(
// 			'.subject__option__text',
// 		).innerText;
// 		subjectBtnText.innerText = selectedsubjectOption;
// 		subjectMenu.classList.remove('active');
// 		subjectOptionList.classList.remove('click');
// 	});
// });
