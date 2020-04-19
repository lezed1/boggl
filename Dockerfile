FROM ubuntu:18.04

RUN apt-get -y update && apt-get -y upgrade
RUN apt-get install -y curl less
RUN curl https://install.meteor.com/?release=1.10.1 | sh

RUN useradd -ms /bin/bash web-runner
USER web-runner

RUN meteor help

WORKDIR /home/web-runner/code/boggl
CMD [ "meteor" ]
