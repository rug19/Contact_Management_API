import { DataTypes } from "sequelize";

export default {
  up: async (queryInterface) => {
    await queryInterface.createTable(
      "users",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },

        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        timestamps: true, // Sequelize cria automaticamente createdAt e updatedAt
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};
