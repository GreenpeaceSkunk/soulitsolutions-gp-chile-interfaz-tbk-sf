import InscripcionDTO from "../inscripcion/dtos/inscripcionRequestDTO";
import TransaccionStates from "./enums/transaccionStates";
import TransaccionTypes from "./enums/transaccionTypes";
import { TRANSBANK } from "@/config/config";
import TransaccionModel from "@/modules/transaccion/transaccion.model";
import ClienteModel from "@/modules/cliente/cliente.model";
import extractNumbers from "../scheduled_app/utils/extractNumbers";
import sendEmailError from "../scheduled_app/email/sendEmailError";
import parseDate from "../scheduled_app/utils/parseDate";
import LogsEvents from "../logs/enums/logsEvents";
import AutorizarStatus from "../scheduled_app/autorizar/enums/autorizarStatus";
import donationType from "./enums/donationType";

const createTransaccionScheduledApp = async (
  transaccionType: TransaccionTypes,
  transaccionState: TransaccionStates,
  data: PagosRecord
) => {
  try {
    const cliente = await ClienteModel.findOne({
      where: { rut: data.s360a__Contact__r.RUN__c },
      attributes: ["id"],
    });

    const regularGivingNumber = extractNumbers(
      data.s360a__RegularGiving__r.Name
    );

    if (cliente && regularGivingNumber) {
      const transaccion = await TransaccionModel.create({
        tipo_de_transaccion: transaccionType, // PAGO
        regular_giving: data.s360a__RegularGiving__c,
        numero_regular_giving: regularGivingNumber,
        tbk_user: data.s360a__RegularGiving__r.TBK_User__c,
        opportunity: data.Id,
        monto: data.Amount,
        cliente_id: cliente.dataValues.id,
        estado: transaccionState, // CREADA
        tipo_donacion: donationType.MENSUAL,
      });
      // Check if the transaction was created successfully
      if (!transaccion) {
        throw new Error("No se pudo crear la transaccion en la base de datos.");
      }

      // If the transaction was created successfully, return its ID
      return transaccion.get("id");
    } else {
      console.log("No se encontro el cliente o el regular giving");
      throw new Error("No se encontro el cliente o el regular giving.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createTransaccionScheduledAppOO = async (
  transaccionType: TransaccionTypes,
  transaccionState: TransaccionStates,
  data: TransactionOO
) => {
  try {
    const cliente = await ClienteModel.findOne({
      where: { rut: data.s360a__Opportunity__r.s360a__Contact__r.RUN__c },
      attributes: ["id"],
    });

    if (cliente) {
      const transaccion = await TransaccionModel.create({
        tipo_de_transaccion: transaccionType, // PAGO
        tbk_user: data.s360a__Opportunity__r.TBK_User_Opp__c,
        opportunity: data.s360a__Opportunity__r.Id,
        monto: data.s360a__Amount__c,
        cliente_id: cliente.dataValues.id,
        estado: transaccionState, // CREADA
        transaccion_salesforce: data.Id,
        tipo_donacion: donationType.UNICA,
      });
      // Check if the transaction was created successfully
      if (!transaccion) {
        throw new Error(
          "No se pudo crear la transaccion en la base de datos, para el registro de One Off. Record ID: " +
            data.Id
        );
      }
      // If the transaction was created successfully, return its ID
      return transaccion.get("id");
    } else {
      console.log(
        "No se encontro el cliente para OO con el rut: " +
          data.s360a__Opportunity__r.s360a__Contact__r.RUN__c
      );
      throw new Error(
        "No se encontro el cliente para OO con el rut: " +
          data.s360a__Opportunity__r.s360a__Contact__r.RUN__c
      );
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTransaccionScheduledApp = async (
  transaccionId: any,
  data: AutorizarTBK
) => {
  try {
    const parsedDate = parseDate(data.accounting_date);
    const updatedTransaccion = await TransaccionModel.update(
      {
        codigo_autorizacion: data.details[0].authorization_code,
        tipo_pago_transaccion: data.details[0].payment_type_code,
        codigo_respuesta: data.details[0].response_code,
        fecha_contable: parsedDate,
        fecha_transaccion: data.transaction_date,
        numero_tarjeta: data.card_detail.card_number,
        estado: data.details[0].status,
      },
      {
        where: {
          id: transaccionId,
        },
      }
    );
    if (updatedTransaccion[0] === 1) {
      console.log("Transaccion updated successfully.");
      return updatedTransaccion;
    } else {
      // The update was not successful
      throw new Error("Fallo el update de la transaccion.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateTransaccionScheduledAppSF = async (
  transaccionId: any,
  responseSF: any
) => {
  try {
    const transaccionData = await TransaccionModel.findOne({
      where: { id: transaccionId },
      attributes: ["estado"],
    });
    let estadoTransaccion = null;
    if (transaccionData?.dataValues.estado === AutorizarStatus.AUTORIZADO) {
      estadoTransaccion = TransaccionStates.FINALIZADA_SF;
    } else {
      estadoTransaccion = TransaccionStates.FINALIZADA_SF_ERROR;
    }
    const updatedTransaccion = await TransaccionModel.update(
      {
        transaccion_salesforce: responseSF.Id,
        estado: estadoTransaccion,
      },
      {
        where: {
          id: transaccionId,
        },
      }
    );
    if (updatedTransaccion[0] === 1) {
      console.log("Transaccion updated successfully.");
      return updatedTransaccion;
    } else {
      // The update was not successful
      throw new Error("Fallo el update de la transaccion.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateTransaccionScheduledAppSFOO = async (transaccionId: any) => {
  try {
    const transaccionData = await TransaccionModel.findOne({
      where: { id: transaccionId },
      attributes: ["estado"],
    });
    let estadoTransaccion = null;
    if (transaccionData?.dataValues.estado === AutorizarStatus.AUTORIZADO) {
      estadoTransaccion = TransaccionStates.FINALIZADA_SF;
    } else {
      estadoTransaccion = TransaccionStates.FINALIZADA_SF_ERROR;
    }
    const updatedTransaccion = await TransaccionModel.update(
      {
        estado: estadoTransaccion,
      },
      {
        where: {
          id: transaccionId,
        },
      }
    );
    if (updatedTransaccion[0] === 1) {
      console.log("Transaccion updated successfully.");
      return updatedTransaccion;
    } else {
      // The update was not successful
      throw new Error("Fallo el update de la transaccion.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  createTransaccionScheduledApp,
  updateTransaccionScheduledApp,
  updateTransaccionScheduledAppSF,
  createTransaccionScheduledAppOO,
  updateTransaccionScheduledAppSFOO,
};
