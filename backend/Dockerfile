#Starting Point
FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT = 3001

EXPOSE 3001

CMD ["npm","start"]