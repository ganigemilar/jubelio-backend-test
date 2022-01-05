<h1 align="left">Jubelio Test - Backend</h1>

# Description
Create with **HapiJS** for building backend.

## Start Project
```bash
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Authentication
For authentication, this service using **Basic Auth** for each request.
Authentication base on "tbl_auth"
Here you can use username:password for default user
"jubelio_test_app:$2b$10$DkuvsPJVCB.NUilWeih7WuLru0tlKndhcezS/CjX4M2zuQh9PaRDi"

## Database Container - Postgres
Using Docker for running database postgres. You can just running this script below.
```bash
docker-compose -f docker-compose.db.yml up --build
```
or
```bash
docker-compose -f docker-compose.db.yml up
```

## Database Migration
On folder "./migration" to save database migration script. You can use to migrate database later.
Here for step migrate for the first time
1. Make sure run docker-compose.db.yml for running container database
2. Try to access the bash container database "postgres"
```bash
docker exec -it postgres /bin/bash
```
3. When success access to the bash, try run the script below for create new db
```bash
createdb -U postgres db_jubelio
```
4. Now you import script database from "./migration". You can use Dbeaver or terminal to import database, 
here for login detail:
 - user     = postgres
 - pass     = password
 - database = db_jubelio
 - port     = 5432
 - host     = localhost  
