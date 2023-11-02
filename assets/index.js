const domainEl = document.querySelector('.category__item__semester');
const domainListEl = document.querySelector('.semester__list');

let isActiveDomainList = false;
domainEl.addEventListener('click', function () {
	isActiveDomainList = !isActiveDomainList; // transition
	if (isActiveDomainList) {
		// active domain list
		domainListEl.classList.add('active');
	} else {
		// hide domain list
		domainListEl.classList.remove('active');
	}
});
