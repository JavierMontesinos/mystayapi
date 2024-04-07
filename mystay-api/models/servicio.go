package models

import (
	"time"

	"gorm.io/gorm"
)

type Servicio struct {
	gorm.Model
	ID          int    `gorm:"primary_key"`
	ClienteID   Client `gorm:"foreignKey:ID"`
	Tipo        string
	Descripcion string
	Precio      float64
	Fecha       time.Time
}
