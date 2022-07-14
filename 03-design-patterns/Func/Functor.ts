export const Functor = (x: any): any => ({
	map: fn => Functor(fn(x)),
	return: () => x,
	log: () => (console.log(x), Functor(x)),
});
