package handlers

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type pg struct {
	Gorm *gorm.DB
}

func NewPG() (pg, error) {
	var err error
	numberTries := 10

	for i := 0; i <= numberTries; i++ {
		routes, err := connectPostgres()
		if err == nil {
			return routes, nil
		}

		log.Printf("Can't connect, retrying (try %d): %v", i+1, err)

		time.Sleep(30 * time.Second)
	}

	return pg{}, fmt.Errorf("Did %d attempts and failed all of them: %v", numberTries, err)
}

func connectPostgres() (pg, error) {
	db, err := gorm.Open(postgres.Open(os.Getenv("DBURL")), &gorm.Config{})
	if err != nil {
		return pg{}, fmt.Errorf("unable to create connection pool: %w", err)
	}

	return pg{Gorm: db}, nil
}
