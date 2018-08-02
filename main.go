package main

//go:generate esc -o http_server/esc.go -pkg=http_server static
import (
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/komly/grpc-ui/http_server"
)

var (
	httpAddr string
	// devMode for developping (use local FS instead of memFS in this mode)
	devMode bool
)

func main() {
	flag.StringVar(&httpAddr, "http", ":8080", "http server listening addr")
	flag.BoolVar(&devMode, "dev_mode", false, "developping mode")
	flag.Parse()

	srv := http_server.New(httpAddr, devMode)
	fmt.Printf("grpc-ui started at %s\ndev_mode=%t\n", httpAddr, devMode)
	if err := srv.Start(); err != nil {
		log.Printf("http server error: %v", err)
		os.Exit(1)
	}
}
