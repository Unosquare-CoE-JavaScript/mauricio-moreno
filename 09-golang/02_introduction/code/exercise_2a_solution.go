// package main

// import "fmt"

// // Note: only uncomment one main() function at a time when testing

// // Part One
// func main() {
// 	fmt.Println("Hello World")
// }

// Part t2o ==================================================00

package main

import (
	"fmt"
)

// // Part Two
func main() {
	// This is the way we interpolate variable values into a string
  fmt.Printf(
		"Hi! My name is %s. I have lived in %s for %d years. They say the weather is amazing, which is %t",
		"Brenna",
		"Denver",
		4,
		true)
}
