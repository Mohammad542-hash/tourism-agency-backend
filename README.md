# 🌍 Tourism Agency Backend API (JWT Protected)

This is a complete RESTful API for a Tourism Agency project. It manages Destinations, Tours, Bookings, and Contact messages with a secure Admin Dashboard protection.

---

## 🚀 Quick Start

1. **Environmental Variables:**
   Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRES_IN=90d

# Install Dependencies: npm install
# Admin Account Setup (Crucial): To access protected dashboard routes, you must create the initial Admin user in the database:npm run seed:admin   
Default Email: admin@dashboard.com

Default Password: myadminpassword123

Run Server:

Development: npm run dev

Production: npm start
# Authentication & Security
The API uses JWT (JSON Web Tokens) for securing Dashboard routes.

How to use:
Login: Send a POST request to /api/admin/login with admin credentials.

Token: You will receive a token and admin object in the response. Store the token (e.g., in localStorage).

Authorization Header: For all protected routes (POST/PUT/DELETE), you must include the token in the headers:

Key: Authorization

Value: Bearer <YOUR_TOKEN_HERE>

## API Endpoints
Method,Endpoint,Description,Access
POST,/api/admin/login,Login to get JWT Token,Public
**Destinations:
Method,Endpoint,Description,Access
GET,/api/destinations,List all destinations,Public
GET,/api/destinations/:id,Get single destination,Public
POST,/api/destinations,Create new destination,Admin Only
PUT,/api/destinations/:id,Update destination,Admin Only


**Tours & Trips:
Method,Endpoint,Description,Access
GET,/api/tours,List all tours,Public
GET,/api/destinations/:id/tours,Tours for specific destination,Public
POST,/api/tours,Create new tour,Admin Only

** Bookings & Contact :
Method,Endpoint,Description,Access
POST,/api/bookings,Create a new booking,Public
POST,/api/contact,Send a contact message,Public


## Project structure
project/
 ├─ controllers/      # Route logic & JWT auth handlers
 ├─ models/           # Mongoose Schemas (User, Destination, Tour, etc.)
 ├─ routes/           # Express Route definitions
 ├─ app.js            # Main app & middleware config
 ├─ seedAdmin.js      # Script to create initial Admin
 ├─ package.json      # Dependencies & Scripts
 └─ .env              # Sensitive Config (Git ignored)
# Error Responses:
 401 Unauthorized: Missing or invalid token.

404 Not Found: Resource or endpoint does not exist.

400 Bad Request: Missing required fields in the request body.
