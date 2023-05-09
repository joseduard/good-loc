FROM node


RUN mkdir -p /app

WORKDIR /app

COPY src/package*.json .

RUN npm install

COPY src/ .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]