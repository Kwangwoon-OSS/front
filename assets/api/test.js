// function postData() {

// 	// 	fetch(
// 	// 		'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com/posts',
// 	// 	)
// 	// 		.then((response) => response.json())
// 	// 		.then((data) => console.log(data));
// }

function postData() {
	axios({
		method: 'get',
		url: 'http://together-env.eba-idjepbda.ap-northeast-2.elasticbeanstalk.com/posts',
	})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}
