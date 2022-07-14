package main

import (
	"fmt"
)

func isPalindromo(text string) bool {
	var textReverse string

	for i := len(text) -1; i >= 0; i-- {
		textReverse += string(text[i])
	}

	if textReverse == text {
		fmt.Println("Es palindromo")
	} else {
		fmt.Println("No es un palindromo")
	}

	return textReverse == text
}

func main() {
	slice := []string{"Hola", "que", "hace"}

	for _, value := range slice {
		fmt.Println(value)
	}

	isPalindromo("case")
	isPalindromo("ama")
	isPalindromo("civic")
}
