#!/usr/bin/env bash

docker-compose pull
docker-compose up --detach --no-build --force-recreate --always-recreate-deps --remove-orphans
cloudflared tunnel --hostname boggl.lezed1.com --url http://localhost:3000