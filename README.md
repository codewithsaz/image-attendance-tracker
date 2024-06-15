
# Image Employee Portal

A Portal for employee to mark attendance, apply for leave. Admin dashboard to manage all employe, view employee working status, approve leave, perform CRUD operation


## Installation - Frontend

Frontend was created using vite@latest

```bash
  cd client
  npm i
```
To run project in development
```bash
  npm run dev
```
create  .env file in client root directory, add these values
```bash
  VITE_BASE_URL = "http://localhost:4000"
```
To build project 
```bash
  npm run build
```
## Installation - Backend

Initialize backend

```bash
  cd backend
  npm i
```
To run backend in development (nodemon)
```bash
  npm run dev
```
create  .env file in client root directory, add these values
```bash
mongoDBLocal = " <local or mongodb atlas connection string >"
SALT_ROUNDS = 10
PORT = 4000
NODE_MAILER_EMAIL ="<Emailid for nodemailer"
NODE_MAILER_PASS ="<Password for nodemailer"
COOKIE_SECRET_KEY="< 64bit key to sign cookies>"
JWT_SECRET_KEY = "<64 bit key for jwt"
```
To start backend server 
```bash
  npm start
```
## Warning

- Use real email id and phone number when create employee record, there is an active reminder system.
- Daily Shift reminder are done using Cron-job (disabled by default)

