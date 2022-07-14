package main

import "time"

type Person struct {
	DNI  string
	Name string
	Age  int
}

type Employee struct {
	Id       int
	Position string
}

type FullTimeEmployee struct {
	Employee
	Person
}

var GetPersonByDNI = func(dni string) (Person, error) {
	time.Sleep(5 * time.Second)
	// Select * From Persona Where
	return Person{}, nil
}

var GetEmployeeById = func(id int) (Employee, error) {
	time.Sleep(5 * time.Second)
	return Employee{}, nil
}

func GetFullTimeEmployeeById(id int, dni string) (FullTimeEmployee, error) {
	var fullTimeEmployee FullTimeEmployee

	e, err := GetEmployeeById(id)
	if err != nil {
		return fullTimeEmployee, err
	}

	fullTimeEmployee.Employee = e
	p, err := GetPersonByDNI(dni)
	if err != nil {
		return fullTimeEmployee, err
	}
	fullTimeEmployee.Person = p

	return fullTimeEmployee, nil
}