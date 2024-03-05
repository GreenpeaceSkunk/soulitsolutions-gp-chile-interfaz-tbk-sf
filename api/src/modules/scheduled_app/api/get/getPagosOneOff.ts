import axios from "axios";

async function getPagosOneOff(token: string): Promise<PagosOOResponse> {
  // Obtengo fecha
  const closeDate = new Date("2023-11-29").toISOString().split("T")[0];
  // Creo la url
  const baseUrl = process.env.API_URL_GET_PAGOS;
  const query = encodeURIComponent(
    "SELECT ID, s360a__Status2__c, s360a__Amount__c, s360a__Opportunity__r.ID, s360a__Opportunity__r.s360a__Contact__r.RUN__C, s360a__Opportunity__r.TBK_User_Opp__c FROM s360a__Transaction2__c WHERE s360a__Status2__c = 'Awaiting Payment' AND s360a__PaymentMethod__c = 'OneClick' AND s360a__Opportunity__r.TBK_User_Opp__c <> '' "
  );

  const url = `${baseUrl}?q=${query}`;
  const getPagosOO = await axios
    .get<PagosOOResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log(response.data);
      console.log(JSON.stringify(response.data));
      // Handle the response here
      console.log("SUCCESS");

      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      throw new Error(`Error in getPagos: ${error.message}`);
    });
  return getPagosOO;
}
export default getPagosOneOff;
