// 가상의 API 호출 함수
// 프로필 조회 함수
function getProfileData(userId) {
    // API 엔드포인트와 userId를 조합
    const apiUrl = `http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com/users/profile/1`;

    // fetch를 사용하여 서버로 데이터 요청
    fetch(apiUrl)
        .then(response => {
            // 응답이 성공적인지 확인
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // JSON 형태로 응답을 파싱
            return response.json();
        })
        .then(data => {
            // 서버의 응답 처리
            console.log(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}


async function updateProfile() {
    try {
        // 프로필 데이터를 비동기적으로 가져옴
        const profileData = await getProfileData();

        // 닉네임과 소속, 자기소개를 HTML에 적용
        const nicknameElement = document.getElementById("nickname");
        const departmentNameElement = document.getElementById("departmentName");
        const introductionElement = document.getElementById("introduction");

        // 프로필 데이터를 HTML 엘리먼트에 설정
        if (nicknameElement && departmentNameElement && introductionElement) {
            nicknameElement.textContent = profileData.nickname;
            departmentNameElement.textContent = profileData.departmentName;
            introductionElement.textContent = profileData.introduction;
        } else {
            console.error('하나 이상의 HTML 엘리먼트를 찾을 수 없습니다.');
            throw new Error('HTML 엘리먼트를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('프로필 업데이트 중 오류가 발생했습니다:', error);
        throw error; // 오류를 다시 던져서 상위에서 처리하도록 함
    }
}



function toggleIntroduction() {
    // introduction 요소를 토글하여 보이거나 숨기기
    const introductionElement = document.getElementById('introduction');
    introductionElement.style.display = (introductionElement.style.display === 'none') ? 'block' : 'none';
}

// 페이지 로드 시 프로필 정보 업데이트
document.addEventListener("DOMContentLoaded", updateProfile);
