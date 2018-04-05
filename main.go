package main

import (
	"github.com/komly/grpc-ui/config"
	"github.com/komly/grpc-ui/http_server"
	"log"
	"os"
)

func main() {
	cfg := config.MustFromFlags(&config.Config{
		StaticDir: "",
	})

	srv := http_server.New(cfg.HttpAddr, cfg.StaticDir)
	if err := srv.Start(); err != nil {
		log.Printf("http server error: %v", err)
		os.Exit(1)
	}
}

