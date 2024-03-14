import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Oneclick,
  Options,
} from "transbank-sdk"; // ES6 Modules
import InscripcionDTO from "@/modules/inscripcion/dtos/inscripcionRequestDTO";
async function inscripcionTransbank(data: InscripcionDTO, transaccionId: any) {
  try {
    const ins = new Oneclick.MallInscription(
      new Options(
        String(process.env.API_TBK_COMMERCE_CODE_MALL),
        String(process.env.API_TBK_API_KEY),
        String(process.env.API_TBK_ENVIRONMENT)
      )
    );
    console.log(
      `Nombre, email y url enviadas a trasbank: ${data.nombre}, ${data.email}, ${data.response_url}`
    );

    const response = await ins.start(
      data.rut,
      data.email,
      `${data.response_url}?TRANSACCION_ID=${transaccionId}`
    );
    console.log(
      `Atencion datos que se reciben de Transbank: ${JSON.stringify(response)}`
    );
    return response;
  } catch (error) {
    // next(error);
    console.log(error);
    throw new Error("Fallo la llamada a Transbank");
  }
}

export default inscripcionTransbank;
