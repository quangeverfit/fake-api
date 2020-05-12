#!/usr/bin/env bash

cd $(dirname $0)
cd ../

# login

echo "Push image to $IMAGE_URL"

# Tag image
docker tag everfit-demo-api:latest $IMAGE_URL

# Push image
docker push $IMAGE_URL
