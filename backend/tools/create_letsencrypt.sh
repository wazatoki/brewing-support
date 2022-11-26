#! /bin/sh

CURRENT=$(cd $(dirname $0);pwd)
cd $CURRENT

docker compose run --rm certbot certonly --webroot -w /var/www/html -d www.example.com