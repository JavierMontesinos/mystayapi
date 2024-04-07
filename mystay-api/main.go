package main

import (
	"fmt"
	"log"

	"github.com/JavierMontesinos/mystayapi/mystay-api/handlers"
	"github.com/JavierMontesinos/mystayapi/mystay-api/models"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
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

	routes.Gorm.AutoMigrate(&models.Client{}, &models.Servicio{}, &models.Reserva{})
	fmt.Println(routes.Gorm.Migrator().HasTable(&models.Client{}))
}
