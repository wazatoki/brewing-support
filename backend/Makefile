ROOT_DIR = $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

.PHONY: execute
execute: start
	docker exec brewing_support /workspace/brewing_support_linux_amd64.bin

.PHONY: stop
stop:
	cd ./tools && \
	docker-compose down -v

.PHONY: start
start:
	cd ./tools && \
	docker-compose up -d

.PHONY: clean
clean:
	sudo rm -rf build

.PHONY: test
test:
	docker exec test_golang go test ./...

.PHONY: testClean
testClean:
	docker exec test_golang sh -c 'go clean -testcache && go test ./...'

.PHONY: buildProduction
buildProduction: buildAll
	rm -f ./tools/docker-compose.yml
	cp ./tools/docker-compose-production.yml ./tools/docker-compose.yml
	rm -f ./tools/execution_environment/reverse-proxy/default.conf
	cp ./tools/execution_environment/reverse-proxy/default-production.conf ./tools/execution_environment/reverse-proxy/default.conf
	sudo rm -rf ../../local-workspace/work/build
	sudo cp -r ../backend/build ../../local-workspace/work/build
	sudo rm -rf ../../local-workspace/work/tools
	sudo cp -r ../backend/tools ../../local-workspace/work/tools

.PHONY: buildAll
buildAll: clean build
	cd ../frontend && \
	npm run build && \
	cp -r ./dist ../backend/build/resources/frontend
	rm -f ./tools/docker-compose.yml
	cp ./tools/docker-compose-development.yml ./tools/docker-compose.yml
	rm -f ./tools/execution_environment/reverse-proxy/default.conf
	cp ./tools/execution_environment/reverse-proxy/default-development.conf ./tools/execution_environment/reverse-proxy/default.conf

.PHONY: build
build: clean
	mkdir -p build && \
	cd $(ROOT_DIR)src && \
	export GOOS=linux && \
	go build -a -tags netgo -installsuffix netgo --ldflags '-extldflags "-static"' -o ../build/brewing_support_linux_amd64.bin . && \
	export GOOS=windows && \
	go build -a -tags netgo -installsuffix netgo --ldflags '-extldflags "-static"' -o ../build/brewing_support_windows_amd64.exe . && \
	cd $(ROOT_DIR) && \
	cp -r ./resources build/

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
