const baseURL =
	'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com';
const host = window.location.hostname === '127.0.0.1' ? baseURL : '/api';
console.log(window.location.hostname);

function login() {
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;

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
				// 로그인 성공
				alert('로그인 성공!');
				window.localStorage.setItem('isLogin', 1);
				return response.json();
			} else {
				// 로그인 실패 or 다른 코드
				alert('아이디 or 비밀번호를 확인해보세요!);
				console.error('로그인 실패. 상태 코드: ' + response.status);
				throw new Error('로그인 실패');
			}
		})
		.then((data) => {
			// Authorization 값을 가져와서 로컬 스토리지에 저장
			const authorization = data.accessToken; // assuming the token is in the 'accessToken' field
			console.log('이메일:', email);
			console.log('액세스 토큰:', authorization);
			localStorage.setItem('email', email);
			localStorage.setItem('accessToken', authorization);
			window.location.href = '../index.html';
		})
		.catch((error) => {
			console.error('요청 실패:', error);
		});
}
