import express, { NextFunction } from "express";
import InscripcionService from "@/modules/inscripcion/inscripcion.service";
import InscripcionDTO from "@/modules/inscripcion/dtos/inscripcionRequestDTO";
import TransaccionStates from "../transaccion/enums/transaccionStates";
import LogsEvents from "../logs/enums/logsEvents";
import updateTransaccionConfirmar from "../transaccion/updateTransaccionConfirmar";
import updateClienteConfirmar from "../cliente/updateClienteConfirmar";
import generarStaging from "./salesforce/generarStaging";
import sendEmail from "./email/sendEmail";
import finalizarInscripcionTBK from "./finalizarInscripcionTBK";
import createLog from "../logs/createLog";

export class InscripcionController {
  protected service: any;
  protected inscripcionService: InscripcionService; // Servicio Inscripcion

  public constructor() {
    //this.service = container.resolve('IInscripcionService');
    this.inscripcionService = new InscripcionService();
  }

  public async incripcion(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestData: InscripcionDTO = res.locals.validatedBody;
      console.log(requestData);
    
      const response = await this.inscripcionService.create(requestData);
      if (response !== null) {
        res.status(201).json(response);
      } else {
        res
          .status(400)
          .json("Inscripción en Proceso. Por favor, aguarde un instante.");
      }
    } catch (error) {
      // next(error); TODO: Ver como manejar los errores con next.
      res
        .status(400)
        .json(
          "Error en la Transacción. Disculpe las molestias ocasionadas. Por favor, intente más tarde"
        );
    }
  }

  public async confirmar(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await this.inscripcionService.confirmar(req);

      if (response.status === 201) {
        res.status(201).json(response);
      } else {
        res.status(400).json(response.body);
      }
    } catch (error) {
      console.log("Entro al catch del 'confirmar' inscripcion.controller");

      await createLog(
        req.body.transaccionId,
        LogsEvents.ERROR_EN_LA_RESPUESTA_DEL_SERVICIO,
        req.body.token,
        null
      );
      await updateTransaccionConfirmar(
        req.body,
        TransaccionStates.ERROR,
        null,
        null,
        null
      );
      res.status(400).json(error);
    }
  }
}
