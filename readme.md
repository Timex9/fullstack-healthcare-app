# Full-Stack Healthcare Management System

This is a complete full-stack web application for a healthcare system, featuring a secure Django REST API backend and a modern, interactive React frontend built with Material-UI.

The application allows for secure user registration and authentication using JWT. Authenticated users can manage a database of patients, including adding new records, viewing details, updating information, and deleting records.

---

## ✨ Features

* **Secure Authentication**: Users can register for a new account and log in using JWT (JSON Web Tokens) for secure, session-based access.
* **Protected Routes**: Frontend routes for sensitive data (like the dashboard and patient details) are protected, redirecting unauthenticated users to the login page.
* **Patient Management (CRUD)**:
    * **Create**: Add new patients to the system via a modern, styled form.
    * **Read**: View a list of all personal patients on a central dashboard and click to see detailed information for each one.
    * **Update**: Edit the details of an existing patient through a pre-filled form.
    * **Delete**: Remove patient records from the database with a confirmation step.
* **Interactive UI**: The frontend is built with Material-UI, providing a professional, responsive, and interactive user experience with loading indicators, alerts, and hover effects.
* **RESTful Backend API**: A powerful and secure backend built with Django and Django REST Framework to handle all data operations.

---

## 🛠️ Technology Stack

### Backend (API)
* **Framework**: Django, Django REST Framework
* **Database**: PostgreSQL
* **Authentication**: djangorestframework-simplejwt (JWT)
* **CORS Management**: django-cors-headers
* **Environment Variables**: python-dotenv

### Frontend (Client)
* **Framework**: React (with Vite)
* **UI Library**: Material-UI (MUI)
* **Routing**: React Router DOM
* **API Communication**: Axios
* **State Management**: React Context API

---

## 🚀 Setup and Installation

To run this project, you need to start both the backend and frontend servers simultaneously in two separate terminals.



⚙️ Step 1: Prerequisites

Git: For cloning the repository from GitHub.

Python (version 3.8 or newer): For the backend.

PostgreSQL: The database for the backend.

Node.js and npm: For the frontend.

A code editor like Visual Studio Code.

***TERMINAL CODE***

git clone https://github.com/Timex9/fullstack-healthcare-app.git
cd <PATH TO REPOSITORY FOLDER>
cd healthcare_backend
**FOR MAC-OS/LINUX**
python3 -m venv venv
source venv/bin/activate
**FOR WINDOWS**
python -m venv venv
.\venv\Scripts\activate

pip install -r requirements.txt

**RUN POSTGRES SQL**

psql postgres

**Create the database user.**
CREATE USER my_db_user WITH PASSWORD 'my_secure_password'; 

**Create the database.**
CREATE DATABASE healthcare_db OWNER my_db_user;

**Exit the prompt.**
\q

**Set Up and Run the Frontend (React App)**
**Open a second, separate terminal window.**
**Navigate from the project root into the frontend folder:**

cd <PATH TO repository FOLDER>  # Start from the main project folder
cd healthcare-frontend
npm install
npm run dev

**The frontend is now running at http://localhost:5173. Keep this second terminal window open.**

** OPEN NEW TAB IN BROWSER AND PASTE http://localhost:5173/login **




