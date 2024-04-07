package models

import (
	"time"
)

type Reserva struct {
	ID               int `gorm:"primary_key"`
	ClienteID        int `gorm:"foreignKey:Client.ID"`
	FechaInicio      time.Time
	FechaFinal       time.Time
	NumeroHabitacion int
	TipoHabitacion   string
	Precio           float64
	Pagado           bool
	HotelID          int
}
