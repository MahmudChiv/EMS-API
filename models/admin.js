const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  schoolId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Schools", // Assuming the table name is 'Schools'
      key: "id",
    },
  },
  adminName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 50], // Name must be between 3 and 50 characters
    },
  },
  adminEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Must be a valid email format
    },
  },
  adminPhone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^(\+234|0)[789][01]\d{8}$/, // Phone must contain only numbers
    },
  },
  adminPassword: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100], // Password must be at least 6 characters
    },
  },
});

// Associations
Admin.associate = (models) => {
    Admin.belongsTo(models.School, {
        foreignKey: "schoolId",
        as: "school",
    });
};

// Sync the model with the database
Admin.sync()
  .then(() => {
    console.log("Admin table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Admin table:", error);
  });

module.exports = Admin;