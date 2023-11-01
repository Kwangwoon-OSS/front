const optionMenu = document.querySelector('.select__menu'),
	selectBtn = optionMenu.querySelector('select__btn'),
	category__btn__text = optionMenu.querySelector('.category__btn__text');

selectBtn?.addEventListener('click', () =>
	optionMenu.classList.toggle('active'),
);

let option = optionMenu.querySelector('.category__options').children;
let options = Array.from(option);
options.forEach((option) => {
	option.addEventListener('click', () => {
		let selectedOption = option.querySelector('.option__text').innerText;
		category__btn__text.innerText = selectedOption;
		console.log(selectedOption);
	});
});
