package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

// Create a route for "/people"
// write a function that uses fmt.fPrint that indicates the request was successful

// BaseURL is the base endpoint for the star wars API
const BaseURL = "https://swapi.dev/api/";

type Planet struct {
	Name       string `json:"name"`
	Population string `json:"population"`
	Terrain    string `json:"terrain"`
}

type Person struct {
	Name         string `json:"name"`;
	HomeworldURL string `json:"homeworld"`;
	Homeworld    Planet;

}

// AllPeople is a colection of Person types
type AllPeople struct {
	People []Person `json:"results"`;
}

func (person *Person) getHomeworld() {
	res, err := http.Get(person.HomeworldURL)
	if err != nil { log.Print("Error Fetching homeworld", err) }

	var bytes []byte
	if bytes, err = ioutil.ReadAll(res.Body); err != nil {
		log.Print("Error reading response body", err);
	}

	json.Unmarshal(bytes, &person.Homeworld);
}

func getPeople(writer http.ResponseWriter, request *http.Request) {
	fmt.Fprint(writer, "Getting people");
	response, err := http.Get(BaseURL + "people");
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest);
		log.Print("Failed to request star wars people");
	}

	fmt.Println(response);

	bytes, err := ioutil.ReadAll(response.Body)

	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest)
		log.Print("Failed to parse request body")
	}

	fmt.Println(string(bytes));

	var people AllPeople;
	if err := json.Unmarshal(bytes, &people); err != nil {
		fmt.Println("Error parsing json", err);
	}

	fmt.Println(people);

	for _, pers := range people.People {
		pers.getHomeworld()
		fmt.Println(pers)
	}
}

func main() {
	fmt.Println(BaseURL);
	http.HandleFunc("/people", getPeople);
	fmt.Println("Server running on port 8080");
	log.Fatal(http.ListenAndServe(":8080", nil));
}
