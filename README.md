# Ticket booking application

## 📌 Overview
This application is built using **Node.js**, **TypeScript**, **MySQL (in-memory)**, and **Redis**. It provides a seamless experience for booking tickets, canceling tickets, and processing reservations efficiently.

## 🚀 Features
- User authentication and authorization (Sign-up, Login)
- Ticket booking and cancellation
- Real-time availability checking
- Redis caching for performance optimization
- In-memory MySQL database for fast operations
- - **End-to-End Encryption** for request and response security
- **JWT Authentication** for secure user access
- **Data encryption & decryption** to prevent data breaches in transit
- - **Docker Support** for containerized deployment
- - **Code Formatting with Prettier** for consistent styling

## 🔐 Security Implementations
1. **JWT Authentication**  
   - The application uses **JSON Web Tokens (JWT)** for secure user authentication.  
   - Each request requires a valid JWT token to access protected routes.

2. **End-to-End Encryption**  
   - All incoming requests are encrypted before reaching the server.  
   - The server **decrypts the request**, processes it, and then **encrypts the response** before sending it back.  
   - This prevents **man-in-the-middle (MITM) attacks** and ensures **data integrity**.

3. **Secure Environment Variables**  
   - Sensitive credentials (e.g., database connection, API keys) are stored in a `.env` file and never hardcoded.

## 🛠️ Technologies Used
- **Backend**: Node.js, TypeScript
- **Database**: MySQL (In-Memory)
- **Cache**: Redis
- **Validation**: Joi
- **Encryption**: AES-256
- **Environment Management**: dotenv
- - **Containerization**: Docker

## 📦 Installation
To set up the project locally, follow these steps:

### 1️⃣ **Clone the Repository or Fork the repository**
```sh
git clone https://github.com/mmustaphamm/ticket-booking-assessment.git 

```
### 2️⃣ **Install dependencies**
```sh
npm install

```
### 3️⃣ **Set Up Environment Variables**
Create a .env file in the root directory and add your configurations:
There's a .env.example file in the root folder of the application, copy the env variables from the file and paste them in the .env file

### 5️⃣ **Run the Application**
npm run dev. The server should be running at: http://localhost:3001 🚀

## 🔥 API Endpoints and Documentation
For documentations and testing out the endpoints https://documenter.getpostman.com/view/29017531/2sAYX8KMYY

## 🔑 File Encryption and Decryption
This application ensures secure communication by encrypting and decrypting sensitive data using AES-256-CBC.
```
To encrypt a payload (e.g., email and password), use CryptoUtils.symmetricEncrypt:
const data = { email: 'assessment@gmail.com', password: '67685489' }
const encryptedData = CryptoUtils.symmetricEncrypt(process.env.ENCRYPTION_KEY!, data)
console.log('Encrypted:', encryptedData)

the value which is then passed to to the request body as { data: encryptedData }

To decrypt the encrypted response:
const decryptedData = CryptoUtils.symmetricDecrypt(process.env.ENCRYPTION_KEY!, encryptedData)
console.log('Decrypted:', JSON.parse(decryptedData))


