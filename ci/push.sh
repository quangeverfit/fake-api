#!/usr/bin/env bash

cd $(dirname $0)
cd ../

# Tag image with newest version
docker tag everfit-demo-api:latest "$IMAGE_URL_WITHOUT_VER:latest"

# Push latest image
docker push "$IMAGE_URL_WITHOUT_VER:latest"

# Tag image with specfic version
IMAGE_URL="$IMAGE_URL_WITHOUT_VER:$IMAGE_TAG"
docker tag everfit-demo-api:latest $IMAGE_URL

# Push image with specfic version
docker push $IMAGE_URL

# Remove image 
docker image rm everfit-demo-api:latest -f
docker image rm $IMAGE_URL -f