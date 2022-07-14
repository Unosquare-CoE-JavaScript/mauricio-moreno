package main

import (
	"fmt"
	"strings"
)

func main() {
	var name string
	var namePointer *string

	fmt.Println("Name:", name)
	fmt.Println("Name *:", namePointer)
}

// ******************************************************

func main2() {
	var name string = "Beyonce"
	var namePointer *string = &name
	var nameValue = *namePointer

	fmt.Println("Name:", name)
	fmt.Println("Name *:", namePointer)
	fmt.Println("Name Value:", nameValue)

}

// ******************************************************
// In thi way we can change the value of a variable passing it to a function
func changeName(n *string) {
	*n = strings.ToUpper(*n)
}

func main3() {
	name := "Elvis"
	changeName(&name)
	fmt.Println(name)
}

// ******************************************************

type Coordinates struct {
	X, Y float64
}

var c = Coordinates{X: 10, Y: 20}

func main4() {
	coordinatesMemoryAddress := &c
	coordinatesMemoryAddress.X = 200
	fmt.Println(coordinatesMemoryAddress)
}