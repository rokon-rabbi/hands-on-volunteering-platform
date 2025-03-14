# Community-Driven Social Volunteering Platform

A web application designed to connect volunteers with various community-driven events and opportunities. The platform allows users to discover volunteer opportunities, request help from the community, and track their volunteer impact. The system features role-based authentication and authorization, ensuring that users, admins, and super admins can access specific pages and actions based on their role.

## Project Overview

This project is a **React.js** front-end with a **Spring Boot** back-end, designed for managing volunteerism and community involvement. Users can sign up, log in, and access different parts of the platform based on their roles. Admins and super admins can manage events and users, while regular users can sign up for events and track their contributions.


## Technologies Used

- **Frontend:**
  - React.js
  - Tailwind CSS

- **Backend:**
  - Spring Boot
  - Spring Security (JWT Authentication)
  - Spring Data JPA (for database interaction)
  - PostgreSQL (relational database management)

- **Authentication:**
  - JWT (JSON Web Tokens)


## Features
Key features include:
- **Role-Based Access Control (RBAC):**
  - Users have different levels of access based on roles (User, Admin, Super Admin).
  
- **JWT Authentication:**
  - Secure login/logout functionality with JWT tokens to manage user sessions.

- **Responsive UI:**
  - Fully responsive and mobile-friendly UI built with **Tailwind CSS**.

## Database Schema

The database schema for this application consists of several entities related to users, events, and roles. Below is a simplified representation of the schema.


### 1️⃣ Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role ENUM('USER', 'ADMIN', 'SUPER_ADMIN') DEFAULT 'USER',
    skills TEXT[],
    causes TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
## Setup Instructions 
### **Prerequisites**
Ensure you have the following installed:
- **Node.js** & **npm** (for frontend)
- **JDK 11+** (for backend)
- **Maven** (for Spring Boot)
- **PostgreSQL** (for database)

### **Step 1: Clone the repository**
```bash
git clone https://github.com/rokon-rabbi/hands-on-volunteering-platform.git
```
### **Step 2: Install dependencies**
for Backend(Spring Boot)
- mvn install
for frontend(React)
- npm install

### **Step 3: Running the project locally**
- cd backend
- mvn spring-boot:run
Server runs at http://localhost:8080 
- cd frontend
- npm start
App runs at  http://localhost:5173/

# API Documentation

### Register User
**POST** `/api/auth/register`

#### Request Body:

```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
} 
```


### Login User: 
**POST** `/api/auth/login`

### Request Body:

``` JSON
{
    "email": "user@example.com",
    "password": "userpassword"
}
```
### User Profile
#### Get User Profile
**GET** `/api/users/profile`

Headers:
Authorization: Bearer <JWT>
#### Get User History
**GET** `/api/users/profile/history`

Headers:
Authorization: Bearer <JWT>
#### Update User Profile
**PUT** `/api/users/profile`

Headers:
Authorization: Bearer <JWT>
Request Body:
``` JSON

{
    "username": "updatedUser",
    "email": "updated@example.com",
    "skills": ["React", "Node.js"],
    "causes": ["Animal Welfare", "Healthcare"]
}
```
## Events
### Create Event
**POST** `/api/events`

Headers:
Authorization: Bearer <JWT>
Request Body:

``` json
{
    "title": "Beach Cleanup Drive",
    "description": "Join us to clean up the beach!",
    "dateTime": "2025-03-15T10:00:00",
    "location": "Santa Monica Beach",
    "category": "Environment"
}
```
#### Get All Events
**GET** `/api/events`

Headers:
Authorization: Bearer <JWT>
##### Filter Events
**GET** `/api/events?category=Environmental&location=Miami Beach, FL`

Headers:
Authorization: Bearer <JWT>
##### Join Event
**POST** `/api/events/{eventId}/join`

Headers:
Authorization: Bearer <JWT>
#### Get Event Details
**GET** `/api/events/{eventId}`

Headers:
Authorization: Bearer <JWT>

