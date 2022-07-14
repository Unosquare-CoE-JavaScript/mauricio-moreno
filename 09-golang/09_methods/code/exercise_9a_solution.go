package main

import "fmt"

// User is a user type
type User struct {
	ID                         int
	FirstName, LastName, Email string
}

// Group represents a set of users
type Group struct {
	role           string
	users          []User
	newestUser     User
	spaceAvailable bool
}

func (u *User) describe() string {
	desc := fmt.Sprintf(
		"Name: %s %s, Email: %s, ID: %d",
		u.FirstName,
		u.LastName,
		u.Email,
		u.ID,
	)
	return desc
}

func (group *Group) describe() string {
	if len(group.users) > 2 { group.spaceAvailable = false }

	desc := fmt.Sprintf(
		"This user group has %d. The newest user is %s %s. Accepting New Users: %t",
		len(group.users),
		group.newestUser.FirstName,
		group.newestUser.LastName,
		group.spaceAvailable,
	)
	return desc

}

func main() {
	user1 := User{
		ID: 1,
		FirstName: "Marilyn",
		LastName: "Monroe",
		Email: "marilyn.monroe@gmail.com",
	}

	user2 := User{
		ID: 2,
		FirstName: "Humphrey",
		LastName: "Bogart",
		Email: "humphrey.bogart@gmail.com",
	}

	user3 := User{
		ID: 2,
		FirstName: "Humphrey",
		LastName: "Bogart",
		Email: "humphrey.bogart@gmail.com",
	}

	group := Group{
		role:           "admin",
		users:          []User{user1, user2, user3},
		newestUser:     user2,
		spaceAvailable: true,
	}

	fmt.Println(group.describe())
	fmt.Println(user1.describe())
	fmt.Println(group)
}
