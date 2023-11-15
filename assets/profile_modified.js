const host = window.location.hostname ==='127.0.0.1' ? baseURL:'/api';

function save() {
    var departmentId = 1;
    var nickname = document.getElementById("nickname").value;
    var introduction = document.getElementById("introduction").value;
    //const token = localStorage.getItem('accessToken');

    // 여기에서 서버로 데이터를 전송하거나 필요한 동작을 수행
  const userData = {
    departmentId : departmentId,
    nickname : nickname,
    introduction : introduction
    //bearer토큰 추가해야함 
};

const requestOptions = {
    method: "POST",
    headers: {
        //"Authorization": token, Bearer 토큰 추가
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(userData)
};

fetch(host+'/users/profile', requestOptions)
    .then(response => {
        if (response.status === 201) {
            // 프로필 수정
            console.log("프로필 저장 완료");
            alert("프로필이 저장되었습니다!");
            window.location.href = "../index.html";
        } else {
            // 회원가입 실패 또는 다른 상태 코드
            console.error("저장 실패. 상태 코드: " + response.status);
        }
    })
    .catch(error => {
        console.error("요청 실패:", error);
    });
}
