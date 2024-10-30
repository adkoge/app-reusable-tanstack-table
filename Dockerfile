FROM node:18.18.0-alpine

RUN apk --no-cache add zsh curl git

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]