#!/usr/bin/env bash

server=ubuntu@18.196.229.25

scp -r ./docker-compose.yml $server:~/latex2html/docker-compose.yml
ssh $server "sudo docker stack deploy -c ./latex2html/docker-compose.yml latex2html"

