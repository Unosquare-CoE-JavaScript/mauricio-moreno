package main

import (
	"fmt"
)

func normalFunction(message string) {
	fmt.Println(message);
}

func tripleArgument(a int, b int, c string) {
	fmt.Println(a, b, c)
}

func returnValue(a int) int {
	return a * 2
}

func doubleReturn(a int) (c, d int, f string) {
	return a, a * 2, ""
}

func main() {
	normalFunction("Hola mundo");
	tripleArgument(1,2, "hola")

	value := returnValue(2)
	fmt.Println("Value: ", value)

	value1, value2, _ := doubleReturn(2)
	fmt.Println("Value 1 and value 2", value1, value2)
}