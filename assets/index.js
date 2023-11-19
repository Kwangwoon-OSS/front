const baseURL =
	'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com';
const host = window.location.hostname === '127.0.0.1' ? baseURL : '/api';
console.log(window.location.hostname);

const access_token = window.localStorage.getItem('accessToken');

document.body.addEventListener('load', getData());

async function getData() {
	// 로그인 여부에 따라 로그인, 로그아웃 버튼 보이기
	const isLogin = window.localStorage.getItem('isLogin');
	// console.log(isLogin);
	if (isLogin == null) {
		console.log('로그인되지 않았습니다!');
	} else {
		console.log('로그인되었습니다!');
	}

	// 로그인 여부에 따라 새 글 작성 페이지로 이동 제한
	const newPostBtn = document.getElementById('header__menu__new__btn');
	newPostBtn.addEventListener('click', () => {
		if (isLogin === 1) {
			location.href = '../pages/post/new-post.html';
		} else {
			alert('로그인되지 않았습니다. 로그인해주세요😀');
		}
	});

	const loginBtn = document.getElementById('header__menu__login__btn');
	const profileImg = document.querySelector('.profile__img');
	const profileName = document.getElementById('user__nickname');
	if (isLogin == 1) {
		// alert('로그인!');

		// 프로필 이미지 보이기
		profileImg.classList.add('active');

		// 유저 이름 보이기
		await fetch(host + '/users/profile', {
			method: 'GET',
			headers: {
				Authorization: access_token,
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				} else {
					return res.json();
				}
			})
			.then((data) => {
				profileName.innerHTML = `&nbsp&nbsp ${data.nickname} 님`;
			});

		loginBtn.innerText = '로그아웃';
		loginBtn.addEventListener('click', () => {
			alert('로그아웃 되었습니다!');
			window.localStorage.removeItem('isLogin');
			window.location.href = '../index.html';
		});
	} else {
		// 프로필 이미지 숨기기
		profileImg.classList.remove('active');
		loginBtn.innerText = '로그인';
		loginBtn.addEventListener('click', () => {
			window.location.href = '../pages/Login.html';
		});
	}

	getPost(9);
	getSemester();
	getDepartmentDropMenu();
	getCardSlide();
	typeFilter();
	semesterFilter();
	departmentFilter();
}

// 로그인 여부 확인에 따라 접근 제한
async function checkLogin() {
	const isLogin = window.localStorage.getItem('isLogin');
	// console.log(isLogin);
	if (isLogin == null) {
		// console.log('로그인되지 않았습니다!');
		return 0;
	} else {
		// console.log('로그인되었습니다!');
		return 1;
	}
}

// 북마크
const bookmarkBtn = document.querySelector('.category__item__myBookmark');

bookmarkBtn.addEventListener('click', () => {
	checkLogin().then((data) => {
		if (data === 1) {
			fetch(host + '/posts/interestin', {
				method: 'GET',
				headers: {
					Authorization: access_token,
					'Content-Type': 'application/json;charset=UTF-8',
				},
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					document.querySelector('.content__card__item').innerHTML = '';
					for (let i = 0; i < data.length; i++) {
						setTemplate(data[i], i);
					}
				});
		} else {
			alert('로그인되지 않았습니다. 로그인해주세요😀');
		}
	});
});

// 필터링

// 학기 필터링
async function semesterFilter() {
	const semesterBtn = document.querySelector('.semester__options');
	semesterBtn.addEventListener('click', (e) => {
		// 로그인 여부 확인
		checkLogin().then((data) => {
			if (data === 1) {
				// 선택한 학기 알기
				let semester;
				const targetSemester = e.target.innerText;
				let inputYear;
				let inputSemester;

				inputYear = targetSemester.substr(0, targetSemester.indexOf('년'));
				inputSemester = targetSemester.substr(6, 1);

				// console.log(targetSemester);

				let semesterData;
				getSemesterID().then((data) => {
					semesterData = data;

					let semesterID;
					for (let i = 0; i < semesterData.length; i++) {
						if (
							inputYear === semesterData[i].years &&
							inputSemester === semesterData[i].semester
						) {
							semesterID = semesterData[i].id;
						}
					}
					fetch(host + '/posts/filter/' + semesterID)
						.then((res) => res.json())
						.then((data) => {
							let len = data.length;

							for (let i = 0; i < len; i++) {
								document.querySelector('.content__card__item').innerHTML = '';
								setTemplate(data[i], i);
							}
						});
				});
			} else {
				alert('로그인되지 않았습니다. 로그인해주세요😀');
			}
		});
	});
}

// 학과 필터링
async function departmentFilter() {
	const departmentBtn = document.querySelector('.department__options');
	departmentBtn.addEventListener('click', (e) => {
		// 로그인 여부 확인
		checkLogin().then((data) => {
			// console.log(data);
			if (data === 1) {
				const selectDept = e.target.innerText;

				let targetDeptID;
				getDeptID(selectDept).then((targetData) => {
					targetDeptID = targetData;

					fetch(host + '/posts/filter2/' + targetDeptID)
						.then((res) => res.json())
						.then((data) => {
							let len = data.length;
							// console.log(len);

							if (len > 0) {
								for (let i = 0; i < len; i++) {
									document.querySelector('.content__card__item').innerHTML = '';
									setTemplate(data[i], i);
								}
							} else {
								document.querySelector('.content__card__item').innerHTML = '';
								alert('관련 게시글이 없습니다.');
							}
						});
				});
			} else {
				alert('로그인되지 않았습니다. 로그인해주세요😀');
			}
		});
	});
}

// 과목명에 해당하는 학과 ID 가져오기
async function getDeptID(subjectName) {
	return fetch(host + '/department')
		.then((res) => res.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				if (subjectName === data[i].name) {
					return data[i].id;
				}
			}
		});
}

// 학기 ID 가져오기
async function getSemesterID() {
	return fetch(host + '/semester')
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
}

// 과목 ID 가져오기
async function getDepartmentID() {
	return fetch(host + '/department')
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
}

// 새로운 템플릿 생성
async function setTemplate(data, i) {
	// console.log('template', data);
	let subRes;
	let deptRes;
	let userName;

	let templateArr = [];

	getSubjectToDept(data.subject_id).then((subData) => {
		// 학과 이름을 알기 위해 과목 id로 가져온 학과 id
		subRes = subData;

		getDepartment(subRes).then((deptData) => {
			// 학과 이름
			deptRes = deptData;

			getUser(data.user_id).then((userData) => {
				// 유저 이름
				userName = userData;

				// 댓글 개수 가져오기
				fetch(host + '/posts/' + data.id + '/comment', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						Authorization: access_token,
					},
				})
					.then((res) => {
						if (!res.ok) {
							throw new Error(`HTTP error! Status: ${res.status}`);
						} else {
							return res.json();
						}
					})
					.then((commentData) => {
						// console.log(data.length);
						const template = [];

						const temp = data.deadline;
						const deadline = moment(temp).format('YYYY-MM-DD');

						template.push(
							`<li class="content__item" id="cardSubjectId__${i}" onclick="setCardID(this)">`,
						);
						// template.push(`<div class="item__save">`);
						// template.push(`<i
						// 						class="fa-regular fa-bookmark fa-2x"
						// 						style="color: var(--color-pink)"
						// 					></i>`);
						// template.push(`</div>`);
						template.push(`<div class="item__head">`);

						let type = data.type;
						// 타입별로 아이콘이 다름
						if (type === 'PROJECT') {
							template.push(
								`<div class="item__head__category" id="type__${type}" >`,
							);
							template.push(`<i class="fa-regular fa-folder-open"></i>`);
							template.push(`<span>&nbsp&nbsp</span>`);
							template.push(
								`<span class="item__category__title" >${type}</span>`,
							);
						} else if (type === 'STUDY') {
							template.push(
								`<div class="item__head__category" id="type__${type}" >`,
							);
							template.push(`<i class="fa-solid fa-book"></i>`);
							template.push(`<span>&nbsp&nbsp</span>`);
							template.push(
								`<span class="item__category__title" >${data.type}</span>`,
							);
						}
						template.push(`</div>`);
						template.push(`<div class="item__deadline">`);
						template.push(`<span>모집마감 | ${deadline}</span>`);
						template.push(`</div>`);
						template.push(`</div>`);
						template.push(`<div class="item__text">`);
						template.push(`<h3>${data.content}</h3>`);
						template.push(`</div>`);
						template.push(`<div class="item__tag">`);
						template.push(`<div class="tag__department">`);
						template.push(`<i class="fa-solid fa-school-flag"></i>`);
						template.push(`<span>&nbsp&nbsp</span>`);
						template.push(`<span id="department__text">${deptRes}</span>`);
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
						template.push(`<span>&nbsp&nbsp ${data.views}</span>`);
						template.push(`</div>`);
						template.push(`<div class="item__footer__comment">`);
						template.push(`<i class="fa-solid fa-comment-dots"></i>`);
						template.push(`<span>&nbsp&nbsp ${commentData.length}</span>`);
						template.push(`</div>`);
						template.push(`</div>`);
						template.push(`</div>`);
						template.push(`</li>`);

						templateArr[i] = template.join('');

						document.querySelector('.content__card__item').innerHTML +=
							templateArr[i];

						window.localStorage.setItem(`cardSubjectId__${i}`, data.id);
					});
			});
		});
	});
}

// 모집 분야 필터링
async function typeFilter() {
	const typeBtn = document.querySelector('.studyOrProject__category');
	typeBtn.addEventListener('click', (e) => {
		// 로그인 여부 확인
		checkLogin().then((data) => {
			// console.log(data);
			if (data === 1) {
				let cardIDArr = [];

				fetch(host + '/posts')
					.then((res) => res.json())
					.then((data) => {
						let len = data.length;

						// 선택한 타입 알기
						let type;
						if (e.target.innerText === 'PROJECT') {
							type = 'PROJECT';
						} else if (e.target.innerText === 'STUDY') {
							type = 'STUDY';
						} else {
							getPost(len);
						}

						// 현재 등록되어 있는 게시글 수만큼 반복하며 해당 타입의 글 ID만 배열에 저장
						let cardType;

						for (let i = 0; i < len; i++) {
							cardType = data[i].type;
							if (type === cardType) {
								cardIDArr.push(data[i].id);
							}
						}
						return cardIDArr;
					})
					.then((arr) => {
						// 새로운 템플릿 생성

						let len = arr.length;
						// let templateArr = [];

						document.querySelector('.content__card__item').innerHTML = '';
						for (let i = 0; i < len; i++) {
							let ID = arr[i];
							fetch(host + '/posts/' + ID)
								.then((res) => res.json())
								.then((data) => {
									setTemplate(data, i);
								});
						}
					});
			} else {
				alert('로그인되지 않았습니다. 로그인해주세요😀');
			}
		});
	});
}

// 과목 id로 학과 정보 가져오기
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

// 학과 id로 학과 이름 가져오기
async function getDepartment(deptID) {
	return fetch(host + '/department')
		.then((res) => res.json())
		.then((data) => {
			let departmentName;
			for (let i = 0; i < data.length; i++) {
				if (deptID === data[i].id) {
					departmentName = data[i].name;
					return departmentName;
				}
			}
		});
}

// 유저 정보 가져오기
async function getUser(userID) {
	return fetch(host + '/users/profile/' + userID)
		.then((res) => res.json())
		.then((data) => {
			window.localStorage.setItem('userID', data.id);
			let userName;
			userName = data.nickname;
			return userName;
		});
}

// 등록된 모든 게시글 가져오기
async function getPost(len) {
	fetch(host + '/posts')
		.then((res) => res.json())
		.then((data) => {
			for (let i = 0; i < len; i++) {
				document.querySelector('.content__card__item').innerHTML = '';
				setTemplate(data[i], i);
			}

			return data;
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

async function getDepartmentDropMenu() {
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
}

// 카드 슬라이드 정보 가져오기
async function getCardSlide() {
	fetch(host + '/posts/newposts')
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);

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

	// 로그인 여부 확인
	checkLogin().then((data) => {
		if (data === 1) {
			console.log(`로그인 여부 : ${data}`);
			// 가져온 subject ID로 해당 카드의 정보 불러온 후 선택된 카드의 과목 ID를 로컬스토리지에 저장
			fetch(host + '/posts/' + getSubjectID)
				.then((res) => res.json())
				.then((data) => {
					window.localStorage.setItem('selectID', data.id);
					window.location.href = '../pages/post_detail.html';
				});
		} else {
			alert('로그인되지 않았습니다. 로그인해주세요😀');
		}
	});
}

// 선택한 card의 과목 ID 가져오기 (메인 카드 그리드뷰)
async function setCardID(card) {
	const cardID = card.id; // 선택된 카드의 고유 ID

	const getSubjectID = window.localStorage.getItem(cardID); // 해당 카드의 subject ID 가져옴

	// 로그인 여부 확인
	checkLogin().then((data) => {
		if (data === 1) {
			console.log(`로그인 여부 : ${data}`);
			// 가져온 subject ID로 해당 카드의 정보 불러온 후 선택된 카드의 과목 ID를 로컬스토리지에 저장
			fetch(host + '/posts/' + getSubjectID)
				.then((res) => res.json())
				.then((data) => {
					window.localStorage.setItem('selectID', data.id);
					window.location.href = '../pages/post_detail.html';
				});
		} else {
			alert('로그인되지 않았습니다. 로그인해주세요😀');
		}
	});
}

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
