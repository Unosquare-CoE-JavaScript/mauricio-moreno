package main

import "fmt"

func main() {

	var myArray [5]int
	var mySlice []int

	myArray[0] = 1
	mySlice[0] = 1

	fmt.Println(myArray)
	fmt.Println(mySlice)

	// ***************************

	var myArray2 [5]int
	var mySlice2 []int = make([]int, 5)

	fmt.Println(myArray2)
	fmt.Println(mySlice2)

	// ***************************

	var myArray3 [5]int
	// var mySlice3 []int = make([]int, 5)
	var mySlice3 []int = make([]int, 5, 10)
	// var mySlice3 = make([]int, 5, 10)

	myArray3[0] = 1
	mySlice3[0] = 1

	fmt.Println(myArray3)
	fmt.Println(mySlice3)
	fmt.Println(len(mySlice3))
	fmt.Println(cap(mySlice3))

	// ***************************

	fruitArray := [5]string{"banana", "pear", "apple", "kumquat", "peach"}

	var splicedFruit []string = fruitArray[1:3] // ==> ["pear", "apple",]

	fmt.Println(len(splicedFruit))
	fmt.Println(cap(splicedFruit))

	// ***************************

	// SEE SLIDE

	// ***************************

	slice1 := []int{1, 2, 3}
	slice2 := append(slice1, 4, 5)

	fmt.Println(slice1, slice2)
	fmt.Println(len(slice1), cap(slice1))
	fmt.Println(len(slice2), cap(slice2))

	// ***************************

	originalSlice := []int{1, 2, 3}
	destination := make([]int, len(originalSlice))

	fmt.Println("Before Copy:", originalSlice, destination)

	mysteryValue := copy(destination, originalSlice)

	// fmt.Println("After Copy:", originalSlice, destination, mysteryValue)
}
