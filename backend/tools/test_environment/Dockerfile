FROM golang:1.19-buster

RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@v4.15

RUN mkdir -p /workspace/src && \
mkdir -p /workspace/resources

WORKDIR /workspace