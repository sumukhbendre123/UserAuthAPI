### Project Name: **UserAuthAPI**

### Description:
**UserAuthAPI** is a robust authentication system built using Express.js and MongoDB, providing user registration, email verification with OTP, and secure login with JWT tokens. The application supports detailed user profile management and provides a separate admin portal for managing users. Admins can view all registered users, retrieve detailed user profiles, and delete users as needed. The project adheres to industry standards for security, clean code, and thorough documentation.

### Tech Stack:
- **Backend Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** NodeMailer (for OTP)
- **Environment Variables Management:** dotenv
- **Data Validation:** Joi
- **HTTP Client for API Testing:** Postman


## Features

### User Features
1. **User Registration:**
   - Users can register with an email, username (unique), and password.
   - An OTP is sent to the registered email for validation.

2. **Email Validation:**
   - Users can validate their account by entering the OTP.
   - After validation, users can add additional profile information (location, age, work, DOB, and a brief description).

3. **Login:**
   - Users can log in using their email/username and password.
   - On successful login, a JWT token is generated for authentication.

4. **Profile Management:**
   - Users can retrieve their complete profile information using the JWT token.
   - Users can update any field of their profile (except username, email, and password).

### Admin Features
1. **Admin Registration:**
   - Admins can register with an email, username, and password.

2. **Admin Login:**
   - Admins can log in using their credentials and receive a JWT token for authentication.

3. **User Management:**
   - Admins can view a list of all registered usernames.
   - Admins can retrieve detailed profile information for any user by username.
   - Admins can delete any user by username.

## Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** NodeMailer (for sending OTPs)
- **Data Validation:** Joi
- **Environment Variables Management:** dotenv

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB (local instance or Atlas)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/UserAuthAPI.git
   cd UserAuthAPI
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```bash
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/userauthapi
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=smtp.your-email-provider.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   ```

4. Start the server:

   ```bash
   npm start
   # or
   yarn start
   ```

   The server will run on `http://localhost:5000`.

### API Documentation

#### User Registration

- **Endpoint:** `POST /api/users/register`
- **Description:** Registers a new user and sends an OTP to the email.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "username": "uniqueUsername",
    "password": "securePassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "OTP sent to your email"
  }
  ```

#### User Email Validation

- **Endpoint:** `POST /api/users/validate`
- **Description:** Validates the user's account using OTP.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User validated successfully"
  }
  ```

#### User Profile Update

- **Endpoint:** `PUT /api/users/profile`
- **Description:** Updates the user's profile information (location, age, work, DOB, description).
- **Request Body:**
  ```json
  {
    "location": "New York",
    "age": 30,
    "work": "Engineer",
    "dob": "1992-01-01",
    "description": "A brief description about the user"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Profile updated successfully"
  }
  ```

#### User Login

- **Endpoint:** `POST /api/users/login`
- **Description:** Logs in the user and generates a JWT token.
- **Request Body:**
  ```json
  {
    "emailOrUsername": "uniqueUsername",
    "password": "securePassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

#### Get User Info

- **Endpoint:** `GET /api/users/profile`
- **Description:** Retrieves the user's complete profile information.
- **Headers:**
  - `Authorization: Bearer your_jwt_token`
- **Response:**
  ```json
  {
    "email": "user@example.com",
    "username": "uniqueUsername",
    "location": "New York",
    "age": 30,
    "work": "Engineer",
    "dob": "1992-01-01",
    "description": "A brief description about the user"
  }
  ```

#### Admin Registration

- **Endpoint:** `POST /api/admin/register`
- **Description:** Registers a new admin.
- **Request Body:**
  ```json
  {
    "email": "admin@example.com",
    "username": "adminUsername",
    "password": "securePassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Admin registered successfully"
  }
  ```

#### Admin Login

- **Endpoint:** `POST /api/admin/login`
- **Description:** Logs in the admin and generates a JWT token.
- **Request Body:**
  ```json
  {
    "emailOrUsername": "adminUsername",
    "password": "securePassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

#### Get All Usernames (Admin)

- **Endpoint:** `GET /api/admin/users`
- **Description:** Retrieves a list of all registered usernames.
- **Headers:**
  - `Authorization: Bearer your_jwt_token`
- **Response:**
  ```json
  [
    "user1",
    "user2",
    "user3"
  ]
  ```

#### Get User Details (Admin)

- **Endpoint:** `GET /api/admin/users/:username`
- **Description:** Retrieves detailed profile information for a given username.
- **Headers:**
  - `Authorization: Bearer your_jwt_token`
- **Response:**
  ```json
  {
    "email": "user@example.com",
    "username": "uniqueUsername",
    "location": "New York",
    "age": 30,
    "work": "Engineer",
    "dob": "1992-01-01",
    "description": "A brief description about the user"
  }
  ```

#### Delete User (Admin)

- **Endpoint:** `DELETE /api/admin/users/:username`
- **Description:** Deletes a user by username.
- **Headers:**
  - `Authorization: Bearer your_jwt_token`
- **Response:**
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

### Testing the APIs

Use Postman to test all the APIs. Screenshots of API requests and responses, along with the MongoDB schema, should be included in your documentation.

### MongoDB Schema

#### User Schema
```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isValidated: { type: Boolean, default: false },
  otp: { type: String },
  location: { type: String },
  age: { type: Number },
  work: { type: String },
  dob: { type: Date },
  description: { type: String },
}, { timestamps: true });
```

#### Admin Schema
```javascript
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, feel free to reach out at [sumukhbendre@gmail.com](mailto:sumukhbendre@gmail.com).
