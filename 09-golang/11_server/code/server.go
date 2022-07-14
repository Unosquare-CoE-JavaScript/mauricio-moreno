package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

// Manages the request to the home directory "/"
func home(writer http.ResponseWriter, request *http.Request) {
	fmt.Println("Home!");
}

// Manages the request to the home todos "/todos/"
type Todo struct {
	Title, Content string;
}

type PageVariables struct {
	PageTitle string;
	PageTodos []Todo;
}

var toDosList []Todo;

func todos(writer http.ResponseWriter, request *http.Request) {
	pageVariables := PageVariables{
		PageTitle: "Get Todos",
		PageTodos: toDosList,
	}

	templte, err := template.ParseFiles("todos.html");
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest);
		log.Print("Template parsing error: ", err);
	}

	err = templte.Execute(writer, pageVariables);
}

// Manages adding todo element

func addTodo(writer http.ResponseWriter, request *http.Request) {
	err := request.ParseForm();
	if err != nil {
		http.Error(writer, err.Error(), http.StatusBadRequest);
		log.Print("Request parsing error: ", err);
	}

	todo := Todo{
		Title: request.FormValue("title"),
		Content: request.FormValue("content"),
	}

	toDosList = append(toDosList, todo);
	log.Print(toDosList);
	http.Redirect(writer, request, "/todos/", http.StatusSeeOther);
}

func main() {
	http.HandleFunc("/", home);
	http.HandleFunc("/todos/", todos);
	http.HandleFunc("/add-todos/", addTodo);
	fmt.Println("Server is running on port :8080");
	log.Fatal(http.ListenAndServe(":8080", nil));
}
