package models

type Client struct {
	Firstname string `json:"firstname"`
	Surname   string `json:"surname"`
	Address   string `json:"address"`
	ZIP       string `json:"zip"`
	Email     string `json:"email"`
}
