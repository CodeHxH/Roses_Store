const searchBar = document.getElementById('barra-busqueda');
const categories = document.querySelectorAll('#categorias a');
const products = document.querySelectorAll('#grid .product__card');

searchBar.addEventListener('keyup', (input) => {
	console.log('hola');
	products.forEach((product) => {
		const productLabel = product.dataset.etiquetas;
		const compare = productLabel.indexOf(input.target.value.toLowerCase());
		if (compare >= 0) {
			product.classList.remove('hiden');
		} else {
			product.classList.add('hiden');
		}
	});
});

categories.forEach((element) => {
	element.addEventListener('click', (event) => {
		event.preventDefault();
		categories.forEach((category) => {
			category.classList.remove('activo');
		});
		event.target.classList.add('activo');

		const category = event.target.innerHTML;

		products.forEach((product) => {
			if (product.dataset.categoria == category) {
				product.classList.remove('hiden');
			} else {
				product.classList.add('hiden');
			}

			if (category == 'Todos') {
				product.classList.remove('hiden');
			}
		});
	});
});
