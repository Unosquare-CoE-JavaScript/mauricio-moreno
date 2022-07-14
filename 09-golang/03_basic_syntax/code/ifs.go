// // Uncomment this entire file

package main

import (
	"errors"
	"fmt"
)

func someFunction() error {
	return errors.New("some error")
}

func main() {

	var someVar = 9

	if someVar > 10 {
		fmt.Println(someVar)
	}

		// ****************************

	if someVar > 100 {
		fmt.Println("Greater than 100")
	} else if someVar == 100 {
		fmt.Println("Equals 100")
	} else {
		fmt.Println("Less than 100")
	}

	// You can put it one line the ifs but a next else would not work

	if someVar < 100 {
		fmt.Println("this is a single lined command")
	} else { fmt.Println("The else needs to be nested with the if") }

		// ****************************
	err := someFunction()
	// => If this function returns a value,
	// => it will be an  error of type Error

		// ****************************
	if err != nil {
	  fmt.Println(err.Error())
	}

	if err := someFunction(); err != nil {
	  fmt.Println(err.Error())
	}

	// End of file curly brace
}
