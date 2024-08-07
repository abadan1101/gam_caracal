//-------------------------------------------BARRA DE PESQUISA----------------------------------------
//-------------------------------------------------------------------------------------------------
//PROFILE DROPDOWN
const profile1 = document.querySelector('nav .profile');
const imgProfile1 = profile1.querySelector('img');
const dropdownProfile1 = profile1.querySelector('.profile-link');

imgProfile1.addEventListener('click', function () {
	dropdownProfile1.classList.toggle('show');
})

// PROFILE MENU
const allMenu1 = document.querySelectorAll('main .content-data .head .menu');
allMenu1.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})

window.addEventListener('click', function (e) {
	if(e.target !== imgProfile1) {
		if(e.target !== dropdownProfile1) {
			if(dropdownProfile1.classList.contains('show')) {
				dropdownProfile1.classList.remove('show');
			}
		}
	}

	allMenu1.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})
//_________________________________________________________________________________________________
//-------------------------------------------------------------------------------------------------
