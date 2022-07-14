package main

import (
	"fmt"
)

func main() {
	m := make(map[string]uint8)

	m["Jose"] = 14
	m["Pepito"] = 20

	fmt.Println(m)

	for i, v := range m {
		fmt.Println(i, v)
	}

	value := m["Jose"];
	fmt.Println(value)

	// Error handling
	age, ok := m["Josep"]
	fmt.Println(age, ok)
}
