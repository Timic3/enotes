FROM node:15.2.1

WORKDIR /usr/src/frontend

# Add and install dependencies
COPY package*.json ./
RUN npm install

# Add source code
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
