## Goodwatch
Goodwatch is inspired by GoodReads but with a spin-up where users can write reviews and post discussions on shows. On the website you can leave discussions about a show and rate it.

# Features
 Logged in users can :
  - add, edit, and delete watchlists
  - add, edit, and delete shows
  - add, edit, and delete reviews
  - update watch status

# How to start development environment
 * Clone this repository: ```git clone git@github.com:Breadsandwich/goodwatch.git```

* Install dependencies: ```npm install```

*  Create a .env file based on the .env.example given

*  Setup your username and database based on what you setup in your .env

* Migrate and Seed models by running:

   * ```npx dotenv sequelize db:migrate```

   * ```npx dotenv sequelize db:seed:all```

* Start the app using: ```npm start```

# Technologies used
* Git
* Javascript
* NodeJS
* Pug
* Express
* Heroku
* CSS
* bcryptjs
* Postgresql

# Live site
https://goodwatch-app.herokuapp.com/

## Browse Shows
![browse]: ./images/browse-shows.png

## Post, edit, delete review
![edit-review]

## Reviews
![reviews]

## database
![database]

# Wiki Docs
https://github.com/Breadsandwich/goodwatch/wiki


[edit-review]: ./images/goodwatch-edit-review.png
[browse]: ./images/browse-shows.png
[reviews]: ./images/example-show-page.png
[database]: ./images/db_diagram.png
