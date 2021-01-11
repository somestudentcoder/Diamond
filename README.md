# Introduction

Diamond is a tool that offers both tree testing and card sorting. It uses Angular as frontend, Node.js
as a server, and MongoDB as a database.

# Features
- Register and login
- Create/edit a study
- Do a study
- Study result analysis

# Running Diamond locally

This is necessary before running Diamond locally first time:

- Go to root directory, and run ```npm install```
- Install MongoDB (required for database)
- In ```server/_helpers/db.js``` on line 2 add your MongoDB connection string.
- In ```src/app/user.service.ts``` uncomment line 12, and comment out line 13.

This is necessary every time in order to run Diamond locally:

- Run MongoDB on your machine, and make it ready for accepting connections
- Go to root directory, and run ```npx ng serve``` for frontend
- Go to root directory, and run ```node server.js``` for Node server

Navigate to http://localhost:4200/ to see the app.

# Deploying Diamond

In order to deploy Diamond on a server, it is necessary that the server has Angular CLI, Node and MongoDB pre-installed. 

Additionally, you have to add your MongoDB connection string in ```server/_helpers/db.js``` on line 6. 

Example for a local MongoDB connection URL: ```mongodb://localhost:27017/node-mongo-registration-login-api```
Example for a Heroku based MongoDB connection URL: ```mongodb+srv://root:root@cluster0-wqaum.mongodb.net/test?retryWrites=true&w=majority```

 In ```src/app/user.service.ts``` comment line 12, and uncomment line 13.

Deploying Diamond can be done by using a [Heroku CLI tool](https://devcenter.heroku.com/articles/heroku-cli).

# Admin Account

Diamond installation comes with a predefined admin account (username: admin, password: admin189m). You should change admin's password as soon as possible on {{Diamond domain}}/admin.