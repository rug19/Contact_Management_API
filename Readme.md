# Contact Management API

## Description

The **Contact Management API** is a RESTful API that allows users to manage their contacts efficiently. It provides endpoints to create, read, update, and delete contacts.

## Features

- **Create Contact**: Add a new contact to the system.
- **List Contacts**: Retrieve all stored contacts.
- **Get Contact by ID**: Fetch details of a specific contact.
- **Update Contact**: Modify an existing contact's information.
- **Delete Contact**: Remove a contact from the system.
- **User Registration**: Register a new user.
- **User Login**: Authenticate a user and obtain a token.



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

The API documentation is available via Swagger. To access the Swagger UI, start the application and navigate to:

````
http://localhost:3000/api-docs

````

### User Endpoints

| Method | Endpoint            | Description                             |
|--------|---------------------|-----------------------------------------|
| POST   | `auth/register`     | Register a new user                     |
| POST   | `auth/login`        | Authenticate  a user and obtain a token |


### Contact Endpoints

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| GET    | `api/contacts`         | Retrieve all contacts          |
| POST   | `api/contacts`         | Create a new contact           |
| GET    | `api/contacts/{id}`    | Retrieve a specific contact    |
| PUT    | `api/contacts/{id}`    | Update a specific contact      |
| DELETE | `api/contacts/{id}`    | Delete a specific contact      |

## Usage

To start the development server, use:

```bash
npm run dev
```

## Testing

Test Environment Configuration

Dependencies

Ensure the following dependencies are installed in your project:

````
"devDependencies": {
  "@babel/core": "^7.26.7",
  "@babel/preset-env": "^7.26.7",
  "babel-jest": "^29.7.0",
  "jest": "^29.7.0",
  "nodemon": "^3.1.9",
  "sequelize-mock": "^0.10.2",
  "supertest": "^7.0.0"
}

````
 
## Babel Configuration

Create a babel.config.cjs file in the root directory with the following content:

````

// babel.config.cjs
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }]
  ]
};

````
## jest Configuration

Add the Jest configuration to your package.json:

````

{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "transform": {
      "^.+\\.jsx?$": "babel-jest"
    }
  }
}

````
## Running Tests

To run the tests, use the following command:

```bash
npm test
```

## Example Unit Test

Here is an example of a unit test for the UserController:

````
// tests/user.test.js
import UserController from '../controllers/userController.js';
import { jest } from '@jest/globals';

const userController = new UserController();

describe('UserController', () => {
  describe('getAll', () => {
    it('should return all users', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const users = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' },
      ];
      jest.spyOn(userController, 'getAll').mockImplementation((req, res) => {
        res.status(200).json(users);
      });

      await userController.getAll(req, res);

      console.log('Status:', res.status.mock.calls);
      console.log('JSON:', res.json.mock.calls);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });
});

````

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

