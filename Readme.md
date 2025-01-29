# Contact Management API

## Description

The **Contact Management API** is a RESTful API that allows users to manage their contacts efficiently. It provides endpoints to create, read, update, and delete contacts.

## Features

- **Create Contact**: Add a new contact to the system.
- **List Contacts**: Retrieve all stored contacts.
- **Get Contact by ID**: Fetch details of a specific contact.
- **Update Contact**: Modify an existing contact's information.
- **Delete Contact**: Remove a contact from the system.

## Technologies Used

- **Language**: JavaScript
- **Runtime**: Node.js
- **Framework**: Express
- **ORM**: Sequelize
- **Database**: MySQL
- **Documentation**: Swagger

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Contact_Management_API.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Contact_Manangement_API
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure the database by creating a `.env` file.
5. Run database migrations:
   ```bash
   npx sequelize db:migrate
   ```
6. Start the application:
   ```bash
   npm run dev
   ```

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=database_name
DB_HOST=localhost
DB_DIALECT=mysql
```

## API Endpoints

### Contact Endpoints

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| GET    | `/contacts`         | Retrieve all contacts          |
| POST   | `/contacts`         | Create a new contact           |
| GET    | `/contacts/{id}`    | Retrieve a specific contact    |
| PUT    | `/contacts/{id}`    | Update a specific contact      |
| DELETE | `/contacts/{id}`    | Delete a specific contact      |

## Usage

To start the development server, use:

```bash
npm run dev
```

## Contribution

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b my-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add my feature"
   ```
4. Push the changes:
   ```bash
   git push origin my-feature
   ```
5. Open a Pull Request.

## License

This project is licensed under the **MIT License**.

