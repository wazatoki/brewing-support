#!/bin/bash


CURRENT=$(cd $(dirname $0);pwd)
cd $CURRENT

{
    echo "---- start renew-cert $(date '+%Y-%m-%d %H:%M:%S')"

    cd /opt/apps || exit 1

    nyan=$(docker-compose run --rm certbot renew --post-hook='echo nyan')

    if echo "${nyan}" | grep -q "nyan"; then
        docker-compose exec nginx nginx -s reload
    fi

} >> /var/log/renew-cert.log 2>&1