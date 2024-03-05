import createLog from "../logs/createLog";
import LogsEvents from "../logs/enums/logsEvents";
import TransaccionStates from "../transaccion/enums/transaccionStates";
import TransaccionTypes from "../transaccion/enums/transaccionTypes";
import {
  createTransaccionScheduledApp,
  updateTransaccionScheduledApp,
  updateTransaccionScheduledAppSF,
} from "../transaccion/transaccionScheduledApp";
import createTransactionSF from "./api/post/createTransactionSF";
import autorizarTransbank from "./autorizar/autorizarTransbank";
import AutorizarStatus from "./autorizar/enums/autorizarStatus";
import sendEmailError from "./email/sendEmailError";
import ClienteModel from "@/modules/cliente/cliente.model";
import {
  createEmailSuccessBody,
  successEmailSubject,
} from "./email/successEmailTemplate";
import sendEmail from "../inscripcion/email/sendEmail";
import TransaccionModel from "@/modules/transaccion/transaccion.model";
import donationType from "../transaccion/enums/donationType";
const checkCreateRecords = async (token: string, data: PagosResponse) => {
  const records = data.records;

  for (const record of records) {
    try {
      console.log("Record ID:", record.Id);
      console.log("Regular Giving:", record.s360a__RegularGiving__c);
      console.log("Amount:", record.Amount);
      console.log("Name:", record.s360a__RegularGiving__r.Name);
      record.s360a__Contact__r.RUN__c = record.s360a__Contact__r.RUN__c.toUpperCase();
      console.log("RUN:", record.s360a__Contact__r.RUN__c);

      // Recorrer cada record y crear un registro en la tabla de transacciones
      const transaccionId = await createTransaccionScheduledApp(
        TransaccionTypes.Pago,
        TransaccionStates.CREADA,
        record
      );

      console.log("Transaccion creada con ID:", transaccionId);
      // Loguear
      await createLog(
        transaccionId,
        LogsEvents.TRANSACCION_PAGO_CREADA_CORRECTAMENTE,
        null,
        record
      );

      let authorizeTBK = await autorizarTransbank(record);
      const authTBKRequest = authorizeTBK.request;
      console.log("AUTH TBK return: ", JSON.stringify(authorizeTBK));
      authorizeTBK = authorizeTBK.response;

      console.log(JSON.stringify(authorizeTBK));
      if (
        !authorizeTBK ||
        (authorizeTBK.details[0].status !== AutorizarStatus.AUTORIZADO &&
          authorizeTBK.details[0].status !== AutorizarStatus.FALLO)
      ) {
        // Log error en la transaccion y update estado transaccion error
        await createLog(
          transaccionId,
          LogsEvents.ERROR_EN_LA_RESPUESTA_DEL_SERVICIO,
          null,
          record
        );
        throw new Error(
          `Error en la respuesta del servicio de Autorizar Transbank: ${authorizeTBK}`
        );
      } else {
        const updatedTransaction = await updateTransaccionScheduledApp(
          transaccionId,
          authorizeTBK
        );
        await createLog(
          transaccionId,
          LogsEvents.TRANSACCION_PAGO_ACTUALIZADA_CORRECTAMENTE,
          authTBKRequest,
          authorizeTBK
        );
        //Crear Transaction Salesforce
        const transaccionSF = await createTransactionSF(
          token,
          authorizeTBK,
          record
        );
        console.log(
          `Lo que devuelve transaccionSF: ${JSON.stringify(transaccionSF)}`
        );
        if (transaccionSF.responseSF.errors.length > 0) {
          console.log("Ocurrio un error al crear la transaccion en Salesforce");
          console.log(transaccionSF.responseSF.errors);
          await createLog(
            transaccionId,
            LogsEvents.TRANSACCION_PAGO_FINALIZADA_SALESFORCE,
            transaccionSF.requestBody,
            transaccionSF.responseSF
          );
          throw new Error(
            `Error al crear la transaccion en Salesforce: ${transaccionSF.responseSF}, pero fue autorizada en Transbank ${authorizeTBK}.`
          );
        } else {
          await updateTransaccionScheduledAppSF(transaccionId, transaccionSF);
          await createLog(
            transaccionId,
            LogsEvents.TRANSACCION_PAGO_FINALIZADA_SALESFORCE,
            transaccionSF.requestBody,
            transaccionSF.responseSF
          );

          console.log(
            `Todo salio bien con la transaccion de Salesforce: ${JSON.stringify(
              transaccionSF
            )}`
          );

          // Enviar email de exito
          const cliente = await ClienteModel.findOne({
            where: {
              rut: record.s360a__Contact__r.RUN__c,
            },
          });
          console.log(cliente);
          if (cliente) {
            const transaccion = await TransaccionModel.findOne({
              where: {
                numero_tarjeta: authorizeTBK.card_detail.card_number,
                codigo_autorizacion: authorizeTBK.details[0].authorization_code,
                tipo_de_transaccion: TransaccionTypes.Inscripcion,
                tipo_donacion: donationType.MENSUAL,
              },
              order: [["createdAt", "DESC"]],
            });
            console.log(
              `Lo que devuelve tipoTarjeta: ${transaccion?.dataValues.tipo_tarjeta}`
            );
            const body = createEmailSuccessBody(
              authorizeTBK,
              transaccion?.dataValues,
              cliente.dataValues
            );
            await sendEmail(
              cliente.dataValues.email,
              body,
              successEmailSubject
            );
          }
        }
        // Por cada registro generar una transaccion para Salesforce
      }
      console.log("Termino la operacion para este record:." + record.Id);
    } catch (error) {
      console.log(error);
      sendEmailError(error);
    }
  }
};

export default checkCreateRecords;
