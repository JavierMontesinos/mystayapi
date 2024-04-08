package models

import (
	"time"

	"gorm.io/gorm"
)

type Reserva struct {
	gorm.Model
	ID          int `gorm:"primary_key"`
	ClienteID   int
	Client      Client `gorm:"foreignKey:ClienteID"`
	FechaInicio time.Time
	FechaFinal  time.Time
	Llave       string
	HotelID     int
}
