FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install
    
COPY script/src ./src

EXPOSE 8888

CMD ["node", "src/index.js"]
