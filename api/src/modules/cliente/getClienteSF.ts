import ClienteModel from "@/modules/cliente/cliente.model";
const getClienteSF = async (idCliente: string) => {
  try {
    const clienteTransaccion = await ClienteModel.findOne({
      where: {
        id: idCliente,
      },
    });
    if (clienteTransaccion) {
      return clienteTransaccion.dataValues;
    } else {
      console.log("No se pudo encontrar el cliente en getClienteSF.");
      return null;
    }
  } catch (error) {
    throw new Error("Error en el metodo getClienteSF");
  }
};

export default getClienteSF;
