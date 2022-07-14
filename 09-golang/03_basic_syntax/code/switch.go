// // Uncomment the entire file

package main

import "fmt"

func main() {

	var city string

	switch city {
	case "Des Moines":
		fmt.Println("You live in Iowa")
	case "Minneapolis,", "St Paul":
		fmt.Println("You live in Minnesota")
	case "Madison":
		fmt.Println("You live in Wisconsin")
	default:
		fmt.Println("You're not from around here.")
	}

		// ****************************
	var i int = 9

	switch {
	case i > 10:
		fmt.Println("Greater than 10")
	case i < 10:
		fmt.Println("Less than 10")
	default:
		fmt.Println("Is 10")
	}

		// ****************************

	switch {
	case i != 10:
		fmt.Println("Does not equal 10")
		fallthrough // Instead of use break you can specify the flow with fallthroughs
	case i < 10:
		fmt.Println("Less than 10")
	case i > 10:
		fmt.Println("Greater than 10")
	default:
		fmt.Println("Is 10")
	}
}
