interface Commune {
  code: string;
  name: string;
}

interface Province {
  code: string;
  name: string;
  communes: Commune[];
}

interface Region {
  code: string;
  name: string;
  provinces?: Province[];
}

interface Country {
  name: string;
  dial_code: string;
  code: string;
  regions?: Region[];
}

const Countries: Country[] = [
  {
    name: "Afghanistan",
    dial_code: "+93",
    code: "AF",
  },
  {
    name: "Albania",
    dial_code: "+355",
    code: "AL",
  },
  {
    name: "Algeria",
    dial_code: "+213",
    code: "DZ",
  },
  {
    name: "AmericanSamoa",
    dial_code: "+1684",
    code: "AS",
  },
  {
    name: "Andorra",
    dial_code: "+376",
    code: "AD",
  },
  {
    name: "Angola",
    dial_code: "+244",
    code: "AO",
  },
  {
    name: "Anguilla",
    dial_code: "+1264",
    code: "AI",
  },
  {
    name: "Antarctica",
    dial_code: "+672",
    code: "AQ",
  },
  {
    name: "Antigua and Barbuda",
    dial_code: "+1268",
    code: "AG",
  },
  {
    name: "Argentina",
    dial_code: "+54",
    code: "AR",
  },
  {
    name: "Armenia",
    dial_code: "+374",
    code: "AM",
  },
  {
    name: "Aruba",
    dial_code: "+297",
    code: "AW",
  },
  {
    name: "Australia",
    dial_code: "+61",
    code: "AU",
  },
  {
    name: "Austria",
    dial_code: "+43",
    code: "AT",
  },
  {
    name: "Azerbaijan",
    dial_code: "+994",
    code: "AZ",
  },
  {
    name: "Bahamas",
    dial_code: "+1242",
    code: "BS",
  },
  {
    name: "Bahrain",
    dial_code: "+973",
    code: "BH",
  },
  {
    name: "Bangladesh",
    dial_code: "+880",
    code: "BD",
  },
  {
    name: "Barbados",
    dial_code: "+1246",
    code: "BB",
  },
  {
    name: "Belarus",
    dial_code: "+375",
    code: "BY",
  },
  {
    name: "Belgium",
    dial_code: "+32",
    code: "BE",
  },
  {
    name: "Belize",
    dial_code: "+501",
    code: "BZ",
  },
  {
    name: "Benin",
    dial_code: "+229",
    code: "BJ",
  },
  {
    name: "Bermuda",
    dial_code: "+1441",
    code: "BM",
  },
  {
    name: "Bhutan",
    dial_code: "+975",
    code: "BT",
  },
  {
    name: "Bolivia, Plurinational State of",
    dial_code: "+591",
    code: "BO",
  },
  {
    name: "Bosnia and Herzegovina",
    dial_code: "+387",
    code: "BA",
  },
  {
    name: "Botswana",
    dial_code: "+267",
    code: "BW",
  },
  {
    name: "Brazil",
    dial_code: "+55",
    code: "BR",
  },
  {
    name: "British Indian Ocean Territory",
    dial_code: "+246",
    code: "IO",
  },
  {
    name: "Brunei Darussalam",
    dial_code: "+673",
    code: "BN",
  },
  {
    name: "Bulgaria",
    dial_code: "+359",
    code: "BG",
  },
  {
    name: "Burkina Faso",
    dial_code: "+226",
    code: "BF",
  },
  {
    name: "Burundi",
    dial_code: "+257",
    code: "BI",
  },
  {
    name: "Cambodia",
    dial_code: "+855",
    code: "KH",
  },
  {
    name: "Cameroon",
    dial_code: "+237",
    code: "CM",
  },
  {
    name: "Canada",
    dial_code: "+1",
    code: "CA",
  },
  {
    name: "Cape Verde",
    dial_code: "+238",
    code: "CV",
  },
  {
    name: "Cayman Islands",
    dial_code: "+345",
    code: "KY",
  },
  {
    name: "Central African Republic",
    dial_code: "+236",
    code: "CF",
  },
  {
    name: "Chad",
    dial_code: "+235",
    code: "TD",
  },
  {
    name: "Chile",
    dial_code: "+56",
    code: "CL",
    regions: [
      {
        code: "AN",
        name: "Antofagasta",
        provinces: [
          {
            code: "5",
            name: "Antofagasta",
            communes: [
              {
                code: "02101",
                name: "Antofagasta",
              },
              {
                code: "02102",
                name: "Mejillones",
              },
              {
                code: "02103",
                name: "Sierra Gorda",
              },
              {
                code: "02104",
                name: "Taltal",
              },
            ],
          },
          {
            code: "6",
            name: "El Loa",
            communes: [
              {
                code: "02201",
                name: "Calama",
              },
              {
                code: "02202",
                name: "Ollagüe",
              },
              {
                code: "02203",
                name: "San Pedro de Atacama",
              },
            ],
          },
          {
            code: "7",
            name: "Tocopilla",
            communes: [
              {
                code: "02301",
                name: "Tocopilla",
              },
              {
                code: "02302",
                name: "María Elena",
              },
            ],
          },
        ],
      },
      {
        code: "AP",
        name: "Arica y Parinacota",
        provinces: [
          {
            code: "1",
            name: "Arica",
            communes: [
              {
                code: "15101",
                name: "Arica",
              },
              {
                code: "15102",
                name: "Camarones",
              },
            ],
          },
          {
            code: "2",
            name: "Parinacota",
            communes: [
              {
                code: "15202",
                name: "General Lagos",
              },
              {
                code: "15201",
                name: "Putre",
              },
            ],
          },
        ],
      },
      {
        code: "AT",
        name: "Atacama",
        provinces: [
          {
            code: "9",
            name: "Chañaral",
            communes: [
              {
                code: "03201",
                name: "Chañaral",
              },
              {
                code: "03202",
                name: "Diego de Almagro",
              },
            ],
          },
          {
            code: "8",
            name: "Copiapó",
            communes: [
              {
                code: "03102",
                name: "Caldera",
              },
              {
                code: "03101",
                name: "Copiapó",
              },
              {
                code: "03103",
                name: "Tierra Amarilla",
              },
            ],
          },
          {
            code: "10",
            name: "Huasco",
            communes: [
              {
                code: "03302",
                name: "Alto del Carmen",
              },
              {
                code: "03303",
                name: "Freirina",
              },
              {
                code: "03304",
                name: "Huasco",
              },
              {
                code: "03301",
                name: "Vallenar",
              },
            ],
          },
        ],
      },
      {
        code: "AI",
        name: "Aysén del General Carlos Ibañez del Campo",
        provinces: [
          {
            code: "42",
            name: "Aysén",
            communes: [
              {
                code: "11201",
                name: "Aysén",
              },
              {
                code: "11202",
                name: "Cisnes",
              },
              {
                code: "11203",
                name: "Guaitecas",
              },
            ],
          },
          {
            code: "43",
            name: "Capitán Prat",
            communes: [
              {
                code: "11301",
                name: "Cochrane",
              },
              {
                code: "11302",
                name: "O'Higgins",
              },
              {
                code: "11303",
                name: "Tortel",
              },
            ],
          },
          {
            code: "41",
            name: "Coyhaique",
            communes: [
              {
                code: "11101",
                name: "Coyhaique",
              },
              {
                code: "11102",
                name: "Lago Verde",
              },
            ],
          },
          {
            code: "44",
            name: "General Carrera",
            communes: [
              {
                code: "11401",
                name: "Chile Chico",
              },
              {
                code: "11402",
                name: "Río Ibáñez",
              },
            ],
          },
        ],
      },
      {
        code: "CO",
        name: "Coquimbo",
        provinces: [
          {
            code: "12",
            name: "Choapa",
            communes: [
              {
                code: "04202",
                name: "Canela",
              },
              {
                code: "04201",
                name: "Illapel",
              },
              {
                code: "04203",
                name: "Los Vilos",
              },
              {
                code: "04204",
                name: "Salamanca",
              },
            ],
          },
          {
            code: "11",
            name: "Elqui",
            communes: [
              {
                code: "04103",
                name: "Andacollo",
              },
              {
                code: "04102",
                name: "Coquimbo",
              },
              {
                code: "04104",
                name: "La Higuera",
              },
              {
                code: "04101",
                name: "La Serena",
              },
              {
                code: "04105",
                name: "Paiguano",
              },
              {
                code: "04106",
                name: "Vicuña",
              },
            ],
          },
          {
            code: "13",
            name: "Limarí",
            communes: [
              {
                code: "04302",
                name: "Combarbalá",
              },
              {
                code: "04303",
                name: "Monte Patria",
              },
              {
                code: "04301",
                name: "Ovalle",
              },
              {
                code: "04304",
                name: "Punitaqui",
              },
              {
                code: "04305",
                name: "Río Hurtado",
              },
            ],
          },
        ],
      },
      {
        code: "AR",
        name: "La Araucanía",
        provinces: [
          {
            code: "33",
            name: "Cautín",
            communes: [
              {
                code: "09102",
                name: "Carahue",
              },
              {
                code: "09121",
                name: "Cholchol",
              },
              {
                code: "09103",
                name: "Cunco",
              },
              {
                code: "09104",
                name: "Curarrehue",
              },
              {
                code: "09105",
                name: "Freire",
              },
              {
                code: "09106",
                name: "Galvarino",
              },
              {
                code: "09107",
                name: "Gorbea",
              },
              {
                code: "09108",
                name: "Lautaro",
              },
              {
                code: "09109",
                name: "Loncoche",
              },
              {
                code: "09110",
                name: "Melipeuco",
              },
              {
                code: "09111",
                name: "Nueva Imperial",
              },
              {
                code: "09112",
                name: "Padre Las Casas",
              },
              {
                code: "09113",
                name: "Perquenco",
              },
              {
                code: "09114",
                name: "Pitrufquén",
              },
              {
                code: "09115",
                name: "Pucón",
              },
              {
                code: "09116",
                name: "Saavedra",
              },
              {
                code: "09117",
                name: "Teodoro Schmidt",
              },
              {
                code: "09101",
                name: "Temuco",
              },
              {
                code: "09118",
                name: "Toltén",
              },
              {
                code: "09119",
                name: "Vilcún",
              },
              {
                code: "09120",
                name: "Villarrica",
              },
            ],
          },
          {
            code: "34",
            name: "Malleco",
            communes: [
              {
                code: "09201",
                name: "Angol",
              },
              {
                code: "09202",
                name: "Collipulli",
              },
              {
                code: "09203",
                name: "Curacautín",
              },
              {
                code: "09204",
                name: "Ercilla",
              },
              {
                code: "09205",
                name: "Lonquimay",
              },
              {
                code: "09206",
                name: "Los Sauces",
              },
              {
                code: "09207",
                name: "Lumaco",
              },
              {
                code: "09208",
                name: "Purén",
              },
              {
                code: "09209",
                name: "Renaico",
              },
              {
                code: "09210",
                name: "Traiguén",
              },
              {
                code: "09211",
                name: "Victoria",
              },
            ],
          },
        ],
      },
      {
        code: "LL",
        name: "Los Lagos",
        provinces: [
          {
            code: "38",
            name: "Chiloé",
            communes: [
              {
                code: "10202",
                name: "Ancud",
              },
              {
                code: "10201",
                name: "Castro",
              },
              {
                code: "10203",
                name: "Chonchi",
              },
              {
                code: "10204",
                name: "Curaco de Vélez",
              },
              {
                code: "10205",
                name: "Dalcahue",
              },
              {
                code: "10206",
                name: "Puqueldón",
              },
              {
                code: "10207",
                name: "Queilén",
              },
              {
                code: "10208",
                name: "Quellón",
              },
              {
                code: "10209",
                name: "Quemchi",
              },
              {
                code: "10210",
                name: "Quinchao",
              },
            ],
          },
          {
            code: "37",
            name: "Llanquihue",
            communes: [
              {
                code: "10102",
                name: "Calbuco",
              },
              {
                code: "10103",
                name: "Cochamó",
              },
              {
                code: "10104",
                name: "Fresia",
              },
              {
                code: "10105",
                name: "Frutillar",
              },
              {
                code: "10106",
                name: "Los Muermos",
              },
              {
                code: "10107",
                name: "Llanquihue",
              },
              {
                code: "10108",
                name: "Maullín",
              },
              {
                code: "10101",
                name: "Puerto Montt",
              },
              {
                code: "10109",
                name: "Puerto Varas",
              },
            ],
          },
          {
            code: "39",
            name: "Osorno",
            communes: [
              {
                code: "10301",
                name: "Osorno",
              },
              {
                code: "10302",
                name: "Puerto Octay",
              },
              {
                code: "10303",
                name: "Purranque",
              },
              {
                code: "10304",
                name: "Puyehue",
              },
              {
                code: "10305",
                name: "Río Negro",
              },
              {
                code: "10306",
                name: "San Juan de la Costa",
              },
              {
                code: "10307",
                name: "San Pablo",
              },
            ],
          },
          {
            code: "40",
            name: "Palena",
            communes: [
              {
                code: "10401",
                name: "Chaitén",
              },
              {
                code: "10402",
                name: "Futaleufú",
              },
              {
                code: "10403",
                name: "Hualaihué",
              },
              {
                code: "10404",
                name: "Palena",
              },
            ],
          },
        ],
      },
      {
        code: "LR",
        name: "Los Ríos",
        provinces: [
          {
            code: "36",
            name: "Ranco",
            communes: [
              {
                code: "14202",
                name: "Futrono",
              },
              {
                code: "14201",
                name: "La Unión",
              },
              {
                code: "14203",
                name: "Lago Ranco",
              },
              {
                code: "14204",
                name: "Río Bueno",
              },
            ],
          },
          {
            code: "35",
            name: "Valdivia",
            communes: [
              {
                code: "14102",
                name: "Corral",
              },
              {
                code: "14103",
                name: "Lanco",
              },
              {
                code: "14104",
                name: "Los Lagos",
              },
              {
                code: "14105",
                name: "Máfil",
              },
              {
                code: "14106",
                name: "Mariquina",
              },
              {
                code: "14107",
                name: "Paillaco",
              },
              {
                code: "14108",
                name: "Panguipulli",
              },
            ],
          },
        ],
      },
      {
        code: "MG",
        name: "Magallanes y de la Antártica Chilena",
        provinces: [
          {
            code: "46",
            name: "Antártica Chilena",
            communes: [
              {
                code: "12202",
                name: "Antártica",
              },
              {
                code: "12201",
                name: "Cabo de Hornos (Ex - Navarino)",
              },
            ],
          },
          {
            code: "45",
            name: "Magallanes",
            communes: [
              {
                code: "12102",
                name: "Laguna Blanca",
              },
              {
                code: "12101",
                name: "Punta Arenas",
              },
              {
                code: "12103",
                name: "Río Verde",
              },
              {
                code: "12104",
                name: "San Gregorio",
              },
            ],
          },
          {
            code: "47",
            name: "Tierra del Fuego",
            communes: [
              {
                code: "12301",
                name: "Porvenir",
              },
              {
                code: "12302",
                name: "Primavera",
              },
              {
                code: "12303",
                name: "Timaukel",
              },
            ],
          },
          {
            code: "48",
            name: "Última Esperanza",
            communes: [
              {
                code: "12401",
                name: "Natales",
              },
              {
                code: "12402",
                name: "Torres del Paine",
              },
            ],
          },
        ],
      },
      {
        code: "BI",
        name: "Región del Biobío",
        provinces: [
          {
            code: "30",
            name: "Arauco",
            communes: [
              {
                code: "08202",
                name: "Arauco",
              },
              {
                code: "08203",
                name: "Cañete",
              },
              {
                code: "08204",
                name: "Contulmo",
              },
              {
                code: "08205",
                name: "Curanilahue",
              },
              {
                code: "08201",
                name: "Lebu",
              },
              {
                code: "08206",
                name: "Los Álamos",
              },
              {
                code: "08207",
                name: "Tirúa",
              },
            ],
          },
          {
            code: "31",
            name: "Biobío",
            communes: [
              {
                code: "08314",
                name: "Alto Biobío",
              },
              {
                code: "08302",
                name: "Antuco",
              },
              {
                code: "08303",
                name: "Cabrero",
              },
              {
                code: "08304",
                name: "Laja",
              },
              {
                code: "08301",
                name: "Los Ángeles",
              },
              {
                code: "08305",
                name: "Mulchén",
              },
              {
                code: "08306",
                name: "Nacimiento",
              },
              {
                code: "08307",
                name: "Negrete",
              },
              {
                code: "08308",
                name: "Quilaco",
              },
              {
                code: "08309",
                name: "Quilleco",
              },
              {
                code: "08310",
                name: "San Rosendo",
              },
              {
                code: "08311",
                name: "Santa Bárbara",
              },
              {
                code: "08312",
                name: "Tucapel",
              },
              {
                code: "08313",
                name: "Yumbel",
              },
            ],
          },
          {
            code: "29",
            name: "Concepción",
            communes: [
              {
                code: "08103",
                name: "Chiguayante",
              },
              {
                code: "08101",
                name: "Concepción",
              },
              {
                code: "08102",
                name: "Coronel",
              },
              {
                code: "08104",
                name: "Florida",
              },
              {
                code: "08112",
                name: "Hualpén",
              },
              {
                code: "08105",
                name: "Hualqui",
              },
              {
                code: "08106",
                name: "Lota",
              },
              {
                code: "08107",
                name: "Penco",
              },
              {
                code: "08108",
                name: "San Pedro de la Paz",
              },
              {
                code: "08109",
                name: "Santa Juana",
              },
              {
                code: "08110",
                name: "Talcahuano",
              },
              {
                code: "08111",
                name: "Tomé",
              },
            ],
          },
          {
            code: "32",
            name: "Ñuble",
            communes: [
              {
                code: "08402",
                name: "Bulnes",
              },
              {
                code: "08401",
                name: "Chillán",
              },
              {
                code: "08406",
                name: "Chillán Viejo",
              },
              {
                code: "08403",
                name: "Cobquecura",
              },
              {
                code: "08404",
                name: "Coelemu",
              },
              {
                code: "08405",
                name: "Coihueco",
              },
              {
                code: "08407",
                name: "El Carmen",
              },
              {
                code: "08408",
                name: "Ninhue",
              },
              {
                code: "08409",
                name: "Ñiquén",
              },
              {
                code: "08410",
                name: "Pemuco",
              },
              {
                code: "08411",
                name: "Pinto",
              },
              {
                code: "08412",
                name: "Portezuelo",
              },
              {
                code: "08413",
                name: "Quillón",
              },
              {
                code: "08414",
                name: "Quirihue",
              },
              {
                code: "08415",
                name: "Ránquil",
              },
              {
                code: "08416",
                name: "San Carlos",
              },
              {
                code: "08417",
                name: "San Fabián",
              },
              {
                code: "08418",
                name: "San Ignacio",
              },
              {
                code: "08419",
                name: "San Nicolás",
              },
              {
                code: "08420",
                name: "Treguaco",
              },
              {
                code: "08421",
                name: "Yungay",
              },
            ],
          },
        ],
      },
      {
        code: "OH",
        name: "Región del Libertador General Bernardo O'Higgins",
        provinces: [
          {
            code: "22",
            name: "Cachapoal",
            communes: [
              {
                code: "06102",
                name: "Codegua",
              },
              {
                code: "06103",
                name: "Coinco",
              },
              {
                code: "06104",
                name: "Coltauco",
              },
              {
                code: "06105",
                name: "Doñihue",
              },
              {
                code: "06106",
                name: "Graneros",
              },
              {
                code: "06107",
                name: "Las Cabras",
              },
              {
                code: "06108",
                name: "Machalí",
              },
              {
                code: "06109",
                name: "Malloa",
              },
              {
                code: "06110",
                name: "Mostazal",
              },
              {
                code: "06111",
                name: "Olivar",
              },
              {
                code: "06112",
                name: "Peumo",
              },
              {
                code: "06113",
                name: "Pichidegua",
              },
              {
                code: "06114",
                name: "Quinta de Tilcoco",
              },
              {
                code: "06101",
                name: "Rancagua",
              },
              {
                code: "06115",
                name: "Rengo",
              },
              {
                code: "06116",
                name: "Requínoa",
              },
              {
                code: "06117",
                name: "San Vicente",
              },
            ],
          },
          {
            code: "23",
            name: "Cardenal Caro",
            communes: [
              {
                code: "06202",
                name: "La Estrella",
              },
              {
                code: "06203",
                name: "Litueche",
              },
              {
                code: "06204",
                name: "Marchihue",
              },
              {
                code: "06205",
                name: "Navidad",
              },
              {
                code: "06206",
                name: "Paredones",
              },
              {
                code: "06201",
                name: "Pichilemu",
              },
            ],
          },
          {
            code: "24",
            name: "Colchagua",
            communes: [
              {
                code: "06302",
                name: "Chépica",
              },
              {
                code: "06303",
                name: "Chimbarongo",
              },
              {
                code: "06304",
                name: "Lolol",
              },
              {
                code: "06305",
                name: "Nancagua",
              },
              {
                code: "06306",
                name: "Palmilla",
              },
              {
                code: "06307",
                name: "Peralillo",
              },
              {
                code: "06308",
                name: "Placilla",
              },
              {
                code: "06309",
                name: "Pumanque",
              },
              {
                code: "06301",
                name: "San Fernando",
              },
              {
                code: "06310",
                name: "Santa Cruz",
              },
            ],
          },
        ],
      },
      {
        code: "MA",
        name: "Región del Maule",
        provinces: [
          {
            code: "26",
            name: "Cauquenes",
            communes: [
              {
                code: "07201",
                name: "Cauquenes",
              },
              {
                code: "07202",
                name: "Chanco",
              },
              {
                code: "07203",
                name: "Pelluhue",
              },
            ],
          },
          {
            code: "27",
            name: "Curicó",
            communes: [
              {
                code: "07301",
                name: "Curicó",
              },
              {
                code: "07302",
                name: "Hualañé",
              },
              {
                code: "07303",
                name: "Licantén",
              },
              {
                code: "07304",
                name: "Molina",
              },
              {
                code: "07305",
                name: "Rauco",
              },
              {
                code: "07306",
                name: "Romeral",
              },
              {
                code: "07307",
                name: "Sagrada Familia",
              },
              {
                code: "07308",
                name: "Teno",
              },
              {
                code: "07309",
                name: "Vichuquén",
              },
            ],
          },
          {
            code: "28",
            name: "Linares",
            communes: [
              {
                code: "07402",
                name: "Colbún",
              },
              {
                code: "07401",
                name: "Linares",
              },
              {
                code: "07403",
                name: "Longaví",
              },
              {
                code: "07404",
                name: "Parral",
              },
              {
                code: "07405",
                name: "Retiro",
              },
              {
                code: "07406",
                name: "San Javier",
              },
              {
                code: "07407",
                name: "Villa Alegre",
              },
              {
                code: "07408",
                name: "Yerbas Buenas",
              },
            ],
          },
          {
            code: "25",
            name: "Talca",
            communes: [
              {
                code: "07102",
                name: "Constitución",
              },
              {
                code: "07103",
                name: "Curepto",
              },
              {
                code: "07104",
                name: "Empedrado",
              },
              {
                code: "07105",
                name: "Maule",
              },
              {
                code: "07106",
                name: "Pelarco",
              },
              {
                code: "07107",
                name: "Pencahue",
              },
              {
                code: "07108",
                name: "Río Claro",
              },
              {
                code: "07109",
                name: "San Clemente",
              },
              {
                code: "07110",
                name: "San Rafael",
              },
              {
                code: "07101",
                name: "Talca",
              },
            ],
          },
        ],
      },
      {
        code: "RM",
        name: "Región Metropolitana de Santiago",
        provinces: [
          {
            code: "49",
            name: "Santiago",
            communes: [
              {
                code: "13102",
                name: "Cerrillos",
              },
              {
                code: "13103",
                name: "Cerro Navia",
              },
              {
                code: "13104",
                name: "Conchalí",
              },
              {
                code: "13105",
                name: "El Bosque",
              },
              {
                code: "13106",
                name: "Estación Central",
              },
              {
                code: "13107",
                name: "Huechuraba",
              },
              {
                code: "13108",
                name: "Independencia",
              },
              {
                code: "13109",
                name: "La Cisterna",
              },
              {
                code: "13110",
                name: "La Florida",
              },
              {
                code: "13111",
                name: "La Granja",
              },
              {
                code: "13112",
                name: "La Pintana",
              },
              {
                code: "13113",
                name: "La Reina",
              },
              {
                code: "13114",
                name: "Las Condes",
              },
              {
                code: "13115",
                name: "Lo Barnechea",
              },
              {
                code: "13116",
                name: "Lo Espejo",
              },
              {
                code: "13117",
                name: "Lo Prado",
              },
              {
                code: "13118",
                name: "Macul",
              },
              {
                code: "13119",
                name: "Maipú",
              },
              {
                code: "13120",
                name: "Ñuñoa",
              },
              {
                code: "13121",
                name: "Pedro Aguirre Cerda",
              },
              {
                code: "13122",
                name: "Peñalolén",
              },
              {
                code: "13123",
                name: "Providencia",
              },
              {
                code: "13124",
                name: "Pudahuel",
              },
              {
                code: "13125",
                name: "Quilicura",
              },
              {
                code: "13126",
                name: "Quinta Normal",
              },
              {
                code: "13127",
                name: "Recoleta",
              },
              {
                code: "13128",
                name: "Renca",
              },
              {
                code: "13129",
                name: "San Joaquín",
              },
              {
                code: "13130",
                name: "San Miguel",
              },
              {
                code: "13131",
                name: "San Ramón",
              },
              {
                code: "13101",
                name: "Santiago",
              },
              {
                code: "13132",
                name: "Vitacura",
              },
            ],
          },
          {
            code: "50",
            name: "Cordillera",
            communes: [
              {
                code: "13202",
                name: "Pirque",
              },
              {
                code: "13201",
                name: "Puente Alto",
              },
              {
                code: "13203",
                name: "San José de Maipo",
              },
            ],
          },
          {
            code: "51",
            name: "Chacabuco",
            communes: [
              {
                code: "13301",
                name: "Colina",
              },
              {
                code: "13302",
                name: "Lampa",
              },
              {
                code: "13303",
                name: "Tiltil",
              },
            ],
          },
          {
            code: "52",
            name: "Maipo",
            communes: [
              {
                code: "13402",
                name: "Buin",
              },
              {
                code: "13403",
                name: "Calera de Tango",
              },
              {
                code: "13404",
                name: "Paine",
              },
              {
                code: "13401",
                name: "San Bernardo",
              },
            ],
          },
          {
            code: "53",
            name: "Melipilla",
            communes: [
              {
                code: "13502",
                name: "Alhué",
              },
              {
                code: "13503",
                name: "Curacaví",
              },
              {
                code: "13504",
                name: "María Pinto",
              },
              {
                code: "13501",
                name: "Melipilla",
              },
              {
                code: "13505",
                name: "San Pedro",
              },
            ],
          },
          {
            code: "54",
            name: "Talagante",
            communes: [
              {
                code: "13602",
                name: "El Monte",
              },
              {
                code: "13603",
                name: "Isla de Maipo",
              },
              {
                code: "13604",
                name: "Padre Hurtado",
              },
              {
                code: "13605",
                name: "Peñaflor",
              },
              {
                code: "13601",
                name: "Talagante",
              },
            ],
          },
        ],
      },
      {
        code: "TA",
        name: "Tarapacá",
        provinces: [
          {
            code: "3",
            name: "Iquique",
            communes: [
              {
                code: "01107",
                name: "Alto Hospicio",
              },
              {
                code: "01101",
                name: "Iquique",
              },
            ],
          },
          {
            code: "4",
            name: "Tamagural",
            communes: [
              {
                code: "01402",
                name: "Camiña",
              },
              {
                code: "01403",
                name: "Colchane",
              },
              {
                code: "01404",
                name: "Huara",
              },
              {
                code: "01405",
                name: "Pica",
              },
              {
                code: "01401",
                name: "Pozo Almonte",
              },
            ],
          },
        ],
      },
      {
        code: "VA",
        name: "Valparaíso",
        provinces: [
          {
            code: "15",
            name: "Isla de Pascua",
            communes: [
              {
                code: "05201",
                name: "Isla de Pascua",
              },
            ],
          },
          {
            code: "16",
            name: "Los Andes",
            communes: [
              {
                code: "05302",
                name: "Calle Larga",
              },
              {
                code: "05301",
                name: "Los Andes",
              },
              {
                code: "05303",
                name: "Rinconada",
              },
              {
                code: "05304",
                name: "San Esteban",
              },
            ],
          },
          {
            code: "21",
            name: "Marga Marga",
            communes: [
              {
                code: "05802",
                name: "Limache",
              },
              {
                code: "05803",
                name: "Olmué",
              },
              {
                code: "05801",
                name: "Quilpué",
              },
              {
                code: "05804",
                name: "Villa Alemana",
              },
            ],
          },
          {
            code: "17",
            name: "Petorca",
            communes: [
              {
                code: "05402",
                name: "Cabildo",
              },
              {
                code: "05401",
                name: "La Ligua",
              },
              {
                code: "05403",
                name: "Papudo",
              },
              {
                code: "05404",
                name: "Petorca",
              },
              {
                code: "05405",
                name: "Zapallar",
              },
            ],
          },
          {
            code: "18",
            name: "Quillota",
            communes: [
              {
                code: "05502",
                name: "Calera",
              },
              {
                code: "05503",
                name: "Hijuelas",
              },
              {
                code: "05504",
                name: "La Cruz",
              },
              {
                code: "05506",
                name: "Nogales",
              },
              {
                code: "05501",
                name: "Quillota",
              },
            ],
          },
          {
            code: "19",
            name: "San Antonio",
            communes: [
              {
                code: "05602",
                name: "Algarrobo",
              },
              {
                code: "05603",
                name: "Cartagena",
              },
              {
                code: "05605",
                name: "El Tabo",
              },
              {
                code: "05604",
                name: "El Quisco",
              },
              {
                code: "05601",
                name: "San Antonio",
              },
              {
                code: "05606",
                name: "Santo Domingo",
              },
            ],
          },
          {
            code: "20",
            name: "San Felipe de Aconcagua",
            communes: [
              {
                code: "05702",
                name: "Catemu",
              },
              {
                code: "05703",
                name: "Llaillay",
              },
              {
                code: "05704",
                name: "Panquehue",
              },
              {
                code: "05705",
                name: "Putaendo",
              },
              {
                code: "05701",
                name: "San Felipe",
              },
              {
                code: "05706",
                name: "Santa María",
              },
            ],
          },
          {
            code: "14",
            name: "Valparaíso",
            communes: [
              {
                code: "05102",
                name: "Casablanca",
              },
              {
                code: "05103",
                name: "Concón",
              },
              {
                code: "05104",
                name: "Juan Fernández",
              },
              {
                code: "05105",
                name: "Puchuncaví",
              },
              {
                code: "05107",
                name: "Quintero",
              },
              {
                code: "05101",
                name: "Valparaíso",
              },
              {
                code: "05109",
                name: "Viña del Mar",
              },
            ],
          },
        ],
      },
      {
        code: "OP",
        name: "Otro País",
      },
    ],
  },
  {
    name: "China",
    dial_code: "+86",
    code: "CN",
  },
  {
    name: "Christmas Island",
    dial_code: "+61",
    code: "CX",
  },
  {
    name: "Cocos (Keeling) Islands",
    dial_code: "+61",
    code: "CC",
  },
  {
    name: "Colombia",
    dial_code: "+57",
    code: "CO",
  },
  {
    name: "Comoros",
    dial_code: "+269",
    code: "KM",
  },
  {
    name: "Congo",
    dial_code: "+242",
    code: "CG",
  },
  {
    name: "Congo, The Democratic Republic of the",
    dial_code: "+243",
    code: "CD",
  },
  {
    name: "Cook Islands",
    dial_code: "+682",
    code: "CK",
  },
  {
    name: "Costa Rica",
    dial_code: "+506",
    code: "CR",
  },
  {
    name: "Cote d'Ivoire",
    dial_code: "+225",
    code: "CI",
  },
  {
    name: "Croatia",
    dial_code: "+385",
    code: "HR",
  },
  {
    name: "Cuba",
    dial_code: "+53",
    code: "CU",
  },
  {
    name: "Cyprus",
    dial_code: "+537",
    code: "CY",
  },
  {
    name: "Czech Republic",
    dial_code: "+420",
    code: "CZ",
  },
  {
    name: "Denmark",
    dial_code: "+45",
    code: "DK",
  },
  {
    name: "Djibouti",
    dial_code: "+253",
    code: "DJ",
  },
  {
    name: "Dominica",
    dial_code: "+1767",
    code: "DM",
  },
  {
    name: "Dominican Republic",
    dial_code: "+1849",
    code: "DO",
  },
  {
    name: "Ecuador",
    dial_code: "+593",
    code: "EC",
  },
  {
    name: "Egypt",
    dial_code: "+20",
    code: "EG",
  },
  {
    name: "El Salvador",
    dial_code: "+503",
    code: "SV",
  },
  {
    name: "Equatorial Guinea",
    dial_code: "+240",
    code: "GQ",
  },
  {
    name: "Eritrea",
    dial_code: "+291",
    code: "ER",
  },
  {
    name: "Estonia",
    dial_code: "+372",
    code: "EE",
  },
  {
    name: "Ethiopia",
    dial_code: "+251",
    code: "ET",
  },
  {
    name: "Falkland Islands (Malvinas)",
    dial_code: "+500",
    code: "FK",
  },
  {
    name: "Faroe Islands",
    dial_code: "+298",
    code: "FO",
  },
  {
    name: "Fiji",
    dial_code: "+679",
    code: "FJ",
  },
  {
    name: "Finland",
    dial_code: "+358",
    code: "FI",
  },
  {
    name: "France",
    dial_code: "+33",
    code: "FR",
  },
  {
    name: "French Guiana",
    dial_code: "+594",
    code: "GF",
  },
  {
    name: "French Polynesia",
    dial_code: "+689",
    code: "PF",
  },
  {
    name: "Gabon",
    dial_code: "+241",
    code: "GA",
  },
  {
    name: "Gambia",
    dial_code: "+220",
    code: "GM",
  },
  {
    name: "Georgia",
    dial_code: "+995",
    code: "GE",
  },
  {
    name: "Germany",
    dial_code: "+49",
    code: "DE",
  },
  {
    name: "Ghana",
    dial_code: "+233",
    code: "GH",
  },
  {
    name: "Gibraltar",
    dial_code: "+350",
    code: "GI",
  },
  {
    name: "Greece",
    dial_code: "+30",
    code: "GR",
  },
  {
    name: "Greenland",
    dial_code: "+299",
    code: "GL",
  },
  {
    name: "Grenada",
    dial_code: "+1473",
    code: "GD",
  },
  {
    name: "Guadeloupe",
    dial_code: "+590",
    code: "GP",
  },
  {
    name: "Guam",
    dial_code: "+1671",
    code: "GU",
  },
  {
    name: "Guatemala",
    dial_code: "+502",
    code: "GT",
  },
  {
    name: "Guernsey",
    dial_code: "+44",
    code: "GG",
  },
  {
    name: "Guinea",
    dial_code: "+224",
    code: "GN",
  },
  {
    name: "Guinea-Bissau",
    dial_code: "+245",
    code: "GW",
  },
  {
    name: "Guyana",
    dial_code: "+595",
    code: "GY",
  },
  {
    name: "Haiti",
    dial_code: "+509",
    code: "HT",
  },
  {
    name: "Holy See (Vatican City State)",
    dial_code: "+379",
    code: "VA",
  },
  {
    name: "Honduras",
    dial_code: "+504",
    code: "HN",
  },
  {
    name: "Hong Kong",
    dial_code: "+852",
    code: "HK",
  },
  {
    name: "Hungary",
    dial_code: "+36",
    code: "HU",
  },
  {
    name: "Iceland",
    dial_code: "+354",
    code: "IS",
  },
  {
    name: "India",
    dial_code: "+91",
    code: "IN",
  },
  {
    name: "Indonesia",
    dial_code: "+62",
    code: "ID",
  },
  {
    name: "Iran, Islamic Republic of",
    dial_code: "+98",
    code: "IR",
  },
  {
    name: "Iraq",
    dial_code: "+964",
    code: "IQ",
  },
  {
    name: "Ireland",
    dial_code: "+353",
    code: "IE",
  },
  {
    name: "Isle of Man",
    dial_code: "+44",
    code: "IM",
  },
  {
    name: "Israel",
    dial_code: "+972",
    code: "IL",
  },
  {
    name: "Italy",
    dial_code: "+39",
    code: "IT",
  },
  {
    name: "Jamaica",
    dial_code: "+1876",
    code: "JM",
  },
  {
    name: "Japan",
    dial_code: "+81",
    code: "JP",
  },
  {
    name: "Jersey",
    dial_code: "+44",
    code: "JE",
  },
  {
    name: "Jordan",
    dial_code: "+962",
    code: "JO",
  },
  {
    name: "Kazakhstan",
    dial_code: "+77",
    code: "KZ",
  },
  {
    name: "Kenya",
    dial_code: "+254",
    code: "KE",
  },
  {
    name: "Kiribati",
    dial_code: "+686",
    code: "KI",
  },
  {
    name: "Korea, Democratic People's Republic of",
    dial_code: "+850",
    code: "KP",
  },
  {
    name: "Korea, Republic of",
    dial_code: "+82",
    code: "KR",
  },
  {
    name: "Kuwait",
    dial_code: "+965",
    code: "KW",
  },
  {
    name: "Kyrgyzstan",
    dial_code: "+996",
    code: "KG",
  },
  {
    name: "Lao People's Democratic Republic",
    dial_code: "+856",
    code: "LA",
  },
  {
    name: "Latvia",
    dial_code: "+371",
    code: "LV",
  },
  {
    name: "Lebanon",
    dial_code: "+961",
    code: "LB",
  },
  {
    name: "Lesotho",
    dial_code: "+266",
    code: "LS",
  },
  {
    name: "Liberia",
    dial_code: "+231",
    code: "LR",
  },
  {
    name: "Libyan Arab Jamahiriya",
    dial_code: "+218",
    code: "LY",
  },
  {
    name: "Liechtenstein",
    dial_code: "+423",
    code: "LI",
  },
  {
    name: "Lithuania",
    dial_code: "+370",
    code: "LT",
  },
  {
    name: "Luxembourg",
    dial_code: "+352",
    code: "LU",
  },
  {
    name: "Macao",
    dial_code: "+853",
    code: "MO",
  },
  {
    name: "Macedonia, The Former Yugoslav Republic of",
    dial_code: "+389",
    code: "MK",
  },
  {
    name: "Madagascar",
    dial_code: "+261",
    code: "MG",
  },
  {
    name: "Malawi",
    dial_code: "+265",
    code: "MW",
  },
  {
    name: "Malaysia",
    dial_code: "+60",
    code: "MY",
  },
  {
    name: "Maldives",
    dial_code: "+960",
    code: "MV",
  },
  {
    name: "Mali",
    dial_code: "+223",
    code: "ML",
  },
  {
    name: "Malta",
    dial_code: "+356",
    code: "MT",
  },
  {
    name: "Marshall Islands",
    dial_code: "+692",
    code: "MH",
  },
  {
    name: "Martinique",
    dial_code: "+596",
    code: "MQ",
  },
  {
    name: "Mauritania",
    dial_code: "+222",
    code: "MR",
  },
  {
    name: "Mauritius",
    dial_code: "+230",
    code: "MU",
  },
  {
    name: "Mayotte",
    dial_code: "+262",
    code: "YT",
  },
  {
    name: "Mexico",
    dial_code: "+52",
    code: "MX",
  },
  {
    name: "Micronesia, Federated States of",
    dial_code: "+691",
    code: "FM",
  },
  {
    name: "Moldova, Republic of",
    dial_code: "+373",
    code: "MD",
  },
  {
    name: "Monaco",
    dial_code: "+377",
    code: "MC",
  },
  {
    name: "Mongolia",
    dial_code: "+976",
    code: "MN",
  },
  {
    name: "Montenegro",
    dial_code: "+382",
    code: "ME",
  },
  {
    name: "Montserrat",
    dial_code: "+1664",
    code: "MS",
  },
  {
    name: "Morocco",
    dial_code: "+212",
    code: "MA",
  },
  {
    name: "Mozambique",
    dial_code: "+258",
    code: "MZ",
  },
  {
    name: "Myanmar",
    dial_code: "+95",
    code: "MM",
  },
  {
    name: "Namibia",
    dial_code: "+264",
    code: "NA",
  },
  {
    name: "Nauru",
    dial_code: "+674",
    code: "NR",
  },
  {
    name: "Nepal",
    dial_code: "+977",
    code: "NP",
  },
  {
    name: "Netherlands",
    dial_code: "+31",
    code: "NL",
  },
  {
    name: "Netherlands Antilles",
    dial_code: "+599",
    code: "AN",
  },
  {
    name: "New Caledonia",
    dial_code: "+687",
    code: "NC",
  },
  {
    name: "New Zealand",
    dial_code: "+64",
    code: "NZ",
  },
  {
    name: "Nicaragua",
    dial_code: "+505",
    code: "NI",
  },
  {
    name: "Niger",
    dial_code: "+227",
    code: "NE",
  },
  {
    name: "Nigeria",
    dial_code: "+234",
    code: "NG",
  },
  {
    name: "Niue",
    dial_code: "+683",
    code: "NU",
  },
  {
    name: "Norfolk Island",
    dial_code: "+672",
    code: "NF",
  },
  {
    name: "Northern Mariana Islands",
    dial_code: "+1670",
    code: "MP",
  },
  {
    name: "Norway",
    dial_code: "+47",
    code: "NO",
  },
  {
    name: "Oman",
    dial_code: "+968",
    code: "OM",
  },
  {
    name: "Pakistan",
    dial_code: "+92",
    code: "PK",
  },
  {
    name: "Palau",
    dial_code: "+680",
    code: "PW",
  },
  {
    name: "Palestinian Territory, Occupied",
    dial_code: "+970",
    code: "PS",
  },
  {
    name: "Panama",
    dial_code: "+507",
    code: "PA",
  },
  {
    name: "Papua New Guinea",
    dial_code: "+675",
    code: "PG",
  },
  {
    name: "Paraguay",
    dial_code: "+595",
    code: "PY",
  },
  {
    name: "Peru",
    dial_code: "+51",
    code: "PE",
  },
  {
    name: "Philippines",
    dial_code: "+63",
    code: "PH",
  },
  {
    name: "Pitcairn",
    dial_code: "+872",
    code: "PN",
  },
  {
    name: "Poland",
    dial_code: "+48",
    code: "PL",
  },
  {
    name: "Portugal",
    dial_code: "+351",
    code: "PT",
  },
  {
    name: "Puerto Rico",
    dial_code: "+1939",
    code: "PR",
  },
  {
    name: "Qatar",
    dial_code: "+974",
    code: "QA",
  },
  {
    name: "Romania",
    dial_code: "+40",
    code: "RO",
  },
  {
    name: "Russia",
    dial_code: "+7",
    code: "RU",
  },
  {
    name: "Rwanda",
    dial_code: "+250",
    code: "RW",
  },
  {
    name: "Reunión",
    dial_code: "+262",
    code: "RE",
  },
  {
    name: "Saint Barthelemy",
    dial_code: "+590",
    code: "BL",
  },
  {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    dial_code: "+290",
    code: "SH",
  },
  {
    name: "Saint Kitts and Nevis",
    dial_code: "+1869",
    code: "KN",
  },
  {
    name: "Saint Lucia",
    dial_code: "+1758",
    code: "LC",
  },
  {
    name: "Saint Martin",
    dial_code: "+590",
    code: "MF",
  },
  {
    name: "Saint Pierre and Miquelon",
    dial_code: "+508",
    code: "PM",
  },
  {
    name: "Saint Vincent and the Grenadines",
    dial_code: "+1784",
    code: "VC",
  },
  {
    name: "Samoa",
    dial_code: "+685",
    code: "WS",
  },
  {
    name: "San Marino",
    dial_code: "+378",
    code: "SM",
  },
  {
    name: "Sao Tome and Principe",
    dial_code: "+239",
    code: "ST",
  },
  {
    name: "Saudi Arabia",
    dial_code: "+966",
    code: "SA",
  },
  {
    name: "Senegal",
    dial_code: "+221",
    code: "SN",
  },
  {
    name: "Serbia",
    dial_code: "+381",
    code: "RS",
  },
  {
    name: "Seychelles",
    dial_code: "+248",
    code: "SC",
  },
  {
    name: "Sierra Leone",
    dial_code: "+232",
    code: "SL",
  },
  {
    name: "Singapore",
    dial_code: "+65",
    code: "SG",
  },
  {
    name: "Slovakia",
    dial_code: "+421",
    code: "SK",
  },
  {
    name: "Slovenia",
    dial_code: "+386",
    code: "SI",
  },
  {
    name: "Solomon Islands",
    dial_code: "+677",
    code: "SB",
  },
  {
    name: "Somalia",
    dial_code: "+252",
    code: "SO",
  },
  {
    name: "South Africa",
    dial_code: "+27",
    code: "ZA",
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    dial_code: "+500",
    code: "GS",
  },
  {
    name: "Spain",
    dial_code: "+34",
    code: "ES",
  },
  {
    name: "Sri Lanka",
    dial_code: "+94",
    code: "LK",
  },
  {
    name: "Sudan",
    dial_code: "+249",
    code: "SD",
  },
  {
    name: "Suriname",
    dial_code: "+597",
    code: "SR",
  },
  {
    name: "Svalbard and Jan Mayen",
    dial_code: "+47",
    code: "SJ",
  },
  {
    name: "Swaziland",
    dial_code: "+268",
    code: "SZ",
  },
  {
    name: "Sweden",
    dial_code: "+46",
    code: "SE",
  },
  {
    name: "Switzerland",
    dial_code: "+41",
    code: "CH",
  },
  {
    name: "Syrian Arab Republic",
    dial_code: "+963",
    code: "SY",
  },
  {
    name: "Taiwan, Province of China",
    dial_code: "+886",
    code: "TW",
  },
  {
    name: "Tajikistan",
    dial_code: "+992",
    code: "TJ",
  },
  {
    name: "Tanzania, United Republic of",
    dial_code: "+255",
    code: "TZ",
  },
  {
    name: "Thailand",
    dial_code: "+66",
    code: "TH",
  },
  {
    name: "Timor-Leste",
    dial_code: "+670",
    code: "TL",
  },
  {
    name: "Togo",
    dial_code: "+228",
    code: "TG",
  },
  {
    name: "Tokelau",
    dial_code: "+690",
    code: "TK",
  },
  {
    name: "Tonga",
    dial_code: "+676",
    code: "TO",
  },
  {
    name: "Trinidad and Tobago",
    dial_code: "+1868",
    code: "TT",
  },
  {
    name: "Tunisia",
    dial_code: "+216",
    code: "TN",
  },
  {
    name: "Turkey",
    dial_code: "+90",
    code: "TR",
  },
  {
    name: "Turkmenistan",
    dial_code: "+993",
    code: "TM",
  },
  {
    name: "Turks and Caicos Islands",
    dial_code: "+1649",
    code: "TC",
  },
  {
    name: "Tuvalu",
    dial_code: "+688",
    code: "TV",
  },
  {
    name: "Uganda",
    dial_code: "+256",
    code: "UG",
  },
  {
    name: "Ukraine",
    dial_code: "+380",
    code: "UA",
  },
  {
    name: "United Arab Emirates",
    dial_code: "+971",
    code: "AE",
  },
  {
    name: "United Kingdom",
    dial_code: "+44",
    code: "GB",
  },
  {
    name: "United States",
    dial_code: "+1",
    code: "US",
  },
  {
    name: "Uruguay",
    dial_code: "+598",
    code: "UY",
  },
  {
    name: "Uzbekistan",
    dial_code: "+998",
    code: "UZ",
  },
  {
    name: "Vanuatu",
    dial_code: "+678",
    code: "VU",
  },
  {
    name: "Venezuela, Bolivarian Republic of",
    dial_code: "+58",
    code: "VE",
  },
  {
    name: "Viet Nam",
    dial_code: "+84",
    code: "VN",
  },
  {
    name: "Virgin Islands, British",
    dial_code: "+1284",
    code: "VG",
  },
  {
    name: "Virgin Islands, U.S.",
    dial_code: "+1340",
    code: "VI",
  },
  {
    name: "Wallis and Futuna",
    dial_code: "+681",
    code: "WF",
  },
  {
    name: "Yemen",
    dial_code: "+967",
    code: "YE",
  },
  {
    name: "Zambia",
    dial_code: "+260",
    code: "ZM",
  },
  {
    name: "Zimbabwe",
    dial_code: "+263",
    code: "ZW",
  },
  {
    name: "Finland Islands",
    dial_code: "+358",
    code: "AX",
  },
];

function findCommuneCodeByName(
  countryName: string,
  regionName: string,
  provinceName: string,
  communeName: string
): string | undefined {
  const country = Countries.find((c) => c.name === countryName);
  if (!country) {
    return undefined;
  }

  const region = country.regions?.find((r) => r.name === regionName);
  if (!region) {
    return undefined;
  }

  const province = region.provinces?.find((p) => p.name === provinceName);
  if (!province) {
    return undefined;
  }

  const commune = province.communes.find((c) => c.name === communeName);
  return commune?.code;
}

export default findCommuneCodeByName;
