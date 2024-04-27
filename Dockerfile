FROM node:alpine  
WORKDIR /usr/src/app   
COPY package*.json ./  
RUN npm install --force
COPY . .   
CMD [ "ng", "serve" ]   
