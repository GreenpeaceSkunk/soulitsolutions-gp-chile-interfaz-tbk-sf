import sequelize from "@/config/db-config";
import { DataTypes } from "sequelize";
import Cliente from "@/modules/cliente/cliente.model";

const Transaction = sequelize.define(
  "Transaccion",
  {
    response_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tipo_de_transaccion: {
      type: DataTypes.ENUM("Inscripcion", "Pago"),
      allowNull: false,
    },
    utm_source: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    utm_medium: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    utm_content: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    utm_term: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    utm_campaign: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    monto: {
      type: DataTypes.FLOAT(12, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: "id",
      },
    },
    tipo_donacion: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    checkout_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    codigo_respuesta: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tbk_user: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    codigo_autorizacion: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    tipo_tarjeta: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    numero_tarjeta: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    titular: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tarjetahabiente_rut: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tarjetahabiente_nombre: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    staging_ID: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    regular_giving: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    numero_regular_giving: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    opportunity: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    fecha_contable: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_transaccion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    transaccion_salesforce: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    tipo_pago_transaccion: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    // Additional options for the model go here
    tableName: "Transacciones", // Explicitly set the table name
  }
);

export default Transaction;
