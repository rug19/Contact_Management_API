import ContactController from "../controllers/contactController.js";
import { jest } from '@jest/globals';

const contactController = new ContactController();

describe("Contact Controller", () => {
  test("create should create a new contact", async () => {
    const req = {
      body: {
        name: "Ruan Gomes",
        phone: "9999-9999",
        email: "ruan@example.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await contactController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Ruan Gomes",
        phone: "9999-9999",
        email: "ruan@example.com",
      })
    );
  });
});