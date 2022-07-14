// // Uncomment the entire file

package main

import "fmt"

func main() {

	var userEmails map[int]string

	userEmails[1] = "user1@gmail.com"
	userEmails[2] = "user2@gmail.com"

	fmt.Println(userEmails)

	// ****************************

	var userEmails2 map[int]string = make(map[int]string)
	// userEmails := make(map[int]string)

	userEmails2[1] = "user1@gmail.com"
	userEmails2[2] = "user2@gmail.com"

	fmt.Println(userEmails2)

	// ****************************

	userEmails3 := map[int]string{
		1: "user1@gmail.com",
		2: "user2@gmail.com",
	}

	fmt.Println(userEmails3)

	// ****************************

	userEmails4 := map[int]string{
		1: "user1@gmail.com",
		2: "user2@gmail.com",
	}

	fmt.Println(userEmails4)

	fmt.Println(userEmails4[1])

	// ****************************

	userEmails5 := map[int]string{
		1: "user1@gmail.com",
		2: "user2@gmail.com",
	}

	fmt.Println(userEmails5)

	userEmails5[1] = "newUser1@gmail.com"

	fmt.Println(userEmails5)

	fmt.Println(userEmails5[3])

	// ****************************

	userEmails6 := map[int]string{
		1: "user1@gmail.com",
		2: "user2@gmail.com",
	}

	email1, ok := userEmails6[1]
	fmt.Println("Email:", email1, "Present?", ok)

	// email3, ok := userEmails6[3]
	// fmt.Println("Email", email3, "Present?", ok)

	// ****************************

	userEmails7 := map[int]string{
		1: "user1@gmail.com",
		2: "user2@gmail.com",
	}

	if email, ok := userEmails7[1]; ok {
		fmt.Println(email)
	} else {
		fmt.Println("I don't know what you want from me")
	}

	// ****************************

	userEmails8 := map[int]string{
		1: "user1@gmail.com",
		2: "user2@gmail.com",
	}

	delete(userEmails8, 2)

	fmt.Println(userEmails8)
	// ****************************

	userEmails9 := map[int]string{
		1: "user1@gmail.com",
		2: "user2@gmail.com",
	}

	for k, v := range userEmails9 {
		fmt.Printf("%s has an ID of %d.\n", v, k)
	}
	// ****************************
}
