FROM node:16

# create app dir
WORKDIR /usr/src/app

# copy source code
COPY . .

RUN npm i

RUN npm run build

CMD ["node", "dist/main"]
