import axios from "axios";
import createRequestBody from "../../createRequestBody";

async function createStagingSF(token: any, clienteSF: any, transaccionSF: any) {
  const requestBody = createRequestBody(clienteSF, transaccionSF);
  console.log("Lo que se envio a generateStaging: ", requestBody);
  const generateStaging = await axios
    .post(
      String(process.env.API_URL_CREATE_STAGING), 
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      console.log(response.data);
      // Handle the response here
      console.log("SUCCESS generate staging");
      const stagingData = {
        request: requestBody,
        response: response.data,
      };
      return stagingData;
    })
    .catch(function (error) {
      console.error(error);
      // Handle errors here
      return null;
    });
  return generateStaging;
}

export default createStagingSF;
