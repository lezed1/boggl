#!/usr/bin/env bash

docker-compose up -d
cloudflared tunnel --hostname boggl.lezed1.com --url http://localhost:44359