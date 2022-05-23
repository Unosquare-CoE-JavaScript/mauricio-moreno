//! Ejemplo de uso de clausura
// Permite crear funciones (warn, error etc), que impriman
// errores con colores

const mensaje = (tipo, estilos) => string =>
	console.log(`%c ${tipo}: ${string}`, estilos);

const error = mensaje('Error', 'background: red; color: white;');
const warn = mensaje('Warning', 'background: orange; color: white;');

String.prototype.capitalize = function () {
	return this.split('')
		.map((element, index) =>
			index === 0 ? element.toUpperCase() : element.toLowerCase(),
		)
		.join('');
};

console.log('this IS A tesT'.capitalize());
