import InscripcionDTO from "../inscripcion/dtos/inscripcionRequestDTO";
import TransaccionStates from "./enums/transaccionStates";
import TransaccionTypes from "./enums/transaccionTypes";
import { TRANSBANK } from "@/config/config";
import TransaccionModel from "@/modules/transaccion/transaccion.model";
// // {
//   "response_code": 0,
//   "tbk_user": "1108d276-e18a-4960-85d6-4c8eb1fb49b1",
//   "authorization_code": "1213",
//   "card_type": "Visa",
//   "card_number": "XXXXXXXXXXXX6623"
// }
const updateTransaccionConfirmar = async (
  data: any,
  transaccionState: TransaccionStates,
  response: any,
  lastFourDigits: string | null
) => {
  try {
    const updatedTransaccion = await TransaccionModel.update(
      {
        estado: transaccionState,
        token: data.token,
        tbk_user: response?.tbk_user,
        codigo_respuesta: response?.response_code,
        codigo_autorizacion: response?.authorization_code,
        tipo_tarjeta: response?.card_type,
        numero_tarjeta: lastFourDigits,
      },
      {
        where: {
          id: data.transaccionId,
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

export default updateTransaccionConfirmar;
