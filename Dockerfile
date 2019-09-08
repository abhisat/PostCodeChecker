# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /client/node_modules/.bin:$PATH

# install and cache app dependencies
COPY /client/package.json /client/package.json

RUN yarn install && yarn add react-scripts -g

# start app
CMD ["npm", "start"]

EXPOSE 3000