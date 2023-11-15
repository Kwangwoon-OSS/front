const baseURL =
	'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com';

const host = window.location.hostname === '127.0.0.1' ? baseURL : '/api';
console.log(window.location.hostname);

const access_token =
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqd3QiLCJpZCI6NiwiZXhwIjoxNzAxMjc5MTE0fQ.L11n5VmUdHh0_YCYLDjcqupqJghPhhDje660foeRbOjM9GlHXU9nqNqqnXiUMaGzxR1-7-CXmUjM9TWrV_ZHQA';

const postID = window.localStorage.getItem('selectID');
console.log(postID);

document.body.addEventListener('load', getPostData());

// 작성자 이름 가져오기
const getWriter = function (userID) {
	return fetch(host + '/users/profile/' + userID)
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error("Server response wasn't OK");
			}
		})
		.then((data) => {
			return data.nickname;
		});
};

// 현재 접속한 유저의 프로필 가져오기
const getConnectUser = function () {
	return fetch(host + '/users/profile', {
		method: 'GET',
		headers: {
			Authorization: access_token,
		},
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error("Server response wasn't OK");
			}
		})
		.then((data) => {
			return data.nickname;
		});
};

// 과목명, 학과ID, 학기 정보 가져오기
const getSubjectData = function (subjectID) {
	return fetch(host + '/subject')
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw new Error("Server response wasn't OK");
			}
		})
		.then((data) => {
			let len = data.length;
			for (let i = 0; i < len; i++) {
				if (subjectID == data[i].id) {
					return data[i];
				}
			}
		});
};

// async function book() {
// 	fetch(host + '/posts/interestin')
// 		.then((res) => res.json())
// 		.then((data) => {
// 			console.log(data);
// 		});
// }
// book();

async function getPostData() {
	window.localStorage.setItem('access_token', access_token);
	fetch(host + '/posts/' + postID)
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);

			const title = data.title;
			const content = data.content;
			const subjectID = data.subject_id;
			const people = data.people;
			const deadline = data.deadline;
			const contact = data.contact;

			getSubjectData(subjectID).then((data) => {
				// console.log(data);
				const subjectName = data.name;
				const semesterYear = data.semesters_years;
				const semesterSemester = data.semesters_semester;
				const departmentName = data.departments_name;

				document.getElementById(
					'semester',
				).innerText = `${semesterYear}년 ${semesterSemester}학기`;
				document.getElementById('department').innerText = departmentName;
				document.getElementById('subject').innerText = subjectName;
			});

			// 게시글 생성 날짜 포맷팅
			const creatAt = data.createAt;
			let tempDate = creatAt.substr(0, 10);
			const creatYear = moment(tempDate, 'YYYY-MM-DD').format('YYYY');
			const creatMonth = moment(tempDate, 'YYYY-MM-DD').format('MM');
			const creatDay = moment(tempDate, 'YYYY-MM-DD').format('DD');
			const creatDate = `${creatYear}-${creatMonth}-${creatDay}`;

			// 모집 마감 날짜 포맷팅
			tempDate = deadline.substr(0, 10);
			const deadlineYear = moment(tempDate, 'YYYY-MM-DD').format('YYYY');
			const deadlineMonth = moment(tempDate, 'YYYY-MM-DD').format('MM');
			const deadlineDay = moment(tempDate, 'YYYY-MM-DD').format('DD');
			const deadlineDate = `${deadlineYear}-${deadlineMonth}-${deadlineDay}`;

			document.getElementById('title').innerText = title;
			document.getElementById('people').innerText = people;
			document.getElementById('contact').innerText = contact;
			document.getElementById('creatAt').innerText = creatDate;
			document.getElementById('deadline').innerText = deadlineDate;

			getWriter(data.user_id).then((data) => {
				const writer = data;
				document.getElementById('writer').innerText = writer;

				// 현재 접속한 유저와 작성자가 같은 지 확인하기
				getConnectUser().then((userData) => {
					const connectUser = userData;
					console.log(connectUser);
					console.log(writer);

					if (connectUser === writer) {
						console.log('유저가 같습니다.');
						document.getElementById('buttonSet').classList.remove('active');
					} else {
						console.log('유저가 다릅니다.');

						// 유저가 다르면 수정하기, 삭제하기 버튼 보이기
						document.getElementById('buttonSet').classList.toggle('active');
					}
				});
			});
			document.getElementById('content__detail').innerText = content;
		});
}

// 북마크
let clickNum = 0;
document.getElementById('bookmark__icon').addEventListener('click', () => {
	const postID = window.localStorage.getItem('selectID');

	if (clickNum == 0) {
		document.querySelector('.fa-bookmark').classList.add('fa-solid');
		clickNum++;

		// 북마크 등록
		fetch(host + '/posts/' + postID + '/interest', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: access_token,
			},
		}).then((res) => {
			if (res.ok) {
				alert('북마크 등록되었습니다.');
			}
		});
	} else {
		document.querySelector('.fa-bookmark').classList.remove('fa-solid');
		clickNum--;

		// 북마크 해제
		fetch(host + '/posts/' + postID + '/interest', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: access_token,
			},
		}).then((res) => {
			if (res.ok) {
				alert('북마크 해제되었습니다.');
			}
		});
	}
});
