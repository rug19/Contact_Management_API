import { DataTypes } from "sequelize";

export default {
  up: async (queryInterface) => {
    await queryInterface.createTable(
      "contacts",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: true, // Sequelize cria automaticamente createdAt e updatedAt
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("contacts");
  },
};
