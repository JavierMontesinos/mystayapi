package models

import (
	"time"

	"gorm.io/gorm"
)

type Servicio struct {
	gorm.Model
	ID          int    `gorm:"primary_key"`
	ClienteID   int    `gorm:"not null"`
	Client      Client `gorm:"foreignKey:ClienteID"`
	Tipo        string
	Descripcion string
	Fecha       time.Time
}
