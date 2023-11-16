const baseURL =
	'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com';
const host = window.location.hostname === '127.0.0.1' ? baseURL : '/api';
console.log(window.location.hostname);

// const access_token =
// 	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqd3QiLCJpZCI6MSwiZXhwIjoxNzAxMjc3NTYyfQ.gKXtLZzZSP4I0Thm9ufn00tp-CmzSVh-kA-Gz1Nk5nsknjiiWQ6LdMhdPpeEIQetmOkBYXZmaOkhJJB-FkRmqg';

function signUpCheck() {
	// 이메일, 이름, 비밀번호 등을 가져옴
	var email = document.getElementById('email').value;
	var name = document.getElementById('name').value;
	var password = document.getElementById('password').value;
	var passwordConfirm = document.getElementById('passwordConfirm').value;
	var school_email = document.getElementById('school_email').value;

	// 간단한 유효성 검사
	if (!email || !name || !password || !passwordConfirm || !school_email) {
		alert('모든 필드를 입력해주세요.');
		return;
	}

	// 비밀번호와 비밀번호 확인이 일치하는지 확인
	if (password !== passwordConfirm) {
		alert('비밀번호가 일치하지 않습니다.');
		return;
	}

	// 이메일 유효성 검사 (간단한 예제)
	var emailRegex = /\S+@\S+\.\S+/;
	if (!emailRegex.test(email)) {
		alert('올바른 이메일 주소를 입력해주세요.');
		return;
	}

	// 여기에서 서버로 데이터를 전송하거나 필요한 동작을 수행
	const userData = {
		email: email,
		password: password,
		passwordConfirm: passwordConfirm,
		isCertification: 'Y',
	};

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(userData),
	};

	fetch(host + '/users/signup', requestOptions)
		.then((response) => {
			if (response.status === 204) {
				// 회원가입 성공
				console.log('회원가입 성공');
				alert('회원가입이 성공했습니다!');
				window.location.href = '../index.html';
			} else {
				// 회원가입 실패 또는 다른 상태 코드
				alert('회원가입 실패. 다시 확인해주세요!');
			}
		})
		.catch((error) => {
			console.error('요청 실패:', error);
		});
}

// 이메일 전송 버튼 클릭 시 호출될 함수
function sendEmail() {
	// 필요한 데이터 가져오기
	var email = document.getElementById('school_email').value;
	var univName = '광운대학교';
	// API에 보낼 데이터 객체 생성
	const requestData = {
		email: email,
		univName: univName,
	};

	// fetch를 사용하여 서버로 데이터 전송
	fetch(host + '/users/email/cert', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestData),
	})
		.then((response) => {
			if (response.status === 200) {
				// 이메일 보내기  성공
				alert('이메일이 성공적으로 보내졌습니다!');
			} else {
				// 주소 다르면
				alert('주소를 다시 한 번 확인해주세요');
			}
		})
		.catch((error) => {
			console.error('요청 실패:', error);
		});
}

function check_number() {
	// 필요한 데이터 가져오기
	var email = document.getElementById('school_email').value;
	var univName = '광운대학교';
	var code = document.getElementById('code').value;
	// API에 보낼 데이터 객체 생성
	const requestData = {
		email: email,
		univName: univName,
		code: code,
	};

	// fetch를 사용하여 서버로 데이터 전송
	fetch(host + '/users/email/verify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestData),
	})
		.then((response) => {
			if (response.status === 200) {
				alert('인증되었습니다!');
				document.getElementById('signUpButton').removeAttribute('disabled');
			} else {
				// 잘못입력했을때
				alert('인증코드가 틀렸습니다');
			}
		})
		.catch((error) => {
			console.error('요청 실패:', error);
		});
}
