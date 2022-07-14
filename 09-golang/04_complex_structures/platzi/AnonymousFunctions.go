package main

import (
	"fmt"
	"time"
)

func main() {
	x := 5
	y := 5
	double := func(value int) int {
		return value * 2
	}
	fmt.Println(double(x))
	fmt.Println(double(y))

	// This is an anonymous process created with a go routine
	c := make(chan int)
	go func() {
		fmt.Println("Starting Function")
		time.Sleep(5 * time.Second)
		fmt.Println("End")
		c <- 1
	}()
	<- c
}
