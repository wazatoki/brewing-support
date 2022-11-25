#! /bin/sh

docker run --rm -e SSL_SUBJECT="localhost" -e SSL_DNS="localhost" -v $(pwd)/execution_environment/certs:/certs  paulczar/omgwtfssl