# I used the following guide
# https://mherman.org/blog/dockerizing-an-angular-app/

# base image
FROM node:12 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN yarn install
RUN yarn global add @angular/cli

# add app
COPY . /app

# generate build
RUN ng build --prod --output-path=dist

### The above is run in an intermediary container so that we can use the benefits of node.js/yarn
### We then copy the produced results into our nginx container, which is super fast.

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 4200 (because I'll configure 80 to map to 4200 in docker-compose.yml)
EXPOSE 4200

# run nginx
CMD ["nginx", "-g", "daemon off;"]
