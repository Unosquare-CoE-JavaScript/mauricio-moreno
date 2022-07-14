package main

import (
	"fmt"
	"strings"
)

func average(numbers ...float64) float64 {
	var total         float64 = 0.0
	var elementsCount uint8   = 0
	for _, number := range numbers {
		total += number
		elementsCount++
	}
	return total / float64(elementsCount)
}

func animalPerName(name string) bool {
	var animalMap 	map[string]string
	animalMap["fernando"] = "Hawk"
	animalMap["john"] = "Fish"
	animalMap["maria"] = "Dog"

	_, ok := animalMap[strings.ToLower(name)]
	return ok
}

var groceries = []string {
	"Cookies",
	"Candies",
	"Gum",
}

func addGroceries(grocerieName string) []string {
	groceries = append(groceries, grocerieName)
	return groceries
}

func main() {
	fmt.Println(average(10, 5, 7))
}
