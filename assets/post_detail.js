const baseURL =
	'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com';

const host = window.location.hostname === '127.0.0.1' ? baseURL : '/api';
console.log(window.location.hostname);

// const access_token =
// 	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqd3QiLCJpZCI6NiwiZXhwIjoxNzAxMjc5MTE0fQ.L11n5VmUdHh0_YCYLDjcqupqJghPhhDje660foeRbOjM9GlHXU9nqNqqnXiUMaGzxR1-7-CXmUjM9TWrV_ZHQA';

const access_token = window.localStorage.getItem('accessToken');

const postID = window.localStorage.getItem('selectID');
console.log(postID);

// const style = () => {
// 	console.log('style');
// 	document.querySelector('.fa-bookmark').classList.add('fa-solid');
// };

document.body.addEventListener('load', getPostData());

// 북마크 정보 가져오기
async function getBook(selectID) {
	return fetch(host + '/posts/interestin', {
		method: 'GET',
		headers: {
			Authorization: access_token,
			'Content-Type': 'application/json;charset=UTF-8',
		},
	})
		.then((res) => res.json())
		.then((data) => {
			return data;
			console.log(data);
			console.log(selectID);
			// 북마크 정보 중에 현재 게시글이 있는 지 확인하기
			let bookDataLen = data.length;
			for (let i = 0; i < bookDataLen; i++) {
				if (selectID == data[i].id) {
					// style();
					// console.log('ok');
					// document.querySelector('.fa-bookmark').classList.add('fa-solid');
				}
				// else {
				// return 1;
				// document.querySelector('.fa-bookmark').classList.remove('fa-solid');
				// }
			}
		});
}

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
const getConnectUser = async function () {
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

async function getPostData() {
	// window.localStorage.setItem('access_token', access_token);
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

					getBook(postID).then((result) => {
						const isBookSelect = document.querySelector('.fa-bookmark');
						for (let i = 0; i < result.length; i++) {
							if (postID == result[i].id) {
								console.log('zero');
								isBookSelect.classList.add('fa-solid');
								// console.log(isBookSelect.classList);
							}
						}

						// 북마크
						let clickNum = 0;
						console.log(clickNum);
						document
							.getElementById('bookmark__icon')
							.addEventListener('click', () => {
								const postID = window.localStorage.getItem('selectID');
								const isBookSelect = document.querySelector('.fa-bookmark');
								const bookClassListLen = isBookSelect.classList.length;
								console.log(bookClassListLen);
								console.log(`후 -> ${clickNum}`);

								if (clickNum == 0 && bookClassListLen < 4) {
									document
										.querySelector('.fa-bookmark')
										.classList.add('fa-solid');
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
									clickNum++;
								} else if (clickNum < 0) {
									document
										.querySelector('.fa-bookmark')
										.classList.add('fa-solid');
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
									clickNum++;
								} else if (clickNum > 0) {
									document
										.querySelector('.fa-bookmark')
										.classList.remove('fa-solid');
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
								} else if (clickNum == 0 && bookClassListLen == 4) {
									document
										.querySelector('.fa-bookmark')
										.classList.remove('fa-solid');
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
					});

					if (connectUser === writer) {
						console.log('유저가 같습니다.');
						// 유저가 같으면 수정하기, 삭제하기 버튼 보이기
						document.getElementById('buttonSet').classList.toggle('active');
					} else {
						console.log('유저가 다릅니다.');

						document.getElementById('buttonSet').classList.remove('active');
					}
				});
			});
			document.getElementById('content__detail').innerText = content;
		});
}

const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');

// 게시글 수정하기 페이지로 이동
updateBtn.addEventListener('click', () => {
	window.location.href = '../pages/post/post-modified.html';
});

// 게시글 삭제 API 호출
deleteBtn.addEventListener('click', () => {
	let isDelete = confirm('게시글을 정말 삭제하시겠습니까?');
	const deleteID = window.localStorage.getItem('selectID');
	console.log(deleteID);

	if (isDelete) {
		fetch(host + '/posts/' + deleteID, {
			method: 'DELETE',
			headers: {
				Authorization: access_token,
			},
		})
			.then((res) => {
				res.json();
			})
			.then((data) => {
				console.log(data);
				alert('정상적으로 게시글이 삭제되었습니다😀');
				setInterval((window.location.href = '../index.html'), 1000);
			});
	} else {
		setInterval((window.location.href = '../index.html'), 1000);
	}
});

//시간 표기 변경
function formatDateTime(isoDateTime) {
	const options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		timeZoneName: 'short',
	};

	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
		new Date(isoDateTime),
	);

	return formattedDate;
}

//댓글 가져오기
// 댓글을 가져오는 함수

// 로컬 스토리지에서 selectId 가져오기
const selectId = window.localStorage.getItem('selectID');

async function fetchComments() {
	try {
		const response = await fetch(host + `/posts/${selectId}/comment`);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const comments = await response.json();
		console.log(response.headers);

		// 댓글을 표시하는 부분 업데이트
		displayComments(comments);
	} catch (error) {
		console.error('Error fetching comments:', error);
	}
}

// 댓글을 화면에 표시하는 함수
function displayComments(comments) {

	const userData = getConnectUser();
        const currentUser = userData.nickname;

	const commentWrapper = document.querySelector('.comment__wrapper');
	//commentWrapper.innerHTML = ''; // 기존의 댓글 내용을 지웁니다.

	const commentNumSpan = document.getElementById('commentNum');
	commentNumSpan.textContent = comments.length; // 댓글 개수 업데이트
	console.log(comments);

	comments.forEach((comments) => {
		const commentShow = document.createElement('div');
		commentShow.classList.add('comment__show');

		const userDiv = document.createElement('div');
		getConnectUser().then((data) => {
			const userName = data;

			userDiv.classList.add('comment__user');
			userDiv.innerHTML = `<span>${userName}</span>`;
		});

		const contentDiv = document.createElement('div');
		contentDiv.classList.add('comment__content');
		contentDiv.innerHTML = `<span>${comments.content}</span>`;

		const formattedDateTime = formatDateTime(comments.createdtime);
		const dateDiv = document.createElement('div');
		dateDiv.classList.add('comment__date');
		dateDiv.innerHTML = `<span>${formattedDateTime}</span>`;
		
                //댓글 삭제 버튼 추가  
		const deleteButton = document.createElement('button');
		deleteButton.textContent = '삭제';

		// 댓글 작성자와 현재 사용자가 동일한 경우에만 삭제 버튼 표시
		if (comments.username === currentUser) {
			deleteButton.style.display = 'inline-block';
		}

		// 삭제 버튼을 눌렀을 때 댓글 삭제 함수 호출
		deleteButton.addEventListener('click', () => {
			deleteComment(comments.postId, comments.commentId);
		});

		const lineDiv = document.createElement('div');
		lineDiv.classList.add('line');

		commentShow.appendChild(userDiv);
		commentShow.appendChild(contentDiv);
		commentShow.appendChild(dateDiv);
		commentShow.appendChild(lineDiv);

		commentWrapper.appendChild(commentShow);
	});
}

//댓글 등록하기
function post_save() {
	var content = document.getElementById('comment__input').value;
	var used = 'Y';
	const access_token = localStorage.getItem('accessToken');

	// 사용자 정보 가져오기
    getConnectUser().then(userData => {
        // 여기에서 userData.id를 사용하여 작업 수행
        const userID = userData.id;
	console.log(userID);

        // 서버로 데이터를 전송하거나 필요한 동작을 수행
        const commentData = {
            content: content,
            parentId: userID,
            used: used,
        };

	const requestOptions = {
		method: 'POST',
		headers: {
			Authorization: access_token,
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(commentData),
	};

	fetch(host + `/posts/${postID}/comment`, requestOptions)
		.then((response) => {
			if (response.status === 200) {
				//댓글 작성 완료
				alert('댓글이 작성되었어요!');
			} else {
				// 댓글 작성 실패 또는 다른 상태 코드
				console.error('댓글 실패. 상태 코드: ' + response.status);
			}
		})
		.catch((error) => {
			console.error('요청 실패:', error);
		});
	});
}

// 댓글 삭제 함수
function deleteComment(postId, commentId) {
        fetch(`/api/posts/${postId}/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: access_token,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('댓글을 삭제할 수 없습니다.');
            }
            // 삭제가 성공하면 댓글 목록을 다시 로드하여 업데이트
            fetchComments(); // 댓글을 다시 로드하는 함수 호출
        })
        .catch(error => {
            console.error('댓글 삭제 중 오류가 발생했습니다:', error);
            // 오류 처리
        });
    }

// 페이지 로드 시 댓글을 가져오도록 설정
document.addEventListener('DOMContentLoaded', fetchComments);
