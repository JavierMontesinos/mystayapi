package models

import "gorm.io/gorm"

type Client struct {
	gorm.Model
	ID        int    `gorm:"primary_key"`
	DNI       string `gorm:"column:dni;unique;not null"`
	Nhab      int
	Premium   bool
	Gasto     float64
	Pagado    bool
	Reservas  []Reserva  `gorm:"foreignKey:ClienteID"`
	Servicios []Servicio `gorm:"foreignKey:ClienteID"`
}
