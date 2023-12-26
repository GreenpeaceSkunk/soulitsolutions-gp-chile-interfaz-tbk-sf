const transactionStaticFields = {
  newTransactionEndpoint: String(process.env.API_URL_NEW_TRANSACTION_ENDPOINT),
  patchTransactionEndpoint: String(
    process.env.API_URL_PATCH_TRANSACTION_ENDPOINT
  ),
  s360a__TransactionType__c: "Income",
  s360a__PaymentMethod__c: "Transbank",
  CurrencyIsoCode: "CLP",
};

const responseCodeText = (response: number): string => {
  let output = null;
  switch (response) {
    case -1:
      output =
        "Rechazo - Posible error en el ingreso de datos de la transacción";
      break;
    case -2:
      output =
        "Rechazo - Se produjo fallo al procesar la transacción, este mensaje de rechazo se encuentra relacionado a parámetros de la tarjeta y/o su cuenta asociada";
      break;
    case -3:
      output = "Rechazo - Error en Transacción";
      break;
    case -4:
      output = "Rechazo - Rechazada por parte del emisor";
      break;
    case -5:
      output = "Rechazo - Transacción con riesgo de posible fraude";
      break;
    default:
      output = "Código de respuesta desconocido";
      break;
  }
  return output;
};
export { transactionStaticFields, responseCodeText };
