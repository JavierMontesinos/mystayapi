package handlers

import (
	"net/http"
	"time"

	"github.com/JavierMontesinos/mystayapi/mystay-api/models"
	"github.com/labstack/echo/v4"
)

func (p pg) NewService(c echo.Context) error {
	uIdStr := c.Param("id")
	uID, err := parseClientId(uIdStr)
	if err != nil {
		return err
	}

	var servicio models.Servicio
	if err := c.Bind(&servicio); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "No se han enviado los datos correctos")
	}

	if servicio.Fecha.IsZero() {
		servicio.Fecha = time.Now()
	}
	if servicio.Descripcion == "" || servicio.Tipo == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "No se han enviado los datos correctos: tipo y descripcion son obligatorios")
	}

	servicio.ClienteID = uID

	if err := p.Gorm.Create(&servicio).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "No se ha podido pedir el servicio")
	}

	return c.NoContent(http.StatusOK)
}
