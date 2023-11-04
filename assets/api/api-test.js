const url = 'http://localhost:3000/users';

// fetch(url)
// 	.then((response) => response.json())
// 	.then((data) => console.log(data));

fetch(url + '/posts', {
	method: 'POST',

	body: JSON.stringify({
		username: 'bella',
		firstName: 'Bae',
		lastName: 'hyun',
		gender: 'female',
		profileURL: '/public/profile-ex-1.jpeg',
		email: 'bella.Bae@example.com',
	}),
}).then((response) => console.log(response));

// async function getUsers() {
// 	try {
// 		let res = await fetch(url);
// 		return await res.json();
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// async function renderUsers() {
// 	let users = await getUsers();
// 	let html = '';
// 	users.forEach((user) => {
// 		let htmlSegment = `<div class="user">
//                             <h2>${user.firstName} ${user.lastName}</h2>
//                             <div class="email"><a href="email:${user.email}">${user.email}</a></div>
//                         </div>`;

// 		html += htmlSegment;
// 	});

// 	let container = document.querySelector('.container');
// 	container.innerHTML = html;
// }

// renderUsers();
