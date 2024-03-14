import InscripcionDTO from "@/modules/inscripcion/dtos/inscripcionRequestDTO";
import ClienteModel from "@/modules/cliente/cliente.model";
import TransaccionModel from "@/modules/transaccion/transaccion.model";
import TransaccionTypes from "@/modules/transaccion/enums/transaccionTypes";
import TransaccionStates from "../transaccion/enums/transaccionStates";
import sequelize from "@/config/db-config";
import LogsEvents from "@/modules/logs/enums/logsEvents";
import inscripcionTransbank from "./inscripcionTransbank";
import ClienteStates from "@/modules/cliente/enums/clienteStates.enum";
import {
  createTransaccionInscripcion,
  updateTransaccionInscripcion,
} from "../transaccion/transaccionInscripcion";
import createLog from "../logs/createLog";
import { parseUrl } from "@/commons/utils";

async function inscripcionNewClienteNewCampaign(data: InscripcionDTO) {
  try {
    console.log(new Date());
    const result = await sequelize.transaction(async (t) => {
      const cliente = await ClienteModel.create(
        {
          nombre: data.nombre,
          apellido: data.apellido,
          rut: data.rut,
          email: data.email,
          prefijo: data.prefijo,
          telefono: data.telefono,
          fecha_nacimiento: data.fechaNacimiento,
          pais: data.pais,
          region: data.region,
          provincia: data.provincia,
          comuna: data.comuna,
          calle: data.calle,
          numero: data.numero,
          estado: ClienteStates.CREADO,
        },
        { transaction: t }
      );

      const transaccion = await TransaccionModel.create(
        {
          response_url: data.response_url,
          tipo_de_transaccion: TransaccionTypes.Inscripcion,
          utm_campaign: data.utmCampaign,
          utm_content: data.utmContent,
          utm_medium: data.utmMedium,
          utm_source: data.utmSource,
          utm_term: data.utmTerm,
          monto: data.monto,
          estado: TransaccionStates.CREADA,
          cliente_id: cliente.dataValues.id,
          tipo_donacion: data.tipoDonacion,
          titular: data.titular,
          tarjetahabiente_rut: data.tarjetaHabienteRut,
          tarjetahabiente_nombre: data.tarjetaHabienteNombre,
        },
        { transaction: t }
      );

      return { user: cliente, transaccion };
    });
    console.log(result);

    const transaccionId = result.transaccion.get("id");
    const apiResponseUrl = parseUrl(`${data.response_url}?TRANSACCION_ID=${transaccionId}`, data.apiResponseUrlParams);
    const reqLog = `${data.nombre},${data.email}, ${apiResponseUrl}`;
    // Loguea transaccion creada correctamente
    createLog(
      transaccionId,
      LogsEvents.TRANSACCION_CREADA_CORRECTAMENTE,
      reqLog,
      null
    );

    // log del request AQUi porque requiere estar bindeado a una transaccion
    createLog(
      transaccionId,
      LogsEvents.LOG_INPUT,
      data,
      null
    );
    const response = await inscripcionTransbank(data, transaccionId); // TODO: HTTP RESPONSE
    console.log(response);
    if (response !== null) {
      const update = updateTransaccionInscripcion(
        transaccionId,
        TransaccionStates.INICIALIZADA,
        response
      );
      if (update !== null) {
        createLog(
          transaccionId,
          LogsEvents.TRANSACCION_INICIALIZADA,
          reqLog,
          response
        );
        return response;
      } else {
        createLog(
          transaccionId,
          LogsEvents.ERROR_EN_LA_RESPUESTA_DEL_SERVICIO,
          reqLog,
          response
        );
        updateTransaccionInscripcion(
          transaccionId,
          TransaccionStates.ERROR,
          response
        );
        throw new Error(
          "Error en la respuesta del servicio (Fallo el update de la transaccion)"
        );
      }
    } else {
      updateTransaccionInscripcion(
        transaccionId,
        TransaccionStates.ERROR,
        response
      );
      createLog(
        transaccionId,
        LogsEvents.ERROR_EN_LA_RESPUESTA_DEL_SERVICIO,
        reqLog,
        response
      );
      throw new Error(
        "Error en la respuesta del servicio (Problema al llamar a Transbank)"
      );
    }
    // TODO Loguear info evento " Transacción Inicializada "
    // TODO Update tabla Transaccion info evento " Transacción Inicializada "
  } catch (error) {
    console.log(error); // If the execution reaches this line, an error occurred.
    console.log("Error al crear la transaccion de BD");

    // The transaction has already been rolled back automatically by Sequelize!
  }
}

export default inscripcionNewClienteNewCampaign;
