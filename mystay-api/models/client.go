package models

type Client struct {
	ID      uint   `gorm:"primary_key"`
	DNI     string `gorm:"column:dni;unique;not null"`
	Nhab    uint
	Premium bool
	Gasto   float64
	Pagado  bool
}
