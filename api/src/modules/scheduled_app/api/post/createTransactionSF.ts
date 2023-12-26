import axios from "axios";

import AutorizarStatus from "../../autorizar/enums/autorizarStatus";
import parseDate from "../../utils/parseDate";
import {
  responseCodeText,
  transactionStaticFields,
} from "./transactionStaticFields";
type TransactionSF = {
  requestBody: object;
  responseSF: {
    id: string;
    success: boolean;
    errors: string[];
  };
};
async function createTransactionSF(
  token: string,
  dataTBK: AutorizarTBK,
  record: PagosRecord
): Promise<TransactionSF> {
  const parsedDate = parseDate(dataTBK.accounting_date);
  const requestBody = {
    s360a__TransactionType__c:
      transactionStaticFields.s360a__TransactionType__c,
    s360a__PaymentMethod__c: transactionStaticFields.s360a__PaymentMethod__c,
    s360a__Amount__c: dataTBK.details[0].amount,
    s360a__Opportunity__c: record.Id,
    s360a__Status2__c:
      dataTBK.details[0].status === AutorizarStatus.AUTORIZADO
        ? "Payment Received"
        : "Payment Failed",
    s360a__PaidDate__c: parsedDate,
    s360a__Processed__c: dataTBK.transaction_date,
    s360a__FailureReason__c:
      dataTBK.details[0].status === AutorizarStatus.AUTORIZADO
        ? null
        : responseCodeText(dataTBK.details[0].response_code),
    CurrencyIsoCode: transactionStaticFields.CurrencyIsoCode,
  };
  const transactionSF = await axios
    .post(transactionStaticFields.newTransactionEndpoint, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log(response);
      console.log(response.data);
      // Handle the response here
      console.log("SUCCESS creating Transaction in SF");

      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      throw error;
    });
  return { requestBody, responseSF: transactionSF };
}

export default createTransactionSF;
