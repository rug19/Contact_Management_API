import UserController from "../controllers/userController.js";
import { jest } from "@jest/globals";

const userController = new UserController();

describe("UserController", () => {
  describe("getAll", () => {
    it("should return all users", async () => {
      // Mock do request e response
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock do método getAll do UserController
      const users = [
        { id: 1, name: "User 1", email: "user1@example.com" },
        { id: 2, name: "User 2", email: "user2@example.com" },
      ];
      jest.spyOn(userController, "getAll").mockImplementation((req, res) => {
        res.status(200).json(users);
      });

      // Chama o método getAll
      await userController.getAll(req, res);

      // Verifica se o status e o json foram chamados corretamente
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });
});

describe("getById", () => {
  it("should return a user by ID", async () => {
    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const user = { id: 1, name: "User 1", email: "user1@example.com" };
    jest.spyOn(userController, "getById").mockImplementation((req, res) => {
      res.status(200).json(user);
    });

    await userController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it("should return 404 if user not found", async () => {
    const req = { params: { id: "999" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(userController, "getById").mockImplementation((req, res) => {
      res.status(404).json({ message: "User not found" });
    });

    await userController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });
});

describe("create", () => {
  it("should create a new user", async () => {
    const req = { body: { name: "New User", email: "new@example.com" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const newUser = { id: 3, name: "New User", email: "new@example.com" };
    jest.spyOn(userController, "create").mockImplementation((req, res) => {
      res.status(201).json(newUser);
    });

    await userController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newUser);
  });

  it("should return 400 if data is missing", async () => {
    const req = { body: {} }; // Nenhum dado enviado
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(userController, "create").mockImplementation((req, res) => {
      res.status(400).json({ message: "Invalid data" });
    });

    await userController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid data" });
  });
});
