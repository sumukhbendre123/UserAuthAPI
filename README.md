

# Project Name: UserAuthAPI

## Description:
UserAuthAPI is a robust authentication system built using **React** for the frontend and **Django** with **Python** for the backend. It provides user registration, email verification with OTP, and secure login with JWT tokens. The application supports detailed user profile management and includes a separate admin portal for managing users. Admins can view all registered users, retrieve detailed user profiles, and delete users as needed. The project adheres to industry standards for security, clean code, and thorough documentation.

## Tech Stack:
### Frontend:
- **Framework**: React.js
- **Styling**: CSS 

### Backend:
- **Backend Framework**: Django (with Django REST Framework for API handling)
- **Database**: PostgreSQL or any other SQL database
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Django Email (for OTP verification)
- **Data Validation**: Django Validators
- **Environment Variables Management**: Python Decouple / django-environ
- **API Testing**: Postman

## Features

### User Features

#### User Registration:
- Users can register with an email, username (unique), and password.
- An OTP is sent to the registered email for validation.

#### Email Validation:
- Users can validate their account by entering the OTP.
- After validation, users can add additional profile information (location, age, work, DOB, and a brief description).

#### Login:
- Users can log in using their email/username and password.
- On successful login, a JWT token is generated for authentication.

#### Profile Management:
- Users can retrieve their complete profile information using the JWT token.
- Users can update any field of their profile (except username, email, and password).

### Admin Features

#### Admin Registration:
- Admins can register with an email, username, and password.

#### Admin Login:
- Admins can log in using their credentials and receive a JWT token for authentication.

#### User Management:
- Admins can view a list of all registered usernames.
- Admins can retrieve detailed profile information for any user by username.
- Admins can delete any user by username.

## Getting Started

### Prerequisites
- **Node.js** (v14 or above) for the frontend.
- **Python 3.8+** and **Django** for the backend.
- **PostgreSQL** or **MySQL** for database setup.
- **npm** or **yarn** for the frontend.
- **pip** for backend dependency installation.

### Installation

#### Frontend (React)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/UserAuthAPI.git
   cd UserAuthAPI/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the frontend server:
   ```bash
   npm start
   # or
   yarn start
   ```
   The frontend server will run on `http://localhost:3000`.

#### Backend (Django)

1. Navigate to the backend directory:
   ```bash
   cd UserAuthAPI/backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables: Create a `.env` file in the `backend` directory and add the following:
   ```env
   SECRET_KEY=your_secret_key
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   DATABASE_URL=postgres://user:password@localhost:5432/userauthapi
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=smtp.your-email-provider.com
   EMAIL_PORT=587
   EMAIL_HOST_USER=your-email@example.com
   EMAIL_HOST_PASSWORD=your-email-password
   ```

5. Set up the database:
   ```bash
   python manage.py migrate
   ```

6. Start the backend server:
   ```bash
   python manage.py runserver
   ```

   The backend server will run on `http://localhost:8000`.

## API Documentation

The API routes and functionalities are the same as previously mentioned. Below are the Django REST framework equivalents.

### User Registration
- **Endpoint**: `POST /api/users/register`
- **Description**: Registers a new user and sends an OTP to the email.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "username": "uniqueUsername",
    "password": "securePassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "OTP sent to your email"
  }
  ```

### User Email Validation
- **Endpoint**: `POST /api/users/validate`
- **Description**: Validates the user's account using OTP.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User validated successfully"
  }
  ```

### More Endpoints
Other API routes such as **Login**, **Profile Update**, and **Admin Actions** follow the same structure, with JWT tokens passed in the headers for authentication and profile retrieval.

## MongoDB Schema -> Django Model Changes

### User Model
```python
class User(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)
    is_validated = models.BooleanField(default=False)
    otp = models.CharField(max_length=6, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    work = models.CharField(max_length=255, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.username
```

### Admin Model
```python
class Admin(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or issues, feel free to reach out at [sumukhbendre@gmail.com](mailto:sumukhbendre@gmail.com).

---

