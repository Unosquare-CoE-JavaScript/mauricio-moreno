package main

import (
	"fmt"
)

func main() {
	for i := 0; i <= 10; i++ {
		fmt.Println(i);
	}

	fmt.Println("---------------------");

	var counter uint8 = 0;
	for counter < 10 {
		fmt.Println(counter);
		counter++;
	}

	var counterForever uint64 = 0;
	for {
		fmt.Println(counterForever)
		counterForever++
	}
}
