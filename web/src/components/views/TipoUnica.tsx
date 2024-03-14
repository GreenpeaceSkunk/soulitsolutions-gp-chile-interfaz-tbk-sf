import React, { useEffect } from "react";
import LandingPage from "../Main/LandingPage";
import LandingPageProps from "../types/landingPageProps";

const TipoUnica = () => {
  // Cambio titulo en pestaña
  useEffect(() => {
    document.title = "Greenpeace | Apoyá nuestra campaña";
  }, []);
  // Configurar campos formulario

  // Background image sitio
  const BACKGROUND_IMAGE =
    "https://wallpapercave.com/wp/wp10251538.jpg";
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

  const TIPO_DONACION = donacionArray[1];
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
  const TITLE = "El hogar de todas y todos nos necesita. Actuemos por el planeta. <br>";

  const SUBTITLE =
    "<br>Estás a un paso de convertirte en activista por el medioambiente. <br> <br>"
    + "En Greenpeace <b>NO</b> aceptamos dinero de empresas, partidos políticos ni gobiernos. <br>Nuestra libertad e independencia <b>siempre</b> está presente. <br> <br>"
    + "El aporte económico mensual que realizan nuestros donantes se convierte en acción por la protección y defensa de los bosques, océanos, mares, playas y todos los ecosistemas. <br>";

  const DESCTEXT =
    "Ayúdanos a respetar y cuidar a la Naturaleza 💚";

  const FORMTITLE =
    "Para transformar la realidad necesitamos todo el apoyo posible. El primer paso <b>está a sólo un click, la decisión es tuya.</b>";

  const FORMSUBTITLE =
    "Buscamos soluciones y generamos cambios, cada donación <b>SÍ</b> hace la diferencia. Elige el monto de tu donación única";
  
  const IPC_TEXT = ""

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
    ipcText: IPC_TEXT,
  };
  return <LandingPage {...landingPageProps} />;
};

export default TipoUnica;
