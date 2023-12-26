import ClienteModel from "@/modules/cliente/cliente.model";
import TransaccionModel from "@/modules/transaccion/transaccion.model";
import ClienteStates from "./enums/clienteStates.enum";

const updateClienteConfirmar = async (data: any) => {
  try {
    // Busco la transaccion
    const clienteTransaccion = await TransaccionModel.findOne({
      where: {
        id: data.transaccionId,
      },
      attributes: ["cliente_id"],
    });
    // A partir del Id del cliente, lo busco y actualizo sus datos
    if (clienteTransaccion) {
      const updatedCliente = await ClienteModel.update(
        {
          estado: ClienteStates.ACTIVO_TBK,
        },
        {
          where: {
            id: clienteTransaccion.dataValues.cliente_id,
          },
        }
      );
      if (updatedCliente[0] === 1) {
        console.log(
          "Cliente actualizado correctamente en updateClienteConfirmar."
        );
        return clienteTransaccion.dataValues.cliente_id; // Retorna el id del cliente para luego usarlo en generarStaging
      } else {
        console.log(
          "No se pudo actualizar el cliente en updateClienteConfirmar."
        );
        return null;
      }
    }
  } catch (error) {
    console.log(
      `Fallo el update del cliente en metodo updateClienteConfirmar.`,
      error
    );
    return null;
  }
};

export default updateClienteConfirmar;
