# PromptDesk

## AI-Powered Customer Support Ticket Management System

PromptDesk is a full-stack customer support ticket management application built using **Java, Spring Boot, React, MySQL, and Ollama AI**.

The application allows users to create customer support tickets and automatically analyze them using a locally running AI model.

The AI analyzes each ticket and generates useful information such as category, priority, sentiment, summary, and a suggested response.

---

## 🚀 Features

- Create customer support tickets
- AI-powered ticket analysis
- Automatic ticket categorization
- Automatic priority detection
- Customer sentiment analysis
- AI-generated ticket summary
- AI-generated suggested response
- View all support tickets
- Search tickets
- Filter tickets by priority
- View detailed ticket information
- Delete tickets
- REST API backend
- MySQL database integration
- Global exception handling
- React-based frontend
- Local AI processing using Ollama

---

## 🧠 AI Analysis

When a support ticket is created, PromptDesk sends the ticket title and description to a locally running **Ollama AI model**.

The AI analyzes the ticket and generates:

- Category
- Priority
- Sentiment
- Summary
- Suggested Response

### Example

Customer Issue:

```text
I tried to pay for my order three times but my payment keeps getting declined.
```

AI Analysis:

```text
Category: PAYMENT
Priority: MEDIUM
Sentiment: NEGATIVE

Summary:
Payment failed due to declined payments.

Suggested Response:
Sorry to hear that your payment was declined.
Can you please try adding an alternate payment method
or contacting our customer support team for assistance?
```

---

## 🏗️ System Architecture

```text
                  React Frontend
                        |
                        | REST API
                        ↓
                Spring Boot Backend
                        |
              ┌─────────┼─────────┐
              ↓         ↓         ↓
            MySQL     Ollama      JPA
          Database      AI
```

---

## 🛠️ Technology Stack

### Backend

- Java 21
- Spring Boot 4.1.1
- Spring Web MVC
- Spring Data JPA
- Spring Validation
- Maven

### Frontend

- React
- JavaScript
- Vite
- HTML
- CSS

### Database

- MySQL

### AI

- Ollama
- Llama 3.2 3B

### API Testing

- Postman

### Development Tools

- Eclipse IDE
- Visual Studio Code
- Git
- GitHub

---

## 📁 Project Structure

### Backend

```text
promptdesk/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── PromptDesk/
│   │   │       ├── controller/
│   │   │       ├── dto/
│   │   │       ├── entity/
│   │   │       ├── exception/
│   │   │       ├── repository/
│   │   │       └── service/
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│
├── pom.xml
├── .gitignore
├── mvnw
└── mvnw.cmd
```

### Frontend

```text
promptdesk-frontend/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── CreateTicket.jsx
│   ├── ticketService.js
│   ├── index.css
│   └── main.jsx
│
├── public/
├── package.json
├── package-lock.json
├── vite.config.js
└── .gitignore
```

---

# 🔌 REST API Endpoints

## Create Ticket

```http
POST /api/tickets
```

Example request:

```json
{
  "title": "Payment failed",
  "description": "My payment keeps getting declined."
}
```

The backend automatically sends the ticket to the AI service and stores the AI analysis.

---

## Get All Tickets

```http
GET /api/tickets
```

---

## Get Ticket By ID

```http
GET /api/tickets/{id}
```

Example:

```http
GET /api/tickets/1
```

---

## Update Ticket

```http
PUT /api/tickets/{id}
```

---

## Delete Ticket

```http
DELETE /api/tickets/{id}
```

Example:

```http
DELETE /api/tickets/1
```

---

## Analyze Ticket

```http
POST /api/tickets/analyze
```

This endpoint analyzes a ticket using the locally running Ollama AI model.

---

# ⚙️ Backend Setup

## 1. Clone the Repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

Navigate to the backend:

```bash
cd promptdesk
```

---

## 2. Create MySQL Database

Open MySQL and run:

```sql
CREATE DATABASE promptdesk;
```

---

## 3. Configure Database

The application uses environment variables for sensitive configuration.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/promptdesk
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=9096
```

Set your MySQL password as an environment variable.

### Windows

```cmd
set DB_PASSWORD=your_mysql_password
```

Do not commit your actual database password to GitHub.

---

# 🤖 Ollama Setup

PromptDesk uses Ollama to run the AI model locally.

Install Ollama and make sure it is running.

Pull the required model:

```bash
ollama pull llama3.2:3b
```

Verify the model:

```bash
ollama list
```

The application communicates with Ollama through its local API.

---

# ▶️ Run the Backend

From the backend project directory:

### Windows

```bash
mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:9096
```

---

# 💻 Frontend Setup

Open another terminal.

Navigate to the frontend project:

```bash
cd promptdesk-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

# 🔄 Application Flow

```text
1. User opens PromptDesk
          ↓
2. User creates support ticket
          ↓
3. React sends POST request
          ↓
4. Spring Boot receives the ticket
          ↓
5. Spring Boot sends ticket data to Ollama
          ↓
6. Ollama analyzes the ticket
          ↓
7. AI returns structured analysis
          ↓
8. Spring Boot stores ticket + AI analysis
          ↓
9. MySQL stores the data
          ↓
10. React displays the analyzed ticket
```

---

# 🧪 Testing

The REST APIs can be tested using **Postman**.

### Example Request

```http
POST http://localhost:9096/api/tickets
```

Request body:

```json
{
  "title": "Cannot login",
  "description": "I am unable to login to my account."
}
```

The backend analyzes the ticket using Ollama.

Example response:

```json
{
  "id": 1,
  "title": "Cannot login",
  "description": "I am unable to login to my account.",
  "category": "LOGIN",
  "priority": "HIGH",
  "sentiment": "NEGATIVE",
  "summary": "User is unable to login",
  "suggestedResponse": "Please reset your password and try again."
}
```

---

# 🔐 Security

Sensitive credentials should never be committed to GitHub.

Environment variables should be used for sensitive configuration such as:

```text
DB_PASSWORD
OPENAI_API_KEY
```

PromptDesk currently uses a locally running Ollama model for AI analysis.

---

# 📸 Screenshots

Screenshots can be added to this section to demonstrate the application.

Recommended screenshots:

```text
screenshots/
│
├── dashboard.png
├── create-ticket.png
├── ticket-list.png
└── ticket-details.png
```

---

# 🔮 Future Enhancements

Possible future improvements include:

- User authentication and authorization
- Role-based access control
- Ticket status management
- Pagination
- Advanced analytics dashboard
- Email notifications
- Docker deployment
- Cloud deployment
- AI confidence score
- Knowledge-base integration
- Automated response generation

---

# 👨‍💻 Author

**Siddardha**

Full-stack AI customer support ticket management project built using:

**Java + Spring Boot + React + MySQL + Ollama**

---

## 📄 License

This project is created for learning, portfolio, and demonstration purposes.