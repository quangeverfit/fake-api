#!/usr/bin/env bash

cd $(dirname $0)
cd ../cd

echo "Image tag $IMAGE_TAG"
echo "Docker host $MANAGER_HOST"
echo "Env: $PROJECT_ENV"

# Dump service definition
docker-compose -f docker-compose.$PROJECT_ENV.yml config > docker-stack-$PROJECT_ENV.yml
cat docker-stack-$PROJECT_ENV.yml

# Connect to docker swarm
export DOCKER_HOST=$MANAGER_HOST

# Update stack
docker stack deploy --with-registry-auth -c docker-stack-$PROJECT_ENV.yml everfit-demo-$PROJECT_ENV