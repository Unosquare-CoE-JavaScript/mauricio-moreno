const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const selectPlanButtons = document.querySelectorAll('.plan button');
const modalButtons = document.querySelectorAll('.modal__action--negative');
const toggleButton = document.querySelector('.toggle-button');
const mobileNav = document.querySelector('.mobile-nav');

const closeModal = event => {
	if (modal) modal.classList.remove('open');
	backdrop.classList.remove('open');
};

for (let button of selectPlanButtons)
	button.addEventListener('click', function openModal() {
		modal.classList.add('open');
		backdrop.classList.add('open');
	});

if (modalButtons)
	for (let button of modalButtons) button.addEventListener('click', closeModal);

backdrop.addEventListener('click', () => {
	mobileNav.classList.remove('open');
	closeModal();
});

toggleButton.addEventListener('click', function openNavbarMenu() {
	mobileNav.classList.add('open');
	backdrop.classList.add('open');
});
