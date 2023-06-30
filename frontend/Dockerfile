FROM node:18.16-alpine

WORKDIR /App

ENV PATH=/App/node_modules/.bin:$PATH
#https://create-react-app.dev/docs/adding-custom-environment-variables/
#https://blog.csdn.net/qq_32682301/article/details/129277342
#ENV REACT_APP_API_HOST=fastapi

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm ci

COPY . .

EXPOSE 3000
CMD npm run start