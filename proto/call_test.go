package proto

import (
	"log"
	"net"
	"testing"
	"time"

	"github.com/komly/grpc-ui/fixtures/simple"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	grpcr "google.golang.org/grpc/reflection"
)

type stub struct {
}

func (s *stub) Test(ctx context.Context, req *simple.Req) (*simple.Res, error) {
	return &simple.Res{
		Int32Field: req.Int32Field,
	}, nil
}

func TestSimpleTypes(t *testing.T) {
	t.SkipNow()
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}

	defer ln.Close()

	s := grpc.NewServer()
	simple.RegisterSimpleServer(s, &stub{})
	grpcr.Register(s)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	go func() {
		if err := s.Serve(ln); err != nil {
			t.Fatal(err)
		}
		defer s.Stop()

		<-ctx.Done()
	}()

	resp, err := Invoke(ctx, ln.Addr().String(), "simple", "Simple", "Test", []FieldValue{
		FieldValue{1, "1"},
	})
	if err != nil {
		t.Fatalf("Invoke err: %v", err)
	}

	log.Printf("Resp: %v", resp)

}
