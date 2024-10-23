# Personal Expense Tracker API

This is a RESTful API for managing personal financial records. Users can record income and expenses, retrieve past transactions, and get summaries by category or time period.

## Technologies Used:
- **Node.js** with **Express.js** for the backend framework.
- **SQLite** for the database (or MongoDB as an alternative).

## Features:
- Add new income and expenses.
- Retrieve, update, and delete transactions.
- Get summaries of income, expenses, and balance.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/expense-tracker.git
   cd expense-tracker

2. Install the dependencies:
bash: npm install

3. Run the server:
bash: node server.js

4. The server will start on http://localhost:3000.


### **API Documentation**
## API Endpoints
### 1. **POST /api/transactions**

**Description**: Adds a new transaction (income or expense).

**Request**:
- Method: `POST`
- URL: `/api/transactions`
- Body (JSON):
  {
    "type": "income",
    "category": "Salary",
    "amount": 3000,
    "date": "2024-10-23",
    "description": "October Salary"
  }

**Response**:
- 201 Created
- json:
  {
    "id": 1
  }

## 2. **GET /api/transactions**
**Description**: Retrieves all transactions.

**Request**:
- Method: GET
- URL: /api/transactions

**Response**:
- 200 OK
- json
[
  {
    "id":1,
    "type": "income",
    "category": "Salary",
    "amount": 3000,
    "date": "2024-10-23",
    "description": "October Salary"
  },
  {
    "id":2,
    "type": "Expense",
    "category": "Groceries",
    "amount": 100,
    "date": "2024-10-21",
    "description": "Weekly groceries"
  }
]

## 3. **GET /api/transactions/**
**Description**: Retrieves a transaction by its ID.

**Request**:
- Method: GET
- URL: /api/transactions/:id (replace :id with the transaction ID)

**Response**:
- 200 OK
- json: 
{
  "id": 1,
  "type": "income",
  "category": "Salary",
  "amount": 3000,
  "date": "2024-10-23",
  "description": "October Salary"
}

## 4. **PUT /api/transactions/**
**Description**: Updates a transaction by its ID.
**Request**:
- Method: PUT
- URL: /api/transactions/:id (replace :id with the transaction ID)
- Body (JSON):
{
  "type": "expense",
  "category": "Bills",
  "amount": 1200,
  "date": "2024-10-23",
  "description": "Utility Bills"
}

**Response**:
- 200 OK
- json:
{
  "changes": 1
}

## 5. **DELETE /api/transactions/**
**Description**: Deletes a transaction by its ID.
**Request**:
- Method: DELETE
- URL: /api/transactions/:id (replace :id with the transaction ID)

**Response**:
- 200 OK
- json:
{
  "deleted": 1
}

## 6. **GET /api/summary**
**Description**: Retrieves a summary of transactions including total income, total expenses, and balance.
**Request**:
- Method: GET
- URL: /api/summary

**Response**:
- 200 OK
- json
{
  "totalIncome": 3000,
  "totalExpense": 100,
  "balance": 2900
}


### 4. **Postman Screenshots**
## Postman Tests

Here are the screenshots showing the use of each API endpoint:

- **POST /transactions**: ![POST Screenshot](path_to_post_screenshot.png)
- **GET /transactions**: ![GET Screenshot](path_to_get_screenshot.png)
- **GET /transactions/:id**: ![GET by ID Screenshot](path_to_get_id_screenshot.png)
- **PUT /transactions/:id**: ![PUT Screenshot](path_to_put_screenshot.png)
- **DELETE /transactions/:id**: ![DELETE Screenshot](path_to_delete_screenshot.png)
- **GET /summary**: ![Summary Screenshot](path_to_summary_screenshot.png)

## Conclusion

This API is a simple personal expense tracker. Future improvements could include:
- User authentication to secure transactions.
- Advanced filtering and sorting for transactions and summaries.
