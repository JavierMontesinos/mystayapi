package models

import "gorm.io/gorm"

type Client struct {
	gorm.Model
	ID      uint   `gorm:"primary_key"`
	DNI     string `gorm:"column:dni;unique;not null"`
	Nhab    uint
	Premium bool
	Gasto   float64
	Pagado  bool
}
