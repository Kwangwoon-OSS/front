const optionMenu = document.querySelector('.select__menu');
const selectBtn = document.getElementById('menu__list');
const category__btn__text = document.querySelector('.category__btn__text');
const optionList = document.getElementById('option__list');

// 진행학기
const semesterMenu = document.querySelector('.semester__menu');
const semesterBtn = document.getElementById('semester__list');
const semesterBtnText = document.querySelector('.semester__btn__text');
const semesterOptionList = document.getElementById('semester__option__list');

// 학과
const departmentMenu = document.querySelector('.department__menu');
const departmentBtn = document.getElementById('department__list');
const departmentBtnText = document.querySelector('.department__btn__text');
const departmentOptionList = document.getElementById(
	'department__option__list',
);

// 연락방법
const contactMenu = document.querySelector('.contact__menu');
const contactBtn = document.getElementById('contact__list');
const contactBtnText = document.querySelector('.contact__btn__text');
const contactOptionList = document.getElementById('contact__option__list');
const contactAltText = document.querySelector('.contact__input__box');

selectBtn.addEventListener('click', () => {
	optionMenu.classList.toggle('active');
});
optionList.addEventListener('click', () => {
	optionList.classList.toggle('click');
});

semesterBtn.addEventListener('click', () => {
	semesterMenu.classList.toggle('active');
});
semesterOptionList.addEventListener('click', () => {
	semesterOptionList.classList.toggle('click');
});

departmentBtn.addEventListener('click', () => {
	departmentMenu.classList.toggle('active');
});
departmentOptionList.addEventListener('click', () => {
	departmentOptionList.classList.toggle('click');
});

contactBtn.addEventListener('click', () => {
	contactMenu.classList.toggle('active');
});

contactOptionList.addEventListener('click', () => {
	contactOptionList.classList.toggle('click');
	contactAltText.classList.toggle('click');
});

let option = optionMenu.querySelector('.category__options').children;
let options = Array.from(option);

let semesterOption = semesterMenu.querySelector('.semester__options').children;
let semesterOptions = Array.from(semesterOption);

let departmentOption = departmentMenu.querySelector(
	'.department__options',
).children;
let departmentOptions = Array.from(departmentOption);

let contactOption = contactMenu.querySelector('.contact__options').children;
let contactOptions = Array.from(contactOption);

options.forEach((option) => {
	option.addEventListener('click', () => {
		let selectedOption = option.querySelector('.option__text').innerText;
		category__btn__text.innerText = selectedOption;
		//console.log(selectedOption);
		optionMenu.classList.remove('active');
		optionList.classList.remove('click');
	});
});

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

// 등록하기 버튼 시 날짜 데이터 받아오기
const submitBtn = document.querySelector('.submit__button');
submitBtn.addEventListener('click', () => {
	dateFormMaker();
	alert('게시글이 등록되었습니다!');
});

const dateFormMaker = function () {
	const timestamp = new Date().getTime();
	const date = new Date(timestamp); //타임스탬프를 인자로 받아 Date 객체 생성

	/* 생성한 Date 객체에서 년, 월, 일, 시, 분을 각각 문자열 곧바로 추출 */
	let year = date.getFullYear().toString(); //년도 뒤에 두자리

	let month = ('0' + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
	let day = ('0' + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
	let hour = ('0' + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
	let minute = ('0' + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
	let second = ('0' + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

	let returnDate = `${year}.${month}.${day}.${hour}:${minute}:${second}`;

	// console.log(`year:${year}`);
	// console.log(`month : ${month}`);
	console.log(returnDate);
};
