package handlers

import (
	"log"
	"net/http"
	"time"

	"github.com/JavierMontesinos/mystayapi/mystay-api/models"
	"github.com/labstack/echo/v4"
)

type ReservationRequest struct {
	StartDate time.Time `json:"startDate"`
	EndDate   time.Time `json:"endDate"`
}

type ReservationInfo struct {
	StartDate time.Time `json:"startDate"`
	EndDate   time.Time `json:"endDate"`
	Hotel     string    `json:"hotel"`
}

type PaymentData struct {
	Bank string `json:"bank"`
	CVV  string `json:"cvv"`
}

func (p pg) NewReserve(c echo.Context) error {
	uIdStr := c.Param("id")
	uID, err := parseClientId(uIdStr)
	if err != nil {
		return err
	}

	req := new(ReservationRequest)
	if err := c.Bind(req); err != nil {
		log.Println(err)
		return echo.NewHTTPError(http.StatusBadRequest, "No se han enviado los datos correctos")
	}

	if req.StartDate.IsZero() || req.EndDate.IsZero() {
		return echo.NewHTTPError(http.StatusBadRequest, "Se necesitan tanto a fecha de inicio como la de fin")
	}

	newReserve := models.Reserva{
		ClienteID:   uID,
		FechaInicio: req.StartDate,
		FechaFinal:  req.EndDate,
		Llave:       "llave",
		HotelID:     1,
	}

	if dbc := p.Gorm.Create(&newReserve); dbc.Error != nil {
		log.Println("Couldn't append the new reservation to db: ", err)
		return echo.NewHTTPError(http.StatusBadRequest, "Se necesitan tanto a fecha de inicio como la de fin")
	}

	return c.NoContent(http.StatusOK)
}

func (p pg) GetReserves(c echo.Context) error {
	uIdStr := c.Param("id")
	uID, err := parseClientId(uIdStr)
	if err != nil {
		return err
	}

	var reserves []models.Reserva
	if dbc := p.Gorm.Where("cliente_id = ?", uID).Find(&reserves); dbc.Error != nil {
		log.Println("Error retrieving reserves from database: ", dbc.Error)
		return echo.NewHTTPError(http.StatusInternalServerError, "Error retrieving reserves from database")
	}

	var reserveResponse []ReservationInfo
	for _, reserve := range reserves {
		reserveResp := ReservationInfo{
			StartDate: reserve.FechaInicio,
			EndDate:   reserve.FechaFinal,
			Hotel:     "NH Hotel",
		}

		reserveResponse = append(reserveResponse, reserveResp)
	}

	return c.JSON(http.StatusOK, reserveResponse)
}

func (p pg) CheckOutPay(c echo.Context) error {
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

	if client.Pagado {
		return echo.NewHTTPError(http.StatusForbidden, "Ya se ha pagado")
	}

	var paymentData PaymentData
	if err := c.Bind(&paymentData); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "No se han enviado los datos correctos")
	}

	if paymentData.Bank == "" || paymentData.CVV == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Se necesitan tanto Bank como CVV")
	}

	client.Pagado = true

	if err := p.Gorm.Save(&client).Error; err != nil {
		log.Println("Failed to update pagado status for user with Uid: ", uIdStr)
		return echo.NewHTTPError(http.StatusInternalServerError, "No se ha podido marcar como pagada")
	}

	return c.NoContent(http.StatusOK)
}

func (p pg) GetFactura(c echo.Context) error {
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

	if !client.Pagado {
		return echo.NewHTTPError(http.StatusForbidden, "Para obtener su factura debe haber realizado el pago de su estancia antes")
	}

	return c.JSON(http.StatusOK, map[string]float64{"message": client.Gasto})
}
