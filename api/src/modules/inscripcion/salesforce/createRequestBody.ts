import donationType from "@/modules/transaccion/enums/donationType";
import SFStaticParameters from "./enums/salesforceParameters.object";
import findCommuneCodeByName from "./api/post/countriesRegionsJson";

function createRequestBody(clienteSF: any, transaccionSF: any) {
  const comunaCode = findCommuneCodeByName(
    "Chile",
    clienteSF.region,
    clienteSF.provincia,
    clienteSF.comuna
  );
  console.log(`El codigo de comuna es: ${comunaCode}`);
  const requestBody = {
    s360aie__CampaignID__c: String(process.env.API_SF_S360AIE__CAMPAIGNID__C),
    s360aie__Country_of_Ownership__c: SFStaticParameters.Country_of_Ownership,
    s360aie__ActionType__c: "",
    s360aie__ActionTypeSuccess__c: SFStaticParameters.ActionTypeSuccess,
    s360aie__Contact_Source_Picklist__c: "",
    s360aie__Contact_First_Name__c: clienteSF.nombre,
    s360aie__Contact_Last_Name__c: clienteSF.apellido,
    ContactRUN__c: clienteSF.rut,
    s360aie__Contact_Primary_Country__c: clienteSF.pais,
    s360aie__Contact_Primary_Address__c:
      clienteSF.calle + " " + clienteSF.numero,
    s360aie__Contact_Primary_Suburb_Town__c: clienteSF.region,
    s360aie__Contact_Primary_State_County__c: clienteSF.comuna,
    s360aie__Contact_Primary_State_CountyCode__c:
      clienteSF.comuna === "" || clienteSF.comuna === null ? null : comunaCode,
    CodeLocalMobile__c: clienteSF.prefijo,
    s360aie__Contact_Phone_Mobile_Int__c:
      SFStaticParameters.Contact_Phone_Mobile_Int,
    s360aie__Contact_Phone_Mobile__c: clienteSF.telefono,
    s360aie__Contact_Email_Personal__c: clienteSF.email,
    s360aie__Regular_Giving_Frequency__c: "",
    CurrencyIsoCode: SFStaticParameters.CurrencyIsoCode,
    s360aie__Regular_Giving_Amount__c: transaccionSF.monto,
  //1
    s360aie__Regular_Giving_Payment_Method__c: 
      transaccionSF.tipo_donacion === donationType.MENSUAL 
      ? SFStaticParameters.Regular_Giving_Payment_Method : "",
    PaymentMethodSubType__c: SFStaticParameters.PaymentMethodSubType,
    AccountType__c: SFStaticParameters.AccountType,
    AccountHolderRUN__c: "",
    s360aie__Transaction_CC_Account_Name__c: "",
    s360aie__Regular_Giving_Preferred_Debit_Date__c: "",
    CardNumberLastFourDigitsOnly__c: transaccionSF.numero_tarjeta,
    card_tbk__c: transaccionSF.tipo_tarjeta,
    user_tbk__c: transaccionSF.tbk_user,
    authorization_code_tbk__c: transaccionSF.codigo_autorizacion,

    BIN_Bank__c: transaccionSF.nombre_banco,
    
    gpi__utm_campaign__c: transaccionSF.utm_campaign,
    gpi__utm_content__c: transaccionSF.utm_content,
    gpi__utm_medium__c: transaccionSF.utm_medium,
    gpi__utm_source__c: transaccionSF.utm_source,
    gpi__utm_term__c: transaccionSF.utm_term,
  //2
    s360aie__Transaction_Amount__c:
      transaccionSF.tipo_donacion === donationType.MENSUAL
        ? null
        : transaccionSF.monto,
    s360aie__Transaction_Already_Paid__c:
      SFStaticParameters.Transaction_Already_Paid,
  //3
    s360aie__Transaction_Payment_Method__c:
      transaccionSF.tipo_donacion === donationType.MENSUAL ? 
      SFStaticParameters.Transaction_Payment_Method : SFStaticParameters.Regular_Giving_Payment_Method,
    s360aie__Contact_Primary_CountryCode__c:
      SFStaticParameters.Contact_Primary_CountryCode,
    RecordTypeId: String(process.env.API_SF_RECORDTYPEID),
  //4
    s360aie__ProcessName__c: transaccionSF.tipo_donacion === donationType.MENSUAL ? 
        SFStaticParameters.s360aie__ProcessName__c : SFStaticParameters.Process_Name_One_Off,
    s360aie__DDC_Signup_Date__c: new Date().toISOString().split("T")[0],
  
    s360aie__Regular_Giving_Start_Date__c: 
    transaccionSF.tipo_donacion === donationType.MENSUAL
        ? null
        : transaccionSF.tipo_donacion,

    s360aie__Contact_Date_of_Birth2__c: clienteSF.fecha_nacimiento,
  };

  switch (transaccionSF.utm_source) {
    case "DD":
      requestBody.s360aie__Contact_Source_Picklist__c =
        SFStaticParameters.Contact_Source_PicklistDD;
      break;
    case "TMK":
      requestBody.s360aie__Contact_Source_Picklist__c = `${transaccionSF.utm_source} ${transaccionSF.utm_medium}`;
      break;
    case "Web":
      requestBody.s360aie__Contact_Source_Picklist__c =
        SFStaticParameters.Contact_Source_PicklistWEB;
      break;
    default:
      requestBody.s360aie__Contact_Source_Picklist__c =
        SFStaticParameters.Contact_Source_PicklistDD;
      break;
  }

  if (transaccionSF.tipo_donacion === donationType.MENSUAL) {
    requestBody.s360aie__ActionType__c = SFStaticParameters.ActionTypeM;
    requestBody.s360aie__Regular_Giving_Frequency__c =
      SFStaticParameters.Regular_Giving_FrequencyM;
  //2 ??
    delete requestBody.s360aie__Transaction_Amount__c;

  } else {
    requestBody.s360aie__ActionType__c = SFStaticParameters.ActionTypeOO;
    requestBody.s360aie__Regular_Giving_Frequency__c =
      SFStaticParameters.Regular_Giving_FrequencyOO;
      //5
    delete requestBody.s360aie__Regular_Giving_Start_Date__c;
  }

  if (transaccionSF.titular == false) {
    requestBody.AccountHolderRUN__c = clienteSF.rut;
    requestBody.s360aie__Transaction_CC_Account_Name__c = `${clienteSF.nombre} ${clienteSF.apellido}`;
  } else {
    requestBody.AccountHolderRUN__c = transaccionSF.tarjetahabiente_rut;
    requestBody.s360aie__Transaction_CC_Account_Name__c =
      transaccionSF.tarjetahabiente_nombre;
  }

  // Setear debit date
  const today = new Date();

  if (today.getDate() > 28) {
    requestBody.s360aie__Regular_Giving_Preferred_Debit_Date__c = "28";
  } else {
    requestBody.s360aie__Regular_Giving_Preferred_Debit_Date__c = today
      .getDate()
      .toString();
  }

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if(transaccionSF.tipo_donacion === donationType.MENSUAL){
    requestBody.s360aie__Regular_Giving_Start_Date__c = tomorrow.toISOString().split("T")[0];
  }
  

  return requestBody;
}

export default createRequestBody;
