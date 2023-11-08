// function postData() {

// 	// 	fetch(
// 	// 		'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com/posts',
// 	// 	)
// 	// 		.then((response) => response.json())
// 	// 		.then((data) => console.log(data));
// }

function postData() {
	// axios({
	// 	method: 'get',
	// 	url: 'http://localhost:3000/posts',
	// })
	// 	.then(function (response) {
	// 		console.log(response);
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error);
	// 	});

	fetch('http://localhost:3000/posts')
		.then((response) => response.json())
		.then((data) => console.log(data));
}
