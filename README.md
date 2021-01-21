# Introduction

Diamond is a tool that offers both tree testing and card sorting. It uses Angular as frontend, Node.js
as a server and MongoDB as a database.

# Features
- Registration and login
- Create/edit/delete a study
- Import cards as .csv
- Launch/unlaunch a study
- Do a study
- Study result analysis
- Export results as .csv

# Running Diamond locally

This is necessary before running Diamond locally first time:

- Go to root directory, and run ```npm install```
- Install MongoDB (required for database)
- In ```server/user-paths.js``` configure your server URL and your MongoDB connection string for local.

This is necessary every time in order to run Diamond locally:

- Run MongoDB on your machine, and make it ready for accepting connections
- Go to root directory, and run ```npx ng serve``` for frontend
- Go to root directory, and run ```node server.js``` for Node server

Navigate to http://localhost:4200/ to see the app.

# Deploying Diamond

In order to deploy Diamond on a server, it is necessary that the server has Angular CLI, Node and MongoDB pre-installed. 

Additionally, you have to configure your Server URL and your MongoDB connection string in ```server/user-paths.js```.

Examples: <br>
Local MongoDB connection URL: ```mongodb://localhost:27017/node-mongo-registration-login-api```.<br>
Heroku based MongoDB connection URL: ```mongodb+srv://root:root@cluster0-wqaum.mongodb.net/test?retryWrites=true&w=majority```

Deploying Diamond can be done by using a [Heroku CLI tool](https://devcenter.heroku.com/articles/heroku-cli).

# Admin Account

Diamond installation comes with a predefined admin account for localhost (username: admin, password: admin189m). You should change admin's password as soon as possible on {{Diamond domain}}/admin.
The admin account information for the deployed version on Heroku is different. (username: admin, password: iaweb-admin2021)
