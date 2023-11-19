const host = window.location.hostname ==='127.0.0.1' ? baseURL:'/api';
const access_token = window.localStorage.getItem('accessToken');

function fetchData() {
    // API 엔드포인트와 userId를 조합
    const apiUrl = host+'/users/profile';

    // 헤더 설정
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + access_token); // 
    // const Token = Bearer토큰값 가져오기
    // fetch를 사용하여 서버로 데이터 요청
    // api 토큰 추가하기 url 뒤에
    fetch(apiUrl,{ headers })
        .then(response => {
            // 응답이 성공적인지 확인
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // JSON 형태로 응답을 파싱
            return response.json();
        })
        .then(data => {
            // 가져온 데이터를 각 요소에 할당
            document.getElementById('nickname').textContent = data.nickname;
            document.getElementById('departmentName').textContent = data.departmentName;
            document.getElementById('introduction').textContent = data.introduction;
            // 더 많은 데이터가 있다면 추가로 할당해주세요.
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// 페이지 로드 시 데이터 가져오기
document.addEventListener('DOMContentLoaded', fetchData);
