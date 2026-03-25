A full-stack Medicine E-commerce Web Application built using Angular (Frontend), NestJS (Backend), and PostgreSQL (Database).
This project allows users to browse medicines, view product details, and manage data through a modern full-stack architecture.

🚀 Features
Modern responsive UI built with Angular
Backend REST API using NestJS
PostgreSQL database integration
Product listing with images and prices
Product details page
Category filtering
Clean and scalable project structure
Full frontend + backend integration
🛠️ Tech Stack
Frontend
Angular
TypeScript
Tailwind CSS / Custom CSS
RxJS
Backend
NestJS
TypeScript
REST API
Node.js
Database
PostgreSQL

Project-Structure:
medicine-web-app/
│
├── frontend/        # Angular Application
│
├── backend/         # NestJS Server
│
└── README.md

cd backend

npm install

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=medishop

npm run start:dev
http://localhost:3000
cd frontend

npm install
ng serve
http://localhost:4200
CREATE DATABASE medishop;
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
