import InscripcionDTO from "@/modules/inscripcion/dtos/inscripcionRequestDTO";
import express, { NextFunction } from "express";
import ClienteModel from "@/modules/cliente/cliente.model";
import TransaccionModel from "@/modules/transaccion/transaccion.model";
import TransaccionTypes from "@/modules/transaccion/enums/transaccionTypes";
import TransaccionStates from "../transaccion/enums/transaccionStates";
import inscripcionNewCampaign from "./inscripcionNewCampaign";
import inscripcionNewClienteNewCampaign from "./inscripcionNewClienteNewCampaign";
import LogsEvents from "../logs/enums/logsEvents";
import updateTransaccionConfirmar from "../transaccion/updateTransaccionConfirmar";
import updateClienteConfirmar from "../cliente/updateClienteConfirmar";
import generarStaging from "./salesforce/generarStaging";
import sendEmail from "./email/sendEmail";
import finalizarInscripcionTBK from "./finalizarInscripcionTBK";
import { createEmailBodyInscripcion, emailSubjectInscripcion } from "./email/templateHtml";
import createLog from "../logs/createLog";

const { Op } = require("sequelize");
interface CustomResponse {
  status: number;
  body?: any;
  data?: {
    response: any;
    finishTBKDate: string;
    lastFourDigits: string | null;
  };
  name?: string;
}
class InscripcionService {
  async create(data: InscripcionDTO): Promise<void | null> {
    // Chequear si el rut existe en la tabla "Cliente"
    const cliente = await ClienteModel.findOne({
      where: { rut: data.rut },
      attributes: ["id"],
    });
    if (cliente !== null) {
      console.log("Existe el rut.");
      // Inscripcion en Campaña
      return await inscripcionNewCampaign(data, cliente);
    } else {
      // Inscripcion Cliente Nuevo y Campaña Nueva
      return await inscripcionNewClienteNewCampaign(data);
    }
  }

  async confirmar(req: express.Request): Promise<CustomResponse> {
    createLog(
      req.body.transaccionId,
      LogsEvents.LLAMADO_DE_BANCO_ACEPTADO,
      req.body.token,
      null
    );

    updateTransaccionConfirmar(
      req.body,
      TransaccionStates.CONFIRMACION_PENDIENTE,
      null,
      null
    );
    const responseValues = await finalizarInscripcionTBK(req.body);
    const clienteID = await updateClienteConfirmar(req.body);

    const lastFourDigits = responseValues.lastFourDigits;

    if (
      responseValues.response.response_code === 0 &&
      lastFourDigits !== null
    ) {
      await createLog(
        req.body.transaccionId,
        LogsEvents.TRANSACCION_CONFIRMADA,
        req.body.token,
        responseValues.response
      );

      await updateTransaccionConfirmar(
        req.body,
        TransaccionStates.CONFIRMADA_TBK,
        responseValues.response,
        lastFourDigits
      );
      // Continuar con Saleforce y generarStaging

      const generatedStaging = await generarStaging(
        clienteID,
        req.body.transaccionId
      );
      console.log(
        `Esto es lo que retorna generarStaging: ${JSON.stringify(
          generatedStaging
        )}`
      );
      if (generatedStaging.correct) {
        console.log("Se genero el staging correctamente");
        console.log("Se procede a enviar el mail");
        
        const bodyInscripcion=createEmailBodyInscripcion(generatedStaging.cliente, responseValues.response, new Date().toISOString().split("T")[0],generatedStaging.transaccion); 
        sendEmail(
          generatedStaging.cliente.email,
          bodyInscripcion,
          emailSubjectInscripcion
        );
        return {
          status: 201,
          data: responseValues.response,
          name: generatedStaging.cliente.nombre,
        };
      } else {
        console.log("No se genero el staging correctamente");
        return { status: 400, body: "No se genero el staging correctamente" };
      }
    } else {
      console.log("El response code no es 0, entro al else.");
      await createLog(
        req.body.transaccionId,
        LogsEvents.ERROR_EN_LA_RESPUESTA_DEL_SERVICIO,
        req.body.token,
        responseValues.response
      );

      await updateTransaccionConfirmar(
        req.body,
        TransaccionStates.ERROR,
        responseValues.response,
        lastFourDigits
      );
      return {
        status: 400,
        body: "El response code no es 0, error en la transaccion.",
      };
    }
  }
}

export default InscripcionService;
