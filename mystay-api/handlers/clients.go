package handlers

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (pg postgres) GetUser(c echo.Context) error {
	uIdStr := c.QueryParam("id")
	uID, err := strconv.Atoi(uIdStr)
	if err != nil {
		log.Println("Invalid id passed: ", uIdStr)
		return echo.NewHTTPError(http.InternalServerError, "No se puede recuperar usuario")
	}
	user := User{
		ID:       uID,
		Username: "example_user",
		Email:    "user@example.com",
	}

	return c.JSON(http.StatusOK, user)
}

func (pg postgres) EditUser(c echo)
