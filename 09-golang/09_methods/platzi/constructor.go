package main

import "fmt"

type Employee struct {
	id   int
	name string
	vacation bool
}

func NewEmployee (id int, name string, vacation bool) *Employee {
	return &Employee{
		id: id,
		name: name,
		vacation: vacation,
	}
}

func main() {
	// forma numero uno de crear un objeto
	e := Employee{}
	fmt.Printf("%v\n", e)

	// Forma dos de instanciar clase
	e2 := Employee{
		id: 1,
		name: "name",
		vacation: true,
	}
	fmt.Printf("%v\n", e2)

	// 3
	e3 := new(Employee)
	fmt.Printf("%v\n", *e3)

	e3.name = "Name"
	e3.id = 10
	fmt.Printf("%v\n", *e3)

	//4
	e4 := NewEmployee(4, "Constantino", false)
	fmt.Printf("%v\n", *e4)
}
