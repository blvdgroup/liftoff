# based off node 10, would use node 8 LTS but short LTS window
FROM node:10-alpine

WORKDIR /app
ADD . /app

# install deps
RUN yarn

# build server
RUN npm run build

EXPOSE 3000

CMD ["node", "build/server/index.js"]
