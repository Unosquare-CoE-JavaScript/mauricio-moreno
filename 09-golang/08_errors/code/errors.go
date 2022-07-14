package main

import (
	"errors"
	"fmt"
	"os"
)

func isGreaterThanTen(parameter int) error {
	if parameter < 10 {
		return errors.New("something bad happened")
	}
	return nil
}

func openFile() error {
	file, err := os.Open("missingFile.txt")
	if err != nil { return err }

	defer file.Close()
	return nil
}

func main() {
	num := 9
	err := isGreaterThanTen(num)
	if err != nil {
		fmt.Println(fmt.Errorf("%d is NOT GREATER THAN TEN", num))
		panic(err)
		// log.Fatalln(err)
	}

	err = openFile()

	if err != nil { fmt.Println(fmt.Errorf("%v", err)) }
}

// ****************************************************

// PANIC & DEFER SLIDE

// ****************************************************

//Defer works as an stack
func doThings() {
	defer fmt.Println("First Line but do this last!")
	defer fmt.Println("Do this second to last!")
	fmt.Println("Things And Stuff should happen first")
}

func main2() {
	doThings()
}

// ****************************************************

// RECOVER SLIDE

// ****************************************************

// package main

// import (
// 	"fmt"
// )

func doThings3() {
	for i := 0; i < 5; i++ {
		fmt.Println(i)
		if i == 2 {
			panic("PANIC!")
		}
	}
}

func main3() {
	doThings3()
}

// ****************************************************

// package main

// import (
// 	"fmt"
// )

func handlePanic() string {
	return "HANDLING THE PANIC"
}

func recoverFromPanic() {
	defer recover() //will only return a value if there has been a panic
	if r := recover(); r != nil {
		fmt.Println("We panicked but everything is fine.")
		fmt.Println("Panic instructions received:", r)
	}
}

func doThings4() {
	defer recoverFromPanic()
	for i := 0; i < 5; i++ {
		fmt.Println(i)
		if i == 2 {
			panic(handlePanic())
		}
	}
}

func main4() {
	doThings4()
}
