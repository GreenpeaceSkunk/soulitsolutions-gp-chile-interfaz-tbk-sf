import axios from "axios";

async function getPagos(token: string): Promise<PagosResponse> {
  // Obtengo fecha
  const envDate = String(process.env.API_CLOSE_DATE);
  console.log("El valor de envDate es: " + envDate);
  let closeDate;
  if (envDate !== undefined && envDate !== null && envDate !== "") {
    closeDate = new Date(envDate).toISOString().split("T")[0];
  } else {
    closeDate = new Date().toISOString().split("T")[0];
  }
  console.log(
    "La fecha env es: " + envDate + " y la fecha enviada a SF es: " + closeDate
  );
  // Creo la url
  const baseUrl = process.env.API_URL_GET_PAGOS;
  const query = encodeURIComponent(
    "SELECT Opportunity.s360a__RegularGiving__c, Opportunity.Amount, Opportunity.ID, Opportunity.s360a__RegularGiving__r.TBK_User__c, Opportunity.s360a__RegularGiving__r.Name, Opportunity.s360a__Contact__r.RUN__C " +
      "FROM Opportunity " +
      "WHERE StageName = 'Open' " +
      `AND CloseDate <= ${closeDate} ` +
      "AND Opportunity.s360a__RegularGiving__r.s360a__CurrentPaymentMethod__c = 'OneClick' " +
      "AND Opportunity.s360a__RegularGiving__r.Payment_Method_sub_type__c = 'Transbank'"
  );

  const url = `${baseUrl}?q=${query}`;
  const getPagos = await axios
    .get<PagosResponse>(url, {
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
  return getPagos;
}
export default getPagos;
