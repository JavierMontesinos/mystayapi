package handlers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/JavierMontesinos/mystayapi/mystay-api/models"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type UserData struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Address   string `json:"address"`
	Zip       string `json:"zip"`
	Email     string `json:"email"`
}

var clientData = UserData{
	FirstName: "My",
	LastName:  "Stay",
	Address:   "Av. Complutense, 30, Moncloa - ",
	Zip:       "28040",
	Email:     "mystay@gmail.com",
}

func parseClientId(idStr string) (int, error) {
	uID, err := strconv.Atoi(idStr)
	if err != nil {
		log.Println("Invalid id passed: ", idStr)
		return 0, echo.NewHTTPError(http.StatusNotFound, "No se puede recuperar usuario")
	}

	return uID, nil
}

func (p pg) GetClient(c echo.Context) error {
	uIdStr := c.Param("id")
	uID, err := parseClientId(uIdStr)
	if err != nil {
		return err
	}

	var client models.Client
	if err := p.Gorm.First(&client, uID).Error; err != nil {
		log.Println("Can't retrieve user with Uid: ", uIdStr)
		return echo.NewHTTPError(http.StatusNotFound, "Usuario no válido")
	}

	// Query other service with DNI to retrieve user information
	log.Println(client.DNI)

	return c.JSON(http.StatusOK, clientData)
}

func (p pg) UpdateClient(c echo.Context) error {
	uIdStr := c.Param("id")
	uID, err := parseClientId(uIdStr)
	if err != nil {
		return err
	}

	var user UserData
	if err := c.Bind(&user); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Datos incorrectos")
	}

	if user.FirstName == "" || user.LastName == "" || user.Address == "" || user.Zip == "" || user.Email == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Datos incorrectos: Todos los campos son obligatorios")
	}

	var client models.Client
	if err := p.Gorm.First(&client, uID).Error; err != nil {
		log.Println("Can't retrieve user with Uid: ", uIdStr)
		return echo.NewHTTPError(http.StatusNotFound, "Usuario no válido")
	}
	// Query other service with DNI to POST new user information

	clientData = user

	return c.NoContent(http.StatusOK)

}

func (p pg) Login(c echo.Context) error {
	type LoginStruct struct {
		DNI  string `json:"dni"`
		Nhab string `json:"nhab"`
	}

	var client LoginStruct
	if err := c.Bind(&client); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Datos no válidos")
	}

	nHab, err := strconv.Atoi(client.Nhab)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Datos no válidos")
	}

	// Check if user exists in the database
	var foundUser models.Client
	if err := p.Gorm.Where("dni = ? AND nhab = ?", client.DNI, nHab).First(&foundUser).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return echo.NewHTTPError(http.StatusUnauthorized, "DNI o Número de habitación incorrectos")
		}
		return echo.NewHTTPError(http.StatusInternalServerError, "Database error")
	}

	// TODO: add jwt
	authToken := "your_generated_auth_token"
	return c.JSON(http.StatusOK, map[string]string{"authToken": authToken})
}
