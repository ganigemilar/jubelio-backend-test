<h1 align="left">Jubelio Test - Backend</h1>

# Description
Create with **HapiJS** for building backend.

## Start Project
```bash
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Basic Auth
For authentication, this service using **Basic Auth** for each request.
Authentication base on "tbl_auth"

## Database Migration
On folder "./migration" to save database migration script. You can use to migrate database later.

## Database Container - Postgres
Using Docker for running database postgres. You can just running this script below.
```bash
docker-compose -f docker-compose.db.yml up --build
```
or
```bash
docker-compose -f docker-compose.db.yml up
```