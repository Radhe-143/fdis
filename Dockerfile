FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# RUN npm rebuild --verbose sharp
RUN npm install -g node-gyp
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ADD start.sh start-node-app.sh start-queue.sh / 
RUN chmod +x /start.sh 
RUN chmod +x /start-node-app.sh
RUN chmod +x /start-queue.sh

# Node app port
EXPOSE 5001

# Queue port
EXPOSE 4002

CMD [ "/start.sh" ]