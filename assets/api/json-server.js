const baseUrl = 'http://localhost:3000';
const userUrl = 'http://localhost:3000/users';
const postUrl = 'http://localhost:3000/posts';

function getData() {
	fetch(baseUrl + '/users')
		.then((response) => response.json())
		.then((data) => {
			const h = [];
			for (const user of data) {
				h.push(`<tr>`);
				h.push(`<td>${user.name}</td>`);
				h.push(`<td>${user.email}</td>`);
				h.push(`<td>${user.phone}</td>`);
				h.push(`</td>`);
			}
			document.getElementById('tbBody').innerHTML = h.join('');
		});
}

// const form = document.getElementById('form');
// const data = new FormData(form);

// console.log(Array.from(data));

// async function postData() {
// 	const form = document.getElementById('form');
// 	const data = new FormData(form);

// 	console.log(Array.from(data));

// 	try {
// 		const postData = await fetch('https://jsonplaceholder.typicode.com/users', {
// 			method: 'POST',
// 			body: data,
// 		});

// 		const resData = await postData.json();

// 		console.log(resData);
// 	} catch (err) {
// 		console.log(err.message);
// 	}
// }
function postData() {
	let userName = document.getElementById('user__name').value;
	let userEmail = document.getElementById('user__email').value;
	let userPhone = document.getElementById('user__phone').value;

	fetch(userUrl, {
		method: 'POST',
		header: {
			'content-type': 'application/json; charset=UTF-8',
		},
		body: new URLSearchParams({
			name: userName,
			email: userEmail,
			phone: userPhone,
		}),
	})
		.then((response) => response.json())
		.then((data) => console.log(data));
}
