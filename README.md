👐 HandsOn – A Community-Driven Social Volunteering Platform
============================================================


🌍 **Project Overview**
-----------------------

**Community-Driven Social Volunteering Platform** is a social volunteering platform that connects users with meaningful volunteer opportunities, enabling them to contribute to community-driven initiatives. The platform facilitates:

✅ **Volunteer Event Discovery & Registration** – Find and join events effortlessly.\
✅ **Community Help Requests** – Post and respond to urgent help requests.\
✅ **Team Formation** – Build and collaborate with teams for volunteering.\
✅ **Impact Tracking & Recognition** – Log hours, earn points, and get certified.\
✅ **Secure & Role-Based Access** – Ensure user authentication and secure access.



🎯 **Tech Stack**
-----------------

### **Backend (Spring Boot & PostgreSQL)**

✅ **Spring Boot** – REST API development.

 ✅ **Spring Security & JWT** – Authentication & authorization
 
 ✅ **PostgreSQL** – Data persistence
 
 ✅ **Lombok & Hibernate** – Entity management
 
 ✅ **Maven** – Dependency management

### **Frontend (React & Tailwind CSS)**

✅ **React.js** – Modern UI framework

✅ **React Router** – Navigation & routing

✅ **Tailwind CSS** – Responsive design

✅ **Axios** – API communication


🚀 **Key Features**
-------------------

### 1️⃣ **User Registration & Profile Management**

🔹 **User Authentication**: Register and log in securely using **JWT authentication**. 

  🔹 **Profile Editing**: Update personal details, skills, and causes of interest. 
  
  🔹 **User Dashboard**: View volunteering history and contributions.

### 2️⃣ **Discover & Join Volunteer Events**

🔹 **Event Creation**: Users/organizations can create volunteering events.

🔹 **Event Feed**: Browse, filter, and discover relevant opportunities.

🔹 **One-Click Registration**: Join events with a single click.

### 3️⃣ **Community Help Requests**

🔹 **Create Help Requests**: Request assistance for ongoing needs.

🔹 **Urgency Levels**: Categorize requests as **low, medium, or urgent**.

🔹 **User Interaction**: Offer help through comments or  messaging.

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
## Hepl-Requests
### Create Help Request
**POST** `/api/help-requests`

Headers:
Authorization: Bearer <JWT>
Request Body:

``` json
{
    "title": "Need Blood Donation",
    "description": "Urgently require O+ blood donor.",
    "location": "NYC Hospital",
    "category": "Medical"
}

```
### Get All Help Requests
**GET** `/api/help-requests`

Headers:
Authorization: Bearer <JWT>
#### Get Help Request by ID
**GET** `/api/help-requests/{id}`

Headers:
Authorization: Bearer <JWT>
#### Update Help Request Status
**GET** `/api/help-requests/{id}/status`

Headers:
Authorization: Bearer <JWT>
##### status=OPEN | CLOSED

## Help Request Comments
### Add Comment to Help Request
**POST** `/api/help-requests/{helpRequestId}/comments`

Headers:
Authorization: Bearer <JWT>
Request Body:
"Great initiative! Happy to help."

### Get Comments on Help Request
**GET** `/api/help-requests/{helpRequestId}/comments`
