import React from "react";
import LandingPage from "../Main/LandingPage";
import LandingPageProps from "../types/landingPageProps";
import { useEffect } from "react";

const TipoMensual = () => {
  // Cambio titulo en pestaña
  useEffect(() => {
    document.title = "Greenpeace | Asóciate hoy";
  }, []);

  /* Landing para tipo de transaccion Mensual
   */
  // Configurar campos formulario

  // Background image sitio
  const BACKGROUND_IMAGE = "https://heute-at-prod-images.imgix.net/2020/4/27/081a5966-d769-4154-b502-ad043226ecc3.jpeg?auto=format,compress&w=1280";
  // Fecha de nacimiento
  const HABILITAR_FECHA_NACIMIENTO = true;
  // RegionProvinciaComuna = true
  const HABILITAR_REGION_PAIS_PROVINCIA_COMUNA = true;

  // Direccion Y Numero
  const HABILITAR_DIRECCION_NUMERO = true;

  // Checkbox para tarjetahabiente , Rut tarjetahabiente , Nombre tarjetahabiente

  const HABILITAR_CHECKBOX_TARJETAHABIENTE = true;

  // Tipo de donacion
  const donacionArray = ["Mensual", "One off"]; // No modificar valores

  const TIPO_DONACION = donacionArray[0];
  // Configurar montos de donacion
  // Montos de donacion
  const MONTOS = [
    { label: "$10.000", value: 10000 },
    { label: "$15.000", value: 15000 },
    { label: "$20.000", value: 20000 },
    { label: "Otro", value: 0 },
  ];

  // Monto minimo y maximo donacion
  const MONTO_MINIMO = 5000;

  const MONTO_MAXIMO = 45000;

  // Textos
  const TITLE = "EL PLANETA ES NUESTRO HOGAR `Mensual`";

  const SUBTITLE =
    "Todos nuestros recursos provienen de donaciones particulares de personas como vos, que deciden apoyar campañas para seguir defendiendo el planeta.";

  const DESCTEXT =
    "No recibimos aportes de empresas, partidos políticos ni gobiernos. Somos 100% independientes. Juntos podremos continuar nuestro trabajo con libertad de acción. ¡Sumate ahora, con vos somos más!";

  const FORMTITLE =
    "Apoyar a Greenpeace en defensa del planeta. ¡Juntos podemos hacer la diferencia!";

  const FORMSUBTITLE =
    "Una donación mensual es la mejor opción: nos ayuda a planificar acciones y campañas.";

  const landingPageProps: LandingPageProps = {
    enableBirthdate: HABILITAR_FECHA_NACIMIENTO,
    enableRegionProvinceCountry: HABILITAR_REGION_PAIS_PROVINCIA_COMUNA,
    enableAddressNumber: HABILITAR_DIRECCION_NUMERO,
    enableCardholderInfo: HABILITAR_CHECKBOX_TARJETAHABIENTE,
    donationType: TIPO_DONACION,
    maxAmount: MONTO_MAXIMO,
    minAmount: MONTO_MINIMO,
    amounts: MONTOS,
    title: TITLE,
    subtitle: SUBTITLE,
    descText: DESCTEXT,
    formTitle: FORMTITLE,
    formSubtitle: FORMSUBTITLE,
    backgroundImage: BACKGROUND_IMAGE,
  };
  return <LandingPage {...landingPageProps} />;
};

export default TipoMensual;
