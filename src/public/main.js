// Listener del icono de menú
const btn = document.querySelector('.nav--icon');
const nav = document.querySelector('.nav--menu__container');
const nav_menu = document.querySelector('.nav--icon');

btn.addEventListener('click', () => {
	nav.classList.toggle('open');
	nav_menu.classList.toggle('open');
});

// Insertando datos en el overlay
const overlay = document.getElementById('overlay');
document
	.querySelectorAll('.catalogo--container .product--target img')
	.forEach((elemento) => {
		elemento.addEventListener('click', () => {
			const route = elemento.getAttribute('src');
			const description = elemento.parentNode.parentNode.dataset.description;
			const price = elemento.parentNode.parentNode.dataset.price;
			const name = elemento.parentNode.parentNode.dataset.name;
			const id = elemento.parentNode.parentNode.dataset.productid;

			overlay.classList.add('active');
			document.querySelector('#overlay img').src = route;
			document.querySelector('#overlay .description').innerHTML = description;
			document.querySelector('#overlay .price').innerHTML = price + ' $';
			document.querySelector('#overlay .name').innerHTML = name;
			document.querySelector('#overlay .ProductId').value = id;
		});
	});

// Listener del boton para cerrar.
document.querySelector('#btn--close').addEventListener('click', () => {
	overlay.classList.remove('active');
});

// Listener para cerrar con el overlay.
overlay.addEventListener('click', (evento) => {
	evento.target.id === 'overlay' ? overlay.classList.remove('active') : '';
});
