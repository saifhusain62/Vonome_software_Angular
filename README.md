💊 Medicine Web App

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
📁 Project Structure
medicine-web-app/
│
├── frontend/        # Angular Application
│
├── backend/         # NestJS Server
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/saifhusain62/Vonome_software_Angular.git
cd medicine-web-app
2️⃣ Setup Backend (NestJS)
cd backend

npm install

Create a .env file inside the backend folder:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=medishop

Run the backend server:

npm run start:dev

Backend will run on:

http://localhost:3000
3️⃣ Setup Frontend (Angular)
cd frontend

npm install
ng serve

Frontend will run on:

http://localhost:4200
🗄️ Database Setup (PostgreSQL)

Create a database named:

CREATE DATABASE medishop;
📌 API Example
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
📸 Project Purpose

This project was built to practice and demonstrate:

Full-stack development
Angular + NestJS integration
PostgreSQL database usage
Clean and scalable architecture
