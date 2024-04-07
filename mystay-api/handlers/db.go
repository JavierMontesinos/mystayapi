package handler

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"os/exec"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type postgres struct {
	Pool *pgxpool.Pool
}

func NewPG() (postgres, error) {
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

	return postgres{}, fmt.Errorf("Did %d attempts and failed all of them: %v", numberTries, err)
}

func connectPostgres() (postgres, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// New pool no config
	dbPool, err := pgxpool.New(ctx, os.Getenv("DBURL"))
	if err != nil {
		return postgres{}, fmt.Errorf("unable to create connection pool: %w", err)
	}

	if err = dbPool.Ping(ctx); err != nil {
		dbPool.Close()
		return postgres{}, fmt.Errorf("unable to create ping database: %w", err)
	}

	return postgres{Pool: dbPool}, nil
}
