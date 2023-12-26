import { DataTypes } from "sequelize";
import sequelize from "@/config/db-config";

const Cliente = sequelize.define(
  "Cliente",
  {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    prefijo: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provincia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comuna: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    calle: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Additional options for the model go here
    // For example, you can set the table name explicitly:
    tableName: "Clientes",
  }
);

export default Cliente;
