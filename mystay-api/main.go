package main

import (
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

	routes.Gorm.AutoMigrate(&models.Servicio{}, &models.Reserva{}, &models.Client{})
	client := models.Client{
		DNI:     "12390451X",
		Nhab:    100,
		Premium: true,
		Gasto:   1000,
		Pagado:  false,
	}

	routes.Gorm.Create(&client)

	e.GET("/clients/:id", routes.GetClient)
	e.PUT("/clients/:id", routes.UpdateClient)

	e.POST("/reserves/:id", routes.NewReserve)
	e.GET("/reserves/:id", routes.GetReserves)

	e.POST("/services/:id", routes.NewService)

	e.POST("/pay/:id", routes.CheckOutPay)
	e.GET("/factura/:id", routes.GetFactura)

	e.Logger.Fatal(e.Start(":3000"))
}
