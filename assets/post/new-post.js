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

// subjectBtn.addEventListener('click', () => {
// 	subjectMenu.classList.toggle('active');
// });
// subjectOptionList.addEventListener('click', () => {
// 	subjectOptionList.classList.toggle('click');
// });

// let subjectOption = subjectMenu.querySelector('.subject__options').children;
// let subjectOptions = Array.from(subjectOption);
// console.log(subjectOptions);

// subjectOptions.forEach((subjectOption) => {
// 	subjectOption.addEventListener('click', () => {
// 		let selectedSubjectOption = subjectOption.querySelector(
// 			'.subject__option__text',
// 		).innerText;
// 		subjectBtnText.innerText = selectedSubjectOption;
// 		console.log(selectedSubjectOption);
// 		subjectMenu.classList.remove('active');
// 		subjectOptionList.classList.remove('click');
// 	});
// });

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

const baseURL =
	'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com';
const access_token =
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqd3QiLCJpZCI6MSwiZXhwIjoxNzAwODMxMzQwfQ.kkBfIz323RJp8uu4UlpGPg-nqdGReF17xx-TKPH1ntI_3OfG_0TKao5AIX7e9Bfu_aCyWLiSh_-dv6OT0Fydsg';

// <======================== 과목 정보 받아온 후, 과목명 드롭메뉴로 추가 ========================>
document.body.addEventListener('load', getSubject());

async function getSubject() {
	fetch(baseURL + '/subject')
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

			let subjectID;
			subjectOptions.forEach((subjectOption) => {
				subjectOption.addEventListener('click', () => {
					let selectedSubjectOption = subjectOption.querySelector(
						'.subject__option__text',
					).innerText;

					// 과목명 보이게
					subjectBtnText.innerText = selectedSubjectOption;
					// console.log(subjectBtnText.innerText);

					// 과목 id 가져오기
					for (let i = 0; i < len; i++) {
						if (subjectBtnText.innerText === data[i].name) {
							// console.log('ok');
							subjectID = data[i].id;

							console.log(subjectID);
						}
					}
					subjectMenu.classList.remove('active');
					subjectOptionList.classList.remove('click');
				});
			});
		});
}

async function getSubjectID() {
	fetch(baseURL + '/subject')
		.then((res) => res.json())
		.then((data) => {
			const len = data.length;
			// 과목 ID 가저오기
			const subjectID = 0;
			console.log(data[0].id);
			console.log(subjectBtnText.innerText);
			for (let i = 0; i < len; i++) {
				if (data[i].name === subjectBtnText.innerText) {
					subjectID = data[i].id;
					console.log(subjectID);
				}
			}
			console.log(subjectID);
		});
}

// <======================== post로 보낼 객체 변수 생성 ========================>
const semester = semesterBtnText.innerText;
const department = departmentBtnText.innerText;
const category = category__btn__text.innerText;
const people = document.getElementById('people__text').innerText;
const post_contact = contactBtnText.innerText;
const post_title = document.getElementById('post__title__text').innerText;
const post_content = document.getElementById('post__content__text').innerText;

// 등록하기 버튼 시 날짜 데이터 받아오기
const submitBtn = document.querySelector('.submit__button');
submitBtn.addEventListener('click', () => {
	// 날짜 데이터 받아오기
	const date = dateFormMaker();

	fetch(baseURL + '/posts', {
		method: 'POST',
		body: JSON.stringify({
			title: post_title,
			content: post_content,
			status: 'ACTIVE',
			deadline: date,
			views: 0,
			contact: post_contact,
			people: people,
			subjectId: 1,
		}),
		headers: {
			'Content-type': 'application/json;charset=UTF-8',
			Authorization: access_token,
		},
	})
		.then((response) => {
			if (response.status === 201) {
				alert('게시글이 등록되었습니다!');
				localStorage.setItem('access-token', access_token);
			}
		})
		.then((response) => response.json())
		.then((data) => console.log(data));
	//alert('게시글이 등록되었습니다!');
});

const dateFormMaker = function () {
	const timestamp = new Date().getTime();
	const date = new Date(timestamp); //타임스탬프를 인자로 받아 Date 객체 생성
	return date;

	/* 생성한 Date 객체에서 년, 월, 일, 시, 분을 각각 문자열 곧바로 추출 */
	let year = date.getFullYear().toString(); //년도 뒤에 두자리

	// console.log(date);
	// console.log(date.getMonth() + 1);
	// console.log('0' + (date.getMonth() + 1));

	let month = ('0' + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
	let day = ('0' + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
	let hour = ('0' + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
	let minute = ('0' + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
	let second = ('0' + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

	let returnDate = `${year}.${month}.${day}.${hour}:${minute}:${second}`;

	// console.log(`month : ${month}`);
	// console.log(returnDate);
};
