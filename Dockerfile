FROM node:8

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install pandoc -y

COPY . /code
WORKDIR /code
ENV NODE_ENV production
RUN npm install

EXPOSE 46536

CMD ["npm", "start"]
