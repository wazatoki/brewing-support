#! /bin/bash

CURRENT=$(cd $(dirname $0);pwd)
cd $CURRENT

docker compose up -d