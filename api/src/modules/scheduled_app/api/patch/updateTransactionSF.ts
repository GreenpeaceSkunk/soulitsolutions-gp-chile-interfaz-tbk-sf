import axios from "axios";
import {
  responseCodeText,
  transactionStaticFields,
} from "../post/transactionStaticFields";
import AutorizarStatus from "../../autorizar/enums/autorizarStatus";
import e from "express";
type PatchTransactionSF = {
  requestBody: object;
  responseSF: {
    success: boolean;
    errors?: string[];
  };
};
async function updateTransactionSF(
  token: string,
  dataTBK: AutorizarTBK,
  record: TransactionOO
): Promise<PatchTransactionSF> {
  const requestBody = {
    s360a__Status2__c:
      dataTBK.details[0].status === AutorizarStatus.AUTORIZADO
        ? "Payment Received"
        : "Payment Failed",
    s360a__PaidDate__c: dataTBK.transaction_date,
    s360a__Processed__c: dataTBK.transaction_date,
    s360a__FailureReason__c:
      dataTBK.details[0].status === AutorizarStatus.AUTORIZADO
        ? ""
        : responseCodeText(dataTBK.details[0].response_code),
  };
  const patchEndpoint = `${transactionStaticFields.patchTransactionEndpoint}/${record.Id}`;
  const transactionSF = await axios
    .patch(patchEndpoint, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log(response);
      console.log(response.data);
      // Handle the response here
      console.log("SUCCESS patching Transaction in SF");

      return { success: true };
    })
    .catch(function (error) {
      console.error(error);
      return { success: false, errors: error };
    });
  return { requestBody, responseSF: transactionSF };
}

export default updateTransactionSF;
