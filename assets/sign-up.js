function signUpCheck() {
  // 이메일, 이름, 비밀번호 등을 가져옴
  var email = document.getElementById("email").value;
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  var passwordConfirm = document.getElementById("passwordConfirm").value;
  var school_email = document.getElementById("school_email").value;

  // 간단한 유효성 검사
  if (!email || !name || !password || !passwordConfirm || !school_email) {
      alert("모든 필드를 입력해주세요.");
      return;
  }

  // 비밀번호와 비밀번호 확인이 일치하는지 확인
  if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
  }

  // 이메일 유효성 검사 (간단한 예제)
  var emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
      alert("올바른 이메일 주소를 입력해주세요.");
      return;
  }

  // 여기에서 서버로 데이터를 전송하거나 필요한 동작을 수행
  const userData = {
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
    isCertification: "Y"
};

const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(userData)
};

fetch("http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com/users/signup", requestOptions)
    .then(response => {
        if (response.status === 204) {
            // 회원가입 성공
            console.log("회원가입 성공");
            alert("회원가입이 성공했습니다!");
            window.location.href = "../index.html";
        } else {
            // 회원가입 실패 또는 다른 상태 코드
            console.error("회원가입 실패. 상태 코드: " + response.status);
        }
    })
    .catch(error => {
        console.error("요청 실패:", error);
    });

}



// 이메일 전송 버튼 클릭 시 호출될 함수
function sendEmail() {
  // 필요한 데이터 가져오기
  var privateKey = "9c9fbe95-dd5c-4fe2-9bb8-8bec44256d98";  // 실제로는 안전한 방법으로 키를 관리해야 합니다.
  var univName = "광운대학교";  
  var univ_check = true;
  var univEmail = "tiger521@kw.ac.kr"

  // API에 보낼 데이터 객체 생성
  const requestData = {
      privateKey: privateKey,
      univEmail: univEmail,
      univName: univName,
      univ_check: univ_check
  };

  // fetch를 사용하여 서버로 데이터 전송
  fetch('http://univcert.com/api/v1/certify', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      // 서버의 응답 처리
      if (data.status === 200) {
          alert("이메일이 성공적으로 전송되었습니다!");
      } else {
          alert("이메일 전송 실패: " + data.error); // 실패 시 서버에서 전달한 에러 메시지 출력
      }
  })
  .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
  });
}
