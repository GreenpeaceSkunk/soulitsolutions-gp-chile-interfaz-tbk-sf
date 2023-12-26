import InscripcionDTO from "../inscripcion/dtos/inscripcionRequestDTO";
import TransaccionStates from "./enums/transaccionStates";
import TransaccionTypes from "./enums/transaccionTypes";
import { TRANSBANK } from "@/config/config";
import TransaccionModel from "@/modules/transaccion/transaccion.model";

const createTransaccionInscripcion = async (
  transaccionType: TransaccionTypes,
  transaccionState: TransaccionStates,
  data: InscripcionDTO,
  cliente: any
) => {
  try {
    const transaccion = await TransaccionModel.create({
      response_url: TRANSBANK.RESPONSE_URL,
      tipo_de_transaccion: transaccionType,
      utm_campaign: data.utmCampaign,
      utm_content: data.utmContent,
      utm_medium: data.utmMedium,
      utm_source: data.utmSource,
      utm_term: data.utmTerm,
      monto: data.monto,
      estado: transaccionState,
      cliente_id: cliente.dataValues.id,
      tipo_donacion: data.tipoDonacion,
      titular: data.titular,
      tarjetahabiente_rut: data.tarjetaHabienteRut,
      tarjetahabiente_nombre: data.tarjetaHabienteNombre,
    });
    return transaccion.get("id");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTransaccionInscripcion = async (
  transaccionId: any,
  transaccionState: TransaccionStates,
  response: any
) => {
  try {
    const updatedTransaccion = await TransaccionModel.update(
      {
        estado: transaccionState,
        token: response.token,
        checkout_url: response.url_webpay,
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
      console.log("Failed to update transaccion.");
      return null;
    }
  } catch (error) {
    console.log(
      `
    Fallo el update de la transaccion`,
      error
    );
    throw error;
  }
};

export { createTransaccionInscripcion, updateTransaccionInscripcion };
