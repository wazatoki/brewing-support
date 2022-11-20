#! /bin/bash

CURRENT=$(cd $(dirname $0);pwd)

docker exec brewing_support /workspace/brewing_support_linux_amd64.bin
