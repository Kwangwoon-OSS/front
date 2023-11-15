const baseURL =
	'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com';
const host = window.location.hostname === '127.0.0.1' ? baseURL : '/api';
console.log(window.location.hostname);

document.body.addEventListener('load', getData());

async function getData() {
	getSubject();
	getSemester();
	getCardSlide();
}

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

// 학기 정보 가져오기
async function getSemester() {
	fetch(host + '/semester')
		.then((response) => response.json())
		.then((data) => {
			const len = data.length;
			const template = [];

			// 과목명 드롭메뉴 옵션으로 추가
			for (let i = 0; i < len; i++) {
				const year = data[i].years;
				const semester = data[i].semester;

				template.push(`<li class="semester__option">`);
				template.push(`<i class="fa-solid fa-calendar-days"></i>`);
				template.push(
					`<span class="semester__option__text">${year}년 ${semester}학기</span>`,
				);
				template.push(`</li>`);
			}
			document.getElementById('semester__option__list').innerHTML =
				template.join('');

			// 선택 시 과목명 보이게
			const semesterBtn = document.getElementById('semester__list');
			const semesterMenu = document.querySelector('.semester__menu');
			const semesterOptionList = document.getElementById(
				'semester__option__list',
			);
			const semesterBtnText = document.querySelector('.semester__btn__text');

			semesterBtn.addEventListener('click', () => {
				semesterMenu.classList.toggle('active');
			});
			semesterOptionList.addEventListener('click', () => {
				semesterOptionList.classList.toggle('click');
			});

			let semesterOption =
				semesterMenu.querySelector('.semester__options').children;
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
		});
}

// 카드 슬라이드 정보 가져오기
async function getCardSlide() {
	fetch(host + '/posts/newposts')
		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			let templateArr = [];
			let dateTemplateArr = [];
			for (let i = 0; i < 6; i++) {
				// 카드 슬라이드 내용에 대한 템플릿 생성
				const template = [];
				template.push(`<p class="card__description">`);
				template.push(`${data[i].content}`);
				template.push(`</p>`);
				template.push(`</div>`);

				templateArr[i] = template.join('');

				// 마감일 포맷팅
				let deadline = data[i].deadline.substr(0, 10);
				let tempDeadline = moment(deadline, 'YYYY-MM-DD');
				let creatAt = data[i].createAt.substr(0, 10);
				let tempCreat = moment(creatAt, 'YYYY-MM-DD');
				let year = tempDeadline.format('YYYY');
				let month = tempDeadline.format('MM');
				let day = tempDeadline.format('DD');

				// 마감일 표시
				document.getElementById(
					`card__date__deadline__${i}`,
				).innerText = `마감일 | ${year}-${month}-${day}`;

				// 마감까지 남은 일수 계산
				let date = tempDeadline.diff(tempCreat, 'days');

				// 카드 슬라이드 마감까지 남은 일수에 대한 템플릿 생성
				const dateTemplate = [];
				dateTemplate.push(`<i class="fa-regular fa-hourglass-half"></i>`);
				dateTemplate.push(`<span>마감 ${date}일 전</span>`);

				dateTemplateArr[i] = dateTemplate.join('');
			}

			// 카드 슬라이드 수만큼 생성된 template들 추가
			for (let i = 0; i < 6; i++) {
				// 내용
				document.getElementById(`test__${i}`).innerHTML += templateArr[i];

				// 마감까지 남은 기간
				document.getElementById(`deadline__${i}`).innerHTML =
					dateTemplateArr[i];

				// 과목 id 로컬스토리지 저장 (선택된 카드 알기 위함)
				window.localStorage.setItem(`subjectId__${i}`, data[i].id);
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

// newPost card 과목 ID 가져오기 (view more 버튼 클릭 시 이벤트 함수)
async function setID(card) {
	const newPostID = card.id; // 선택된 카드의 고유 ID
	const getSubjectID = window.localStorage.getItem(newPostID); // 해당 카드의 subject ID 가져옴

	// 가져온 subject ID로 해당 카드의 정보 불러온 후 선택된 카드의 과목 ID를 로컬스토리지에 저장
	await fetch(host + '/posts/' + getSubjectID)
		.then((res) => res.json())
		.then((data) => {
			window.localStorage.setItem('selectID', data.id);
			window.location.href = '../pages/post_detail.html';
		});
}

// <============================ 드롭 메뉴 ============================>

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
