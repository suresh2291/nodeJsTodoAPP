## Pull the mysql:5.7 image
FROM mysql:8.0

# database = test and password for root = password
ENV MYSQL_DATABASE=todoschema \
    MYSQL_ROOT_PASSWORD=amr4utham

# when container will be started, we'll have `todoschema` database created with this schema
COPY ./todoschema.sql /docker-entrypoint-initdb.d/

FROM node:latest
WORKDIR /nodejstodo
COPY package.json /nodejstodo
RUN npm cache clean --force && npm install
COPY . /nodejstodo
CMD npm start
EXPOSE 8000


