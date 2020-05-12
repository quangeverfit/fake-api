#!/usr/bin/env bash

cd $(dirname $0)
cd ../

# Build image
docker-compose build

# Up image
docker-compose up -d

# Test image
sleep 3
curl 127.0.0.1:3000