const baseURL =
	'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com';
const host = window.location.hostname === '127.0.0.1' ? baseURL : '/api';
console.log(window.location.hostname);

const access_token =
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqd3QiLCJpZCI6MSwiZXhwIjoxNzAxMjc3NTYyfQ.gKXtLZzZSP4I0Thm9ufn00tp-CmzSVh-kA-Gz1Nk5nsknjiiWQ6LdMhdPpeEIQetmOkBYXZmaOkhJJB-FkRmqg';

document.body.addEventListener('load', getData());

async function getData() {
	window.localStorage.setItem('access_token', access_token);
	getPost();
	getSubject();
	getSemester();
	getCardSlide();
}

// 과목 정보 가져오기
async function getSubjectToDept(subjectID) {
	// console.log(`input subject ID = ${subjectID}`);
	return fetch(host + '/subject')
		.then((res) => res.json())
		.then((data) => {
			let deptID;
			for (let i = 0; i < data.length; i++) {
				if (subjectID === data[i].id) {
					deptID = data[i].department_id;
					// console.log(deptID);
					return deptID;
				}
			}
		});
}

// 학과 정보 가져오기
async function getDepartment(deptID) {
	// console.log(`input dept ID = ${deptID}`);
	return fetch(host + '/department')
		.then((res) => res.json())
		.then((data) => {
			let departmentName;
			for (let i = 0; i < data.length; i++) {
				if (deptID === data[i].id) {
					departmentName = data[i].name;
					// console.log(departmentName);
					return departmentName;
				}
			}
		});
}

// 유저 정보 가져오기
async function getUser(userID) {
	// console.log(`input user ID = ${userID}`);
	return fetch(host + '/users/profile/' + userID)
		.then((res) => res.json())
		.then((data) => {
			let userName;
			userName = data.nickname;
			return userName;
		});
}

// 등록된 모든 게시글 가져오기
async function getPost() {
	fetch(host + '/posts')
		.then((res) => res.json())
		.then((data) => {
			const len = data.length;
			let templateArr = [];
			console.log(data);

			let subRes;
			let deptRes;
			let userName;

			for (let i = 0; i < 8; i++) {
				getSubjectToDept(data[i].subject_id).then((subData) => {
					subRes = subData;

					getDepartment(subRes).then((deptData) => {
						// console.log(`학과 이름 : ${data}`);
						deptRes = deptData;

						getUser(data[i].user_id).then((userData) => {
							userName = userData;

							const template = [];

							const temp = data[i].deadline;
							const deadline = moment(temp).format('YYYY-MM-DD');
							// console.log(deadline);

							template.push(
								`<li class="content__item" id="cardSubjectId__${i}" onclick="setCardID(this)">`,
							);
							template.push(`<div class="item__save">`);
							template.push(`<i
										class="fa-regular fa-bookmark fa-2x"
										style="color: var(--color-pink)"
									></i>`);
							template.push(`</div>`);
							template.push(`<div class="item__head">`);
							template.push(`<div class="item__head__category">`);
							template.push(`<i class="fa-regular fa-folder-open"></i>`);
							template.push(
								`<span class="item__category__title">${data[i].type}</span>`,
							);
							template.push(`</div>`);
							template.push(`<div class="item__deadline">`);
							template.push(`<span>모집마감 | ${deadline}</span>`);
							template.push(`</div>`);
							template.push(`</div>`);
							template.push(`<div class="item__text">`);
							template.push(`<h3>${data[i].content}</h3>`);
							template.push(`</div>`);
							template.push(`<div class="item__tag">`);
							template.push(`<div class="tag__department">`);
							template.push(`<i class="fa-solid fa-school-flag"></i>`);
							template.push(`<span id="semester__tag">${deptRes}</span>`);
							template.push(`</div>`);
							template.push(`</div>`);
							template.push(`<div class="item__line"></div>`);
							template.push(`<div class="item__footer">`);
							template.push(`<div class="item__footer__left">`);
							template.push(`<div class="item__footer__profile">`);
							template.push(`<i class="fa-regular fa-user"></i>`);
							template.push(`<span>&nbsp&nbsp${userName}</span>`);
							template.push(`</div>`);
							template.push(`</div>`);
							template.push(`<div class="item__footer__right">`);
							template.push(`<div class="item__footer__view">`);
							template.push(`<i class="fa-regular fa-eye"></i>`);
							template.push(`<span>&nbsp&nbsp${data[i].views}</span>`);
							template.push(`</div>`);
							template.push(`<div class="item__footer__comment">`);
							template.push(`<i class="fa-solid fa-comment-dots"></i>`);
							template.push(`<span>&nbsp&nbsp0</span>`);
							template.push(`</div>`);
							template.push(`</div>`);
							template.push(`</div>`);
							template.push(`</li>`);

							templateArr[i] = template.join('');

							document.querySelector('.content__card__item').innerHTML +=
								templateArr[i];
							// console.log(templateArr[i]);

							window.localStorage.setItem(`cardSubjectId__${i}`, data[i].id);
						});
					});
				});
			}
		});
}

// 과목 정보로 드롭메뉴 옵션 만들기
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

// 선택한 new post card의 과목 ID 가져오기 (따끈따끈한 글)
async function setID(newPostCard) {
	const newPostID = newPostCard.id; // 선택된 카드의 고유 ID
	const getSubjectID = window.localStorage.getItem(newPostID); // 해당 카드의 subject ID 가져옴

	// 가져온 subject ID로 해당 카드의 정보 불러온 후 선택된 카드의 과목 ID를 로컬스토리지에 저장
	await fetch(host + '/posts/' + getSubjectID)
		.then((res) => res.json())
		.then((data) => {
			window.localStorage.setItem('selectID', data.id);
			window.location.href = '../pages/post_detail.html';
		});
}

// 선택한 card의 과목 ID 가져오기 (메인 카드 그리드뷰)
async function setCardID(card) {
	const cardID = card.id; // 선택된 카드의 고유 ID

	const getSubjectID = window.localStorage.getItem(cardID); // 해당 카드의 subject ID 가져옴

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
//< ----- 밑에 포스트 카드 -------->
function getContentList() {
	// API 엔드포인트와 userId를 조합
	const apiUrl = host + '/posts';

	// fetch를 사용하여 서버로 데이터 요청
	fetch(apiUrl)
		.then((response) => {
			// 응답이 성공적인지 확인
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// JSON 형태로 응답을 파싱
			return response.json();
		})
		.then((data) => {
			// 가져온 데이터를 각 요소에 할당
			document.getElementById('item__category__title').textContent =
				data.content;
			document.getElementById('chk_text').textContent = data.status;
			document.getElementById('deadline').textContent = data.deadline;
			document.getElementById('content').textContent = data.content;
			document.getElementById('semester__tag').textContent = data.subject_id;
			document.getElementById('content').textContent = data.content;
			// 더 많은 데이터가 있다면 추가로 할당해주세요.
		})
		.catch((error) => {
			console.error('오류:', error);
		});
}
