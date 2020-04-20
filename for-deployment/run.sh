#!/usr/bin/env bash

docker-compose pull
docker-compose up -d
cloudflared tunnel --hostname boggl.lezed1.com --url http://localhost:3000