#!/bin/bash

echo "Starting Remove Docker Containers"

docker container rm $(docker container ls -aq) -f

echo "Finish Remove Docker Containers"

echo "Starting Remove Docker Volumes"
docker volume rm $(docker volume ls -q)

echo "Finish Remove Docker Volumes"
