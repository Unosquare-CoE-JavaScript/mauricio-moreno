package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Movie struct {
	ID       string    `json:"id"`;
	Isbn     string    `json:"isbn"`;
	Title    string    `json:"title"`;
	Director *Director `json:"director"`;
};

type Director struct {
	Firstname string `json:"firstname"`;
	Lastname  string `json:"lastname"`;
};

var movies []Movie;

func getMovies(writter http.ResponseWriter, r *http.Request) {
	writter.Header().Set("Content-Type", "application/json");
	json.NewEncoder(writter).Encode(movies);
}

func deleteMovie(writter http.ResponseWriter, request *http.Request) {
	writter.Header().Set("Content-Type", "application/json");
	params := mux.Vars(request);
	for index, item := range movies {
		if item.ID == params["id"] {
			movies = append(movies[:index], movies[index + 1:]...);
			break;
		}
	}
	json.NewEncoder(writter).Encode(movies);
}

func getMovie(writter http.ResponseWriter, request *http.Request) {
	writter.Header().Set("Content-Type", "application/json");
	params := mux.Vars(request);
	for _, movie := range movies {
		if movie.ID == params["id"] {
			json.NewEncoder(writter).Encode(movie);
			return;
		}
	}
	json.NewEncoder(writter).Encode(movies);
}

func createMovie(writter http.ResponseWriter, request *http.Request) {
	writter.Header().Set("Content-Type", "application/json");
	var currentMovie Movie;
	_ = json.NewDecoder(request.Body).Decode(&currentMovie);
	currentMovie.ID = strconv.Itoa(rand.Intn(10000000));
	movies = append(movies, currentMovie);
	json.NewEncoder(writter).Encode(currentMovie);
}

func updateMovie(writter http.ResponseWriter, request *http.Request) {
	//? Set json content type
	writter.Header().Set("Content-Type", "application/json");
	//? params
	params := mux.Vars(request);
	//? loop over the movies, range
	for index, item := range movies {
		if item.ID == params["id"] {
			movies = append(movies[:index], movies[index + 1:]...);
			var movie Movie;
			_ = json.NewDecoder(request.Body).Decode(&movie);
			movie.ID = params["id"];
			movies = append(movies, movie);
			json.NewEncoder(writter).Encode(movie);
			return;
		}
	}
	//? Delete the movie with the id that you've sent
	//? Add a new movie -the movie that we send in the body of postman
}

func main() {
	r := mux.NewRouter();

	movies = append(movies,Movie{
		ID: "1",
		Isbn: "438227",
		Title: "Movie One",
		Director: &Director{
			Firstname: "John",
			Lastname: "Doe",
		},
	});
	movies = append(movies, Movie{
		ID: "2",
		Isbn: "438228",
		Title: "Movie Two",
		Director: &Director{
			Firstname: "Joe",
			Lastname: "Rogan",
		},
	});
	r.HandleFunc("/movies", getMovies);
	r.HandleFunc("/movies/{id}", getMovie).Methods("GET");
	r.HandleFunc("/movies", createMovie).Methods("POST");
	r.HandleFunc("/movies/{id}", updateMovie).Methods("PUT");
	r.HandleFunc("/movies/{id}", deleteMovie).Methods("DELETE");

	fmt.Printf("Starting server at port 8080\n");
	log.Fatal(http.ListenAndServe(":8080", r));
}
