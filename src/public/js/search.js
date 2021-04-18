const categories = document.querySelectorAll('#categorias a');
const products = document.querySelectorAll('#grid .item');

categories.forEach((element) => {
	element.addEventListener('click', (event) => {
		event.preventDefault();
		categories.forEach((category) => {
			category.classList.remove('activo');
		});
		event.target.classList.add('activo');

		const category = event.target.innerHTML;
		console.log(category);
		if (category.indexOf('Todos') > -1) {
			products.forEach((product) => {
				if (product.dataset.categoria.indexOf(category) > -1) {
					product.classList.remove('hiden');
				} else {
					product.classList.add('hiden');
				}
			});
		}
	});
});
