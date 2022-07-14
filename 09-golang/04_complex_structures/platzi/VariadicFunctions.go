package main

import "fmt"

// You can use variadic functions as rest params in javascript
func sum(values ...int) int {
	total := 0;
	for _, num := range values {
		total += num
	}
	return total
}

func printNames(names ...string) {
	for _, name := range names {
		fmt.Println(name)
	}
}

func getValues(x int) (double int, triple int, quatruple int) {
	double    = 2 * x;
	triple    = 3 * x;
	quatruple = 4 * x;
	return;
}

func main() {
	fmt.Println(sum(1,2,3,4))
	printNames("Alice", "Bob", "Charlie")
	fmt.Println(getValues(2))
}
