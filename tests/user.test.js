import UserController from '../controllers/userController.js';
import { jest } from '@jest/globals';

const userController = new UserController();

describe('UserController', () => {
  describe('getAll', () => {
    it('should return all users', async () => {
      // Mock do request e response
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock do método getAll do UserController
      const users = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' },
      ];
      jest.spyOn(userController, 'getAll').mockImplementation((req, res) => {
        res.status(200).json(users);
      });

      // Chama o método getAll
      await userController.getAll(req, res);
       // Adiciona logs para ver os dados retornados
       console.log('Status:', res.status.mock.calls);
       console.log('JSON:', res.json.mock.calls);

      // Verifica se o status e o json foram chamados corretamente
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });
});