import {
  Options,
  Oneclick,
  IntegrationApiKeys,
  Environment,
  IntegrationCommerceCodes,
} from "transbank-sdk";
import express, { NextFunction } from "express";
import extractLastFourDigits from "./extractLastFourDigits";

const finalizarInscripcionTBK = async (data: any) => {
  const ins = new Oneclick.MallInscription(
    new Options(
      String(process.env.API_TBK_COMMERCE_CODE_MALL),
      String(process.env.API_TBK_API_KEY),
      String(process.env.API_TBK_ENVIRONMENT)
    )
  );
  console.log("Llamada para confirmar inscripcion");
  console.log(`El token es: ${data.token}`);
  console.log(`El id de la transaccion es: ${data.transaccionId}`);
  const response = await ins.finish(data.token);
  const finishTBKDate = new Date().toISOString().split("T")[0];
  console.log(`El response code es:${response.response_code}`);
  console.log(`Todo lo que trae el response es: ${JSON.stringify(response)}`);
  let lastFourDigits = null;
  if (response.response_code === 0) {
    lastFourDigits = extractLastFourDigits(response.card_number);
  }

  const finalizarInscripcionData = {
    response,
    finishTBKDate,
    lastFourDigits,
  };
  return finalizarInscripcionData;
};

export default finalizarInscripcionTBK;
