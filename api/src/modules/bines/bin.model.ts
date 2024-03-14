import sequelize from "@/config/db-config";
import { DataTypes } from "sequelize";

const Bin = sequelize.define(
  "Bin",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, 
    },
    nro_bin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medio_de_pago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca_tarjeta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_banco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    // Additional options for the model go here
    tableName: "Bines", // Explicitly set the table name
    timestamps: false,
  }
);

export default Bin;
