package main

import (
	"github.com/JavierMontesinos/mystayapi/mystay-api/handlers"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"log"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("No .env file")
	}

	e := echo.New()

	routes, err := handlers.NewPG()
	if err != nil {
		log.Fatal(err)
	}

	e.GET("/user/:id", routes.GetUser)
	e.Logger.Fatal(e.Start(":3000"))
}
