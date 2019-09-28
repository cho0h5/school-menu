package main

import ("net/http"
        "github.com/gorilla/mux"
        //"encoding/json"
        "log"
        "fmt"
       )

func main() {
    router := mux.NewRouter()
    router.HandleFunc("/", HomeHandler)
    router.HandleFunc("/", HomeHandler)
    router.HandleFunc("/", HomeHandler)
    log.Fatal(http.ListenAndServe(":3000", router))
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome home!")
}

