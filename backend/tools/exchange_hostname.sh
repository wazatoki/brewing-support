#! /bin/sh

CURRENT=$(cd $(dirname $0);pwd)
cd $CURRENT

find . -type f -print0 | xargs -0 sed -i -e "s/www.example.com/brewing-support.com/g" 