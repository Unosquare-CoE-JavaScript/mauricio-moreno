package main

import "fmt"

// A User is a user type
type User struct {
	ID                         int
	FirstName, LastName, Email string
}

var user = User{
	ID:        1,
	FirstName: "Marilyn",
	LastName:  "Monroe",
	Email:     "marilynmonroe@gmail.com",
}

func updateEmail(user *User) {
	user.Email = "myEmail@gmail.com"
	fmt.Println("Updated use email", user.Email)
}

func main() {
	fmt.Println("Pointers!")
	updateEmail(&user)
	fmt.Println("Updated User: ", user)
}
