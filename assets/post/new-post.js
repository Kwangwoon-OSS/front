const baseURL =
	'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com';
const host = window.location.hostname === '127.0.0.1' ? baseURL : '/api';
console.log(window.location.hostname);

// <======================== 드롭 메뉴 토글 ========================>
// 모집분야
const optionMenu = document.querySelector('.select__menu');
const selectBtn = document.getElementById('menu__list');
const category__btn__text = document.querySelector('.category__btn__text');
const optionList = document.getElementById('option__list');

selectBtn.addEventListener('click', () => {
	optionMenu.classList.toggle('active');
});
optionList.addEventListener('click', () => {
	optionList.classList.toggle('click');
});

let option = optionMenu.querySelector('.category__options').children;
let options = Array.from(option);
options.forEach((option) => {
	option.addEventListener('click', () => {
		let selectedOption = option.querySelector('.option__text').innerText;
		category__btn__text.innerText = selectedOption;
		//console.log(selectedOption);
		optionMenu.classList.remove('active');
		optionList.classList.remove('click');
	});
});

// 진행학기
const semesterMenu = document.querySelector('.semester__menu');
const semesterBtn = document.getElementById('semester__list');
const semesterBtnText = document.querySelector('.semester__btn__text');
const semesterOptionList = document.getElementById('semester__option__list');

// 과목
const subjectMenu = document.querySelector('.subject__menu');
const subjectBtn = document.getElementById('subject__list');
const subjectBtnText = document.querySelector('.subject__btn__text');
const subjectOptionList = document.getElementById('subject__option__list');

// 연락방법
const contactMenu = document.querySelector('.contact__menu');
const contactBtn = document.getElementById('contact__list');
const contactBtnText = document.querySelector('.contact__btn__text');
const contactOptionList = document.getElementById('contact__option__list');
const contactAltText = document.querySelector('.contact__input__box');

contactBtn.addEventListener('click', () => {
	contactMenu.classList.toggle('active');
});

contactOptionList.addEventListener('click', () => {
	contactOptionList.classList.toggle('click');
	contactAltText.classList.toggle('click');
});

let contactOption = contactMenu.querySelector('.contact__options').children;
let contactOptions = Array.from(contactOption);

contactOptions.forEach((contactOption) => {
	contactOption.addEventListener('click', () => {
		let selectedContactOption = contactOption.querySelector(
			'.contact__option__text',
		).innerText;
		contactBtnText.innerText = selectedContactOption;

		contactMenu.classList.remove('active');
		contactOptionList.classList.remove('click');
		contactAltText.classList.remove('click');
	});
});
const access_token =
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqd3QiLCJpZCI6MSwiZXhwIjoxNzAwODg3NzUzfQ.W705o2nKtft79aymybG_J25Vj9TSsPdkpgmcm5QqTPeFKr2uNn1cRQBY13miO7B_RS-hP1VjLyJAxZVHJVp6OQ';

// <======================== 과목 정보 받아온 후, 과목명 드롭메뉴로 추가 ========================>
document.body.addEventListener('load', getData());

async function getData() {
	// 과목 정보 받아오기
	fetch(host + '/subject')
		.then((response) => response.json())
		.then((data) => {
			const len = data.length;
			const template = [];

			// 과목명 드롭메뉴 옵션으로 추가
			for (let i = 0; i < len; i++) {
				subject_name = data[i].name;
				template.push(`<li class="subject__option">`);
				template.push(
					`<span class="subject__option__text">${subject_name}</span>`,
				);
				template.push(`</li>`);
			}
			document.getElementById('subject__option__list').innerHTML =
				template.join('');

			// 토글 생성 및 과목명 보이게
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

					// 과목명 보이게
					subjectBtnText.innerText = selectedSubjectOption;
					subjectMenu.classList.remove('active');
					subjectOptionList.classList.remove('click');
				});
			});
		});

	// 학기 정보 받아오기
	await fetch(host + '/semester')
		.then((res) => res.json())
		.then((data) => {
			const len = data.length;
			const template = [];

			let year;
			let semester;

			// 학기 드롭메뉴 옵션으로 추가
			for (let i = 0; i < len; i++) {
				year = data[i].years;
				semester = data[i].semester;

				template.push(`<li class="semester__option">`);
				template.push(`<i class="fa-solid fa-calendar-days"></i>`);
				template.push(
					`<span class="semester__option__text">${year}년 ${semester}학기</span>`,
				);
				template.push(`</li>`);
			}
			document.getElementById('semester__option__list').innerHTML =
				template.join('');

			// 토글 생성 및 과목명 보이게
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

// 선택한 과목 ID 가져오기
let subjectID;
const getSubjectID = function (subjectName) {
	return fetch(host + '/subject')
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Server response wasn't OK");
			}
		})
		.then((data) => {
			let len = data.length;
			for (let i = 0; i < len; i++) {
				if (subjectName === data[i].name) {
					subjectID = data[i].id;
				}
			}
			return subjectID;
		});
};

// 날짜 데이터 가져오기 (게시글 생성날짜로 사용)
const dateFormMaker = function () {
	const timestamp = new Date().getTime();
	const date = new Date(timestamp); //타임스탬프를 인자로 받아 Date 객체 생성
	return date;
};

// <======================== post로 보낼 객체 변수 생성 ========================>

// 등록하기 버튼 눌렀을 때
const submitBtn = document.querySelector('.submit__button');
submitBtn.addEventListener('click', () => {
	let selectSubjectID;
	getSubjectID(subjectBtnText.innerText).then((getID) => {
		selectSubjectID = getID;

		const people = document.getElementById('people__text').value;
		const dateInput = document.getElementById('deadline__text').value;
		const post_contact = document.getElementById('contact__alt__text').value;
		const post_title = document.getElementById('post__title__text').value;
		const post_content = document.getElementById('post__content__text').value;
		const category = document.querySelector('.select__btn').innerText;
		const subjectID = selectSubjectID;

		let selectCategory;
		if (category === '프로젝트') {
			selectCategory = 'PROJECT';
		} else if (category === '스터디') {
			selectCategory = 'STUDY';
		} else {
			alert('모집분야를 제대로 입력하세요');
		}
		// console.log(selectCategory);

		if (!people) {
			alert('모집인원을 입력하세요');
		} else if (!dateInput) {
			alert('모집마감일을 입력하세요');
		} else {
			// 모집마감일 유효성 검사
			let temp = moment(dateInput, 'YYYY-MM-DD');
			let today = moment().format('YYYY-MM-DD');
			let res = temp.diff(today, 'days');
			if (res <= 0) {
				alert('과거를 모집마감일로 할 수 없습니다. 다시 작성해주세요!');
			}
			const date = new Date(dateInput);
			console.log(date);

			// post 요청 보내기
			fetch(host + '/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: access_token,
				},
				body: JSON.stringify({
					title: post_title,
					content: post_content,
					status: 'ACTIVE',
					type: selectCategory,
					deadline: date,
					views: 0,
					contact: post_contact,
					people: people,
					subjectId: subjectID,
				}),
			}).then((res) => {
				// 성공적으로 게시글 등록 후 메인 페이지로 이동
				if (res.ok) {
					alert('새로운 글이 등록되었습니다!');
					setInterval((window.location.href = '../../index.html'), 1000);
				}
			});
		}
	});
});
