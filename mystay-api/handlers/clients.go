package handlers

import (
	"github.com/JavierMontesinos/mystayapi/mystay-api/models"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
	"strconv"
)

func (p pg) GetUser(c echo.Context) error {
	uIdStr := c.QueryParam("id")
	uID, err := strconv.Atoi(uIdStr)
	if err != nil {
		log.Println("Invalid id passed: ", uIdStr)
		return echo.NewHTTPError(http.StatusNotFound, "No se puede recuperar usuario")
	}

	log.Println(uID)

	var client models.Client
	if err := p.Gorm.First(&client, uID).Error; err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Cliente not found"})
	}

	return c.JSON(http.StatusOK, client)
}
