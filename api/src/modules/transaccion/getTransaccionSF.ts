import TransaccionModel from "@/modules/transaccion/transaccion.model";
const getTransaccionSF = async (idTransaccion: string) => {
  try {
    const transaccion = await TransaccionModel.findOne({
      where: {
        id: idTransaccion,
      },
    });
    if (transaccion) {
      return transaccion.dataValues;
    } else {
      console.log("No se pudo encontrar la transaccion en getTransaccionSF.");
      return null;
    }
  } catch (error) {
    throw new Error("Error en el metodo getTransaccionSF");
  }
};

export default getTransaccionSF;
