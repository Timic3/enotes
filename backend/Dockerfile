FROM node:15.2.1

WORKDIR /usr/src/backend

# Add and install dependencies
COPY package*.json ./
RUN npm install

# Add source code
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
