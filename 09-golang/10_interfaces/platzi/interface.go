package main

import "fmt";

type Person struct {
	name string;
	age  int;
}

type Employee struct {
	id int;
}

type FullTimeEmployee struct {
	Person;
	Employee;
	endDate string;
}

func (fullTimeEmployee FullTimeEmployee) getMessage() string {
	return "Full Time Employee"
}

type TemporaryEmployee struct {
	Person;
	Employee;
	taxRate int;
}

func (temporaryEmployee TemporaryEmployee) getMessage() string {
	return "Temporary Employee"
}

type PrintInfo interface {
	getMessage() string;
}

func GetMessage(p PrintInfo) {
	fmt.Println(p.getMessage())
}

func main() {
	FullTimeEmployee := FullTimeEmployee{}
	FullTimeEmployee.name = "Name"
	FullTimeEmployee.age = 2
	FullTimeEmployee.id = 5
	fmt.Printf("%v\n", FullTimeEmployee)
	temporaryEmployee := TemporaryEmployee{}
	GetMessage(FullTimeEmployee)
	GetMessage(temporaryEmployee)
}
