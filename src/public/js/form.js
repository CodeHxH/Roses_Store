const formulario = document.getElementById('form');
const inputs = document.querySelectorAll('.form input');

// Expresiones regulares
const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/, // 7 a 14 numeros.
};

// Campos a confirmar
const fields = {
	name: false,
	lastname: false,
	email: false,
	phone: false,
	clientName: false,
	clientLastname: false,
	clientEmail: false,
	clientPhone: false,
	clientCity: false,
	clientState: false,
};

// Validando campos
const validateField = (expression, input, field) => {
	if (expression.test(input.value)) {
		document.getElementById(`group__${field}`).classList.remove('input__error');
		document.getElementById(`group__${field}`).classList.add('input__success');
		document
			.querySelector(`#group__${field} i`)
			.classList.add('bi-check-circle-fill');
		document
			.querySelector(`#group__${field} i`)
			.classList.remove('bi-x-circle-fill');

		fields[field] = true;
	} else {
		document.getElementById(`group__${field}`).classList.add('input__error');
		document
			.getElementById(`group__${field}`)
			.classList.remove('input__success');
		document
			.querySelector(`#group__${field} i`)
			.classList.add('bi-x-circle-fill');
		document
			.querySelector(`#group__${field} i`)
			.classList.remove('bi-check-circle-fill');

		fields[field] = false;
	}
};

const validateForm = (input) => {
	switch (input.target.name) {
		case 'name':
			validateField(expressions.name, input.target, 'name');
			break;
		case 'lastname':
			validateField(expressions.name, input.target, 'lastname');
			break;
		case 'email':
			validateField(expressions.email, input.target, 'email');
			break;
		case 'phone':
			validateField(expressions.phone, input.target, 'phone');
			break;
		case 'clientName':
			validateField(expressions.name, input.target, 'clientName');
			break;
		case 'clientLastname':
			validateField(expressions.name, input.target, 'clientLastname');
			break;
		case 'clientEmail':
			validateField(expressions.email, input.target, 'clientEmail');
			break;
		case 'clientPhone':
			validateField(expressions.phone, input.target, 'clientPhone');
			break;
		case 'clientCity':
			validateField(expressions.name, input.target, 'clientCity');
			break;
		case 'clientState':
			validateField(expressions.name, input.target, 'clientState');
			break;
	}
};

inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
});
