# based off node 10, would use node 8 LTS but short LTS window
FROM node:10-alpine

WORKDIR /app
ADD . /app

# install deps
RUN yarn

# TODO: start and run local server, will do later
