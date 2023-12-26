import TransaccionStates from "./enums/transaccionStates";
import TransaccionModel from "@/modules/transaccion/transaccion.model";

const updateTransaccionSF = async (
  transaccionSF: any,
  transaccionState: TransaccionStates,
  idStaging?: string
) => {
  try {
    //
    const valueStagingID = idStaging ? idStaging : null;
    const updatedTransaccion = await TransaccionModel.update(
      {
        estado: transaccionState,
        staging_ID: valueStagingID,
      },
      {
        where: {
          id: transaccionSF.id,
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

export default updateTransaccionSF;
