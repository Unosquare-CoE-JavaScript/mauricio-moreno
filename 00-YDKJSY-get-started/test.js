function counter2(step = 1) {
	var count = 0;
	return function increaseCount() {
		count = count + step;
		return count;
	};
}

const counter =
	(step = 1, count = 0) =>
	() => {
		count = count + step;
		return count;
	};
var incBy1 = counter(1);
var incBy3 = counter(3);
console.log(incBy1());
console.log(incBy1()); // 1
// 2
console.log(incBy3());
console.log(incBy3());
console.log(incBy3()); // 3
// 6
// 9
