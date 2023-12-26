import {
  Oneclick,
  TransactionDetail,
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
} from "transbank-sdk";

const autorizarTransbank = async (
  data: PagosRecord | TransactionOO
): Promise<AutorizarTBK | null> => {
  try {
    // Type guard function for PagosRecord
    function isPagosRecord(
      data: PagosRecord | TransactionOO
    ): data is PagosRecord {
      return (
        data instanceof Object && // Check if data is an object
        "s360a__RegularGiving__r" in data
      );
    }

    // Type guard function for TransactionOO
    function isTransactionOO(
      data: PagosRecord | TransactionOO
    ): data is TransactionOO {
      return (
        data instanceof Object && // Check if data is an object
        "s360a__Opportunity__r" in data &&
        "s360a__Contact__r" in data.s360a__Opportunity__r &&
        "TBK_User_Opp__c" in data.s360a__Opportunity__r
      );
    }

    const tx = new Oneclick.MallTransaction(
      new Options(
        String(process.env.API_TBK_COMMERCE_CODE_MALL),
        String(process.env.API_TBK_API_KEY),
        String(process.env.API_TBK_ENVIRONMENT)
      )
    );
    let autorizarTBKFields;
    if (isPagosRecord(data)) {
      autorizarTBKFields = {
        username: data.s360a__Contact__r.RUN__c,
        tbkUser: data.s360a__RegularGiving__r.TBK_User__c,
        buyOrder: data.s360a__RegularGiving__c,
        amount: data.Amount,
        commerceCode: String(process.env.API_TBK_COMMERCE_CODE_STORE),
      };
    } else if (isTransactionOO(data)) {
      autorizarTBKFields = {
        username: data.s360a__Opportunity__r.s360a__Contact__r.RUN__c,
        tbkUser: data.s360a__Opportunity__r.TBK_User_Opp__c,
        buyOrder: data.s360a__Opportunity__r.Id,
        amount: data.s360a__Amount__c,
        commerceCode: String(process.env.API_TBK_COMMERCE_CODE_STORE),
      };
    }

    if (autorizarTBKFields) {
      const details = [
        new TransactionDetail(
          autorizarTBKFields.amount,
          autorizarTBKFields.commerceCode,
          autorizarTBKFields.buyOrder
        ),
      ];
      const response = await tx.authorize(
        autorizarTBKFields.username,
        autorizarTBKFields.tbkUser,
        autorizarTBKFields.buyOrder,
        details
      );
      return response;
    } else {
      console.log(
        `Lo que se recibio de data: ${JSON.stringify(
          data
        )} y lo que se recibio de autorizarTBKFields: ${JSON.stringify(
          autorizarTBKFields
        )}`
      );
      throw new Error("Error al crear el objeto para autorizar con Transbank.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default autorizarTransbank;
