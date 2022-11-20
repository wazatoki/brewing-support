ROOT_DIR = $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

.PHONY: execute
execute: serve
	docker exec brewing_support /workspace/brewing_support_linux_amd64.bin

.PHONY: stop
stop:
	cd ./build/tools && \
	docker-compose down -v

.PHONY: serve
serve:
	cd ./build/tools && \
	docker-compose up -d

.PHONY: clean
clean:
	sudo rm -rf build

.PHONY: test
test:
	cd src && \
	go test ./... && \
	cd $(ROOT_DIR)

.PHONY: buildAll
buildAll: clean build
	cd ../frontend && \
	npm run build && \
	cp -r ./dist ../backend/build/workspace/resources/frontend
	rm -rf ../../local-workspace/work/build
	cp -r ../backend/build ../../local-workspace/work/build

.PHONY: build
build: clean
	mkdir -p build/workspace && \
	cd $(ROOT_DIR)src && \
	export GOOS=linux && \
	go build -a -tags netgo -installsuffix netgo --ldflags '-extldflags "-static"' -o ../build/workspace/brewing_support_linux_amd64.bin . && \
	export GOOS=windows && \
	go build -a -tags netgo -installsuffix netgo --ldflags '-extldflags "-static"' -o ../build/workspace/brewing_support_windows_amd64.exe . && \
	cd $(ROOT_DIR) && \
	cp -r ./resources build/workspace/ && \
	cp -r ./tools build/

.PHONY: migrateUP
migrateUP:
	migrate -path resources/migrations -database postgres://brewing_support:brewing_support@brewing_support_postgres_db:5432/brewing_supportdb?sslmode=disable up

.PHONY: migrateDOWN
migrateDOWN:
	migrate -path resources/migrations -database postgres://brewing_support:brewing_support@brewing_support_postgres_db:5432/brewing_supportdb?sslmode=disable down

.PHONY: migrateCreate
migrateCreate:
	ARG=""
	migrate create -ext sql -dir migrations -seq ${ARG}
