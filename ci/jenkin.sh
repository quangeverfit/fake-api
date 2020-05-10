#!/usr/bin/env bash

cd $(dirname $0)
cd ../


# Build image
docker-compose build

# Up image
docker-compose up -d