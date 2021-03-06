## Goodwatch
Goodwatch is inspired by GoodReads but with a spin-up where users can write reviews and post discussions on shows. On the website you can leave discussions about a show and rate it.

# Live site
https://goodwatch-app.herokuapp.com/

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


## Splashpage
![splashpage](./images/splashpage.PNG)

## Browse Shows
![browse](./images/browse-shows.PNG)


## Reviews
![reviews](./images/example-show-page.PNG)

## database
![database](./images/db_diagram.PNG)

# Wiki Docs
https://github.com/Breadsandwich/goodwatch/wiki
