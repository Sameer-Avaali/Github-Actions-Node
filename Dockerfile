FROM node

WORKDIR /NODETEMP

ENV MONGODB_USERNAME=admin \
    MONGODB_PASSWORD=qwerty

COPY . .

RUN npm install

CMD ["node", "server.js"]