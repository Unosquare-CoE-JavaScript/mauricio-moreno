package main

import (
	"fmt"
)

func main() {
	switch modulo := 45 % 2; modulo {
	case 0:
		fmt.Println("Modulo es par");
	default:
		fmt.Println("Modulo es impar");
	}

	var value uint8 = 100;
	switch {
	case value > 100:
		fmt.Println("Value is bigger than 100")
	case value < 100:
		fmt.Println("Value is smaller than 100")
	default:
		fmt.Println("Value is 100")
	}
}
