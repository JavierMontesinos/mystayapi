package models

import (
	"time"
)

type Servicio struct {
	ID          int     `gorm:"primary_key"`
	ReservaID   Reserva `gorm:"foreignKey:ID"`
	Tipo        string
	Descripcion string
	Precio      float64
	Fecha       time.Time
}
