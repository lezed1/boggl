#!/usr/bin/env bash

git pull
docker-compose pull
docker-compose up --detach --no-build --remove-orphans