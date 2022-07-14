package main

import "fmt"

func average(parameterNumbers ...uint16) float32 {
	var totalSum uint16 = 0;
	var numberCount uint8 = 0;
	for _, value := range parameterNumbers {
		totalSum += value;
		numberCount++;
	}

	return float32(totalSum) / float32(numberCount);
}

func main() {
	fmt.Println(average(0,1,2,3,4,5,6,7,8,9,10));
	fmt.Println(average(0,1,2,3,4,5));
}
