# GrammarChecker-Backend

## Overview
This backend provides authentication and grammar checking using OpenAI. It is modular, easy to extend, and uses JWT for authentication. No database is used; user state is managed client-side (e.g., localStorage).

## Environment Variables
Create a `.env` file in the backend directory with the following keys:

```
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_here
```

## Routes

### POST `/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Body:**
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "<jwt_token>",
    "user": { "id": 1, "username": "admin" }
  }
  ```

### POST `/check-grammar`
- **Description:** Checks grammar and spelling using OpenAI. Requires JWT in the `Authorization` header as `Bearer <token>`.
- **Body:**
  ```json
  {
    "text": "Your text to check."
  }
  ```
- **Response:**
  ```json
  {
    "corrections": [
      {
        "word": "incorrect_word",
        "suggestion": "correct_word",
        "start": 0,
        "end": 5,
        "type": "spelling" // or "grammar"
      }
    ],
    "corrected_text": "Fully corrected version of the text."
  }
  ```

### GET `/`
- **Description:** Simple backend check. Returns a running message.

## Notes
- **No database is used for simplicity.** Users are hardcoded for demo purposes.
- **Session state is managed on the client** (e.g., localStorage stores the JWT token after login).
- **Add your OpenAI API key and a secure JWT secret in the `.env` file before running.**

---
Feel free to extend this backend with more features or connect to a real database as needed.
