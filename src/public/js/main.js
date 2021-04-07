// Cerrando ventanas de alerta
function closeAlert() {
	const closeAlert = document.querySelector('.alert__item');
	closeAlert.classList.toggle('close');
}

// Abrir/Cerrar el menú desplegable
function toggleMenu(animation) {
	const menu = document.querySelector('.menu');
	if (animation == true) {
		menu.classList.remove('animate__slideOutLeft');
		menu.classList.add('animate__slideInLeft');
		menu.classList.add('open');
	} else {
		menu.classList.remove('animate__slideInLeft');
		menu.classList.add('animate__slideOutLeft');
	}
}

// Insertando datos en el overlay
const overlay = document.getElementById('overlay');

document
	.querySelectorAll('.catalogo .product__card .product__hover')
	.forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const route = elemento.getAttribute('src');
			const description = elemento.parentNode.parentNode.dataset.description;
			const price = elemento.parentNode.parentNode.dataset.price;
			const name = elemento.parentNode.parentNode.dataset.name;
			const id = elemento.parentNode.parentNode.dataset.productid;

			overlay.classList.add('active');
			document.querySelector('#overlay img').src = route;
			document.querySelector(
				'#overlay .product__description'
			).innerHTML = description;
			document.querySelector('#overlay .product__price').innerHTML =
				price + ' $';
			document.querySelector('#overlay .product__name').innerHTML =
				'COD. ' + name;
			document.querySelector('#overlay .product__id').value = id;
		});
	});

document
	.querySelectorAll('.catalogo .product__card img')
	.forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const route = elemento.getAttribute('src');
			const description = elemento.parentNode.parentNode.dataset.description;
			const price = elemento.parentNode.parentNode.dataset.price;
			const name = elemento.parentNode.parentNode.dataset.name;
			const id = elemento.parentNode.parentNode.dataset.productid;

			overlay.classList.add('active');
			document.querySelector('#overlay img').src = route;
			document.querySelector(
				'#overlay .product__description'
			).innerHTML = description;
			document.querySelector('#overlay .product__price').innerHTML =
				price + ' $';
			document.querySelector('#overlay .product__name').innerHTML =
				'COD. ' + name;
			document.querySelector('#overlay .product__id').value = id;
		});
	});

// Listener del boton para cerrar.
document.querySelector('#btn-close').addEventListener('click', () => {
	overlay.classList.remove('active');
});

// Listener para cerrar con el overlay.
overlay.addEventListener('click', (evento) => {
	evento.target.id === 'overlay' ? overlay.classList.remove('active') : '';
});
