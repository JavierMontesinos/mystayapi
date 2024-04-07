package models

import (
	"time"
)

type Servicio struct {
	ID          int `gorm:"primary_key"`
	ReservaID   int `gorm:"foreignKey:Client.ID"`
	Tipo        string
	Descripcion string
	Precio      float64
	Fecha       time.Time
}
