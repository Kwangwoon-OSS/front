function save() {
    var departmentId = 1;
    var nickname = document.getElementById("nickname").value;
    var introduction = document.getElementById("introduction").value;

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
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(userData)
};

fetch("http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com/users/profile", requestOptions)
    .then(response => {
        if (response.status === 201) {
            // 회원가입 성공
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
