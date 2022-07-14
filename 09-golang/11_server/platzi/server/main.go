package main

import (
	"fmt"
	"log"
	"net/http"
)

func formHandler(writer http.ResponseWriter, request *http.Request) {
	if err := request.ParseForm(); err != nil {
		fmt.Fprintf(writer, "ParseForm() err: %v", err);
		return;
	}
	fmt.Fprintf(writer, "Post request successful\n");
	name := request.FormValue("name");
	address := request.FormValue("address");
	fmt.Fprintf(writer, "Name = %s\n", name);
	fmt.Fprintf(writer, "Address = %s\n", address);
}

func helloHandler(writer http.ResponseWriter, request *http.Request) {
	if request.URL.Path != "/hello" {
		http.Error(writer, "404 not found", http.StatusNotFound);
		return;
	}
	if request.Method != "GET" {
		http.Error(writer, "Method not allowed on this path", http.StatusBadRequest);
		return;
	}

	fmt.Fprintf(writer, "Hello wooorld!")
}

func main() {
	fileServer := http.FileServer(http.Dir("./static"))
	http.Handle("/", fileServer);
	http.HandleFunc("/form", formHandler);
	http.HandleFunc("/hello", helloHandler);

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	};
}
