const host = window.location.hostname ==='127.0.0.1' ? baseURL:'/api';

// 과목 ID 가져오기
async function getDepartmentID() {
	return fetch(host + '/department')
		.then((res) => res.json())
		.then((data) => {
			return data;
		});
}

async function getDepartmentDropMenu() {
	fetch(host+'/department')
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);

			const len = data.length;
			const template = [];

			// 과목명 드롭메뉴 옵션으로 추가
			for (let i = 0; i < len; i++) {
				const deptName = data[i].name;

				template.push(`<li class="department__option">`);
				template.push(
					`<span class="department__option__text">${deptName}</span>`,
				);
				template.push(`</li>`);
			}
			document.getElementById('department__option__list').innerHTML =
				template.join('');

			const departmentMenu = document.querySelector('.department__menu');
			const departmentBtn = document.getElementById('department__list');
			const departmentBtnText = document.querySelector(
				'.department__btn__text',
			);
			const departmentOptionList = document.getElementById(
				'department__option__list',
			);

			departmentBtn.addEventListener('click', () => {
				departmentMenu.classList.toggle('active');
			});
			departmentOptionList.addEventListener('click', () => {
				departmentOptionList.classList.toggle('click');
			});

			let departmentOption = departmentMenu.querySelector(
				'.department__options',
			).children;
			let departmentOptions = Array.from(departmentOption);

			departmentOptions.forEach((departmentOption) => {
				departmentOption.addEventListener('click', () => {
					let selectedDepartmentOption = departmentOption.querySelector(
						'.department__option__text',
					).innerText;
					departmentBtnText.innerText = selectedDepartmentOption;
					departmentMenu.classList.remove('active');
					departmentOptionList.classList.remove('click');
				});
			});
		});
}


// 학과 id로 학과 이름 가져오기
async function getDepartment(deptID) {
	// console.log(`input dept ID = ${deptID}`);
	return fetch(host+'/department')
		.then((res) => res.json())
		.then((data) => {
			let departmentName;
			for (let i = 0; i < data.length; i++) {
				if (deptID === data[i].id) {
					departmentName = data[i].name;
					// console.log(departmentName);
					return departmentName;
				}
			}
		});
}


//저장기능 
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
