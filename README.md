
# Local setup

  

**Prerequisites**

- Don't use windows os (**Joseph Prekrath**)

- Download docker

- Download node

-  **Use yarn not npm**

  
  

**Download**

  

git clone https://github.com/threeOagency/RestoranAPI

  

**Install packages**

- Open terminal and go to app directory

- Then run comand **yarn**

- Open app in folder or editor

- Create .env file and copy .env.example file inside

- Ask teammate for data necessary

  

**Run app**

- In terminal run command yarn start:dev

  

# Setup database

  Docker should be installed at this point

- Run `docker run --name res-api-pg -e POSTGRES_USER=res -e POSTGRES_PASSWORD=res -p 5455:5432 -d postgres:latest`
- Put secrets in .env file
- Run migrations `yarn run:migrations`

Local connection string example = postgres://res:res@localhost:5455/res
  

# Run tests

`yarn test` 
