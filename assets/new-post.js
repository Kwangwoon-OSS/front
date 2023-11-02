const optionMenu = document.querySelector('.select__menu');
const selectBtn = document.getElementById('menu__list');
const category__btn__text = document.querySelector('.category__btn__text');
const optionList = document.getElementById('option__list');

selectBtn.addEventListener('click', () => {
	optionMenu.classList.toggle('active');
});

optionList.addEventListener('click', () => {
	optionList.classList.toggle('click');
});

let option = optionMenu.querySelector('.category__options').children;
let options = Array.from(option);

options.forEach((option) => {
	option.addEventListener('click', () => {
		let selectedOption = option.querySelector('.option__text').innerText;
		category__btn__text.innerText = selectedOption;
		//console.log(selectedOption);
		optionMenu.classList.remove('active');
		optionList.classList.remove('click');
	});
});
