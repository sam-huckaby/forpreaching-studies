# Using the node image gives us yarn for free
FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Copy dependency lists
COPY package.json ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# This would allow for serving the react app seprately, which is too much right now
#RUN yarn global add serve

EXPOSE 3001

# Give the command that will actually be called when the image is started
CMD [ "node", "index.js" ]