FROM node:16

WORKDIR /app

# Copia package.json y package-lock.json primero
COPY . /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
