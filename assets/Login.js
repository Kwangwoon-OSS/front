const baseURL =
	'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com';
const host = window.location.hostname === '127.0.0.1' ? baseURL : '/api';
console.log(window.location.hostname);

function login() {
	fetch(host + '/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	})
		.then((response) => {
			if (response.status === 200) {
				// 로그인  성공
				// alert("로그인 성공!");
				console.log(response);
				console.log(response.headers);
				console.log(response.date);
				console.log(response.headers.get('Authorization'));

				// Authorization 헤더 값을 가져와서 로컬 스토리지에 저장
				const authorizationHeader = response.headers.get('authorization');
				console.log(authorizationHeader);
				localStorage.setItem('accessToken', authorizationHeader);
				localStorage.setItem('email', email);
				// window.location.href = '../index.html';
			} else {
				// 로그인 실패 or 다른코드
				console.error('로그인 실패. 상태 코드: ' + response.status);
			}
		})
		.catch((error) => {
			console.error('요청 실패:', error);
		});
}
