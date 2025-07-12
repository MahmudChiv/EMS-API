// models/SubjectClass.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SubjectClass = sequelize.define("SubjectClass", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Teachers",
      key: "id",
    },
  },
});

// Associations
SubjectClass.associate = (models) => {
  SubjectClass.belongsTo(models.Teacher, {
    foreignKey: "teacherId",
    as: "teacher",
  });
}

// Sync the model with the database
SubjectClass.sync()
    .then(() => {
        console.log("SubjectClass table created successfully.");
    })
    .catch((error) => {
        console.error("Error creating SubjectClass table:", error);
    });

module.exports = SubjectClass;
