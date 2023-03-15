#!/bin/bash

echo "external schema: "$1
echo "external domain: "$2
echo "external port: "$3

BASIC_SCHEMA=$1
if [ ! -n "$BASIC_SCHEMA" ];then
BASIC_SCHEMA=http
fi

BASIC_DOMAIN=$2
if [ ! -n "$BASIC_DOMAIN" ];then
BASIC_DOMAIN=next.biloop.cn
fi

BASIC_PORT=$3
if [ ! -n "$BASIC_PORT" ];then
BASIC_PORT=80
fi

BASIC_IMAGE_NAME=$4
if [ ! -n "$BASIC_IMAGE_NAME" ];then
BASIC_IMAGE_NAME=gomk-f-next
fi

echo "real domain: "$BASIC_SCHEMA"://"$BASIC_DOMAIN":"$BASIC_PORT

rm -rf ./apps/portal-view/dist 
mkdir -p dist 

echo "########## npm install cnpm #########"
sudo npm i -g pnpm

export NODE_ENV=" "
echo "########## pnpm install dedenpencies #########"
pnpm install

echo "########## cnpm build dists #########"
export NODE_ENV=production
export VUE_APP_V4_BASE_URL=$BASIC_SCHEMA://$BASIC_DOMAIN:$BASIC_PORT
echo "VUE_APP_V4_BASE_URL="$VUE_APP_V4_BASE_URL
pnpm run build

echo "########## tar dists #########"
cd ./apps/portal-view/dist 
tar -czvf dist.tar.gz .

echo "########## docker build #########"
cd ../../../
docker build -t $BASIC_IMAGE_NAME:latest -f ./sandboxdeploy/Dockerfile .
