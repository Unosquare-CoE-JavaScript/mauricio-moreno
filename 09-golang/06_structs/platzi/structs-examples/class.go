package main

import "fmt"

type Employee struct {
	id   int
	name string
}

func (employee *Employee) SetId(id int) int {
	employee.id = id
	return employee.id
}

func (employee *Employee) SetName(name string) string {
	employee.name = name
	return employee.name
}

func (employee *Employee) GetId() int {
	return employee.id
}

func (employee *Employee) GetName() string {
	return employee.name
}

func main() {
	e := Employee{}
	fmt.Printf("%v", e)
	e.name = "Emmanuel"
	e.id = -1
	fmt.Printf("%v", e)
	e.SetId(3)
	e.SetName("Mauricio")
	fmt.Printf("%v\n", e)
	fmt.Println(e.GetId())
	fmt.Println(e.GetName())
}
