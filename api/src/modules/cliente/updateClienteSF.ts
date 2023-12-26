import ClienteModel from "@/modules/cliente/cliente.model";
import ClienteStates from "./enums/clienteStates.enum";

const updateClienteSF = async (clienteSF: any, clienteState: ClienteStates) => {
  try {
    const updatedCliente = await ClienteModel.update(
      {
        estado: clienteState,
      },
      {
        where: {
          id: clienteSF.id,
        },
      }
    );
    if (updatedCliente[0] === 1) {
      console.log("Cliente updated successfully.");
      return updatedCliente;
    } else {
      // The update was not successful
      console.log("Failed to update cliente.");
      return null;
    }
  } catch (error) {
    console.log(
      `
            Fallo el update del cliente`,
      error
    );
    throw error;
  }
};

export default updateClienteSF;
