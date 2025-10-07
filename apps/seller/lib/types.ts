export enum Category {
  Coffee = "COFFEE",
  Cocoa = "COCOA",
}

export enum ListingType {
  // AUCTION = "Auction",
  BUY_NOW = "Buy Now",
}

export enum UnitOfMeasure {
  Gram = "g",
  Kilogram = "kg",
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  is_active: boolean;
  origin: CountryCode;
  unit_of_measure: UnitOfMeasure;
  minimum_bid_price_per_unit: number;
  listing_type: ListingType;
  price_per_unit: number;
  quantity_available: number;
  discount: number;
  size: number;
}

export interface FutureProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  rating: number;
  inStock: boolean;
  origin: string;
  weight: string;
  tags: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "processing" | "succeeded" | "failed" | "cancelled";
  orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  currency: string;
  paymentIntentId?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  category: "coffee" | "cocoa";
  origin: string;
  weight: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: "card" | "paypal" | "bank";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentIntentId?: string;
  shippingMethod: string;
  specialInstructions?: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}

export enum CountryCode {
  Andorra = "AD",
  UnitedArabEmirates = "AE",
  Afghanistan = "AF",
  AntiguaAndBarbuda = "AG",
  Anguilla = "AI",
  Albania = "AL",
  Armenia = "AM",
  Angola = "AO",
  Antarctica = "AQ",
  Argentina = "AR",
  AmericanSamoa = "AS",
  Austria = "AT",
  Australia = "AU",
  Aruba = "AW",
  AlandIslands = "AX",
  Azerbaijan = "AZ",
  BosniaAndHerzegovina = "BA",
  Barbados = "BB",
  Bangladesh = "BD",
  Belgium = "BE",
  BurkinaFaso = "BF",
  Bulgaria = "BG",
  Bahrain = "BH",
  Burundi = "BI",
  Benin = "BJ",
  SaintBarthelemy = "BL",
  Bermuda = "BM",
  BruneiDarussalam = "BN",
  Bolivia = "BO",
  Bonaire = "BQ",
  Brazil = "BR",
  Bahamas = "BS",
  Bhutan = "BT",
  BouvetIsland = "BV",
  Botswana = "BW",
  Belarus = "BY",
  Belize = "BZ",
  Canada = "CA",
  CocosIslands = "CC",
  CongoDemocraticRepublic = "CD",
  CentralAfricanRepublic = "CF",
  Congo = "CG",
  Switzerland = "CH",
  CoteDIvoire = "CI",
  CookIslands = "CK",
  Chile = "CL",
  Cameroon = "CM",
  China = "CN",
  Colombia = "CO",
  CostaRica = "CR",
  Cuba = "CU",
  CaboVerde = "CV",
  Curacao = "CW",
  ChristmasIsland = "CX",
  Cyprus = "CY",
  Czechia = "CZ",
  Germany = "DE",
  Djibouti = "DJ",
  Denmark = "DK",
  Dominica = "DM",
  DominicanRepublic = "DO",
  Algeria = "DZ",
  Ecuador = "EC",
  Estonia = "EE",
  Egypt = "EG",
  WesternSahara = "EH",
  Eritrea = "ER",
  Spain = "ES",
  Ethiopia = "ET",
  Finland = "FI",
  Fiji = "FJ",
  FalklandIslands = "FK",
  Micronesia = "FM",
  FaroeIslands = "FO",
  France = "FR",
  Gabon = "GA",
  UnitedKingdom = "GB",
  Grenada = "GD",
  Georgia = "GE",
  FrenchGuiana = "GF",
  Guernsey = "GG",
  Ghana = "GH",
  Gibraltar = "GI",
  Greenland = "GL",
  Gambia = "GM",
  Guinea = "GN",
  Guadeloupe = "GP",
  EquatorialGuinea = "GQ",
  Greece = "GR",
  SouthGeorgiaAndSouthSandwichIslands = "GS",
  Guatemala = "GT",
  Guam = "GU",
  GuineaBissau = "GW",
  Guyana = "GY",
  HongKong = "HK",
  HeardIslandAndMcdonaldIslands = "HM",
  Honduras = "HN",
  Croatia = "HR",
  Haiti = "HT",
  Hungary = "HU",
  Indonesia = "ID",
  Ireland = "IE",
  Israel = "IL",
  IsleOfMan = "IM",
  India = "IN",
  BritishIndianOceanTerritory = "IO",
  Iraq = "IQ",
  Iran = "IR",
  Iceland = "IS",
  Italy = "IT",
  Jersey = "JE",
  Jamaica = "JM",
  Jordan = "JO",
  Japan = "JP",
  Kenya = "KE",
  Kyrgyzstan = "KG",
  Cambodia = "KH",
  Kiribati = "KI",
  Comoros = "KM",
  SaintKittsAndNevis = "KN",
  KoreaDemocraticPeoplesRepublic = "KP",
  KoreaRepublicOf = "KR",
  Kuwait = "KW",
  CaymanIslands = "KY",
  Kazakhstan = "KZ",
  LaoPeoplesDemocraticRepublic = "LA",
  Lebanon = "LB",
  SaintLucia = "LC",
  Liechtenstein = "LI",
  SriLanka = "LK",
  Liberia = "LR",
  Lesotho = "LS",
  Lithuania = "LT",
  Luxembourg = "LU",
  Latvia = "LV",
  Libya = "LY",
  Morocco = "MA",
  Monaco = "MC",
  Moldova = "MD",
  Montenegro = "ME",
  SaintMartinFrenchPart = "MF",
  Madagascar = "MG",
  MarshallIslands = "MH",
  NorthMacedonia = "MK",
  Mali = "ML",
  Myanmar = "MM",
  Mongolia = "MN",
  Macao = "MO",
  NorthernMarianaIslands = "MP",
  Martinique = "MQ",
  Mauritania = "MR",
  Montserrat = "MS",
  Malta = "MT",
  Mauritius = "MU",
  Maldives = "MV",
  Malawi = "MW",
  Mexico = "MX",
  Malaysia = "MY",
  Mozambique = "MZ",
  Namibia = "NA",
  NewCaledonia = "NC",
  Niger = "NE",
  NorfolkIsland = "NF",
  Nigeria = "NG",
  Nicaragua = "NI",
  Netherlands = "NL",
  Norway = "NO",
  Nepal = "NP",
  Nauru = "NR",
  Niue = "NU",
  NewZealand = "NZ",
  Oman = "OM",
  Panama = "PA",
  Peru = "PE",
  FrenchPolynesia = "PF",
  PapuaNewGuinea = "PG",
  Philippines = "PH",
  Pakistan = "PK",
  Poland = "PL",
  SaintPierreAndMiquelon = "PM",
  Pitcairn = "PN",
  PuertoRico = "PR",
  PalestineStateOf = "PS",
  Portugal = "PT",
  Palau = "PW",
  Paraguay = "PY",
  Qatar = "QA",
  Reunion = "RE",
  Romania = "RO",
  Serbia = "RS",
  RussianFederation = "RU",
  Rwanda = "RW",
  SaudiArabia = "SA",
  SolomonIslands = "SB",
  Seychelles = "SC",
  Sudan = "SD",
  Sweden = "SE",
  Singapore = "SG",
  SaintHelenaAscensionAndTristanDaCunha = "SH",
  Slovenia = "SI",
  SvalbardAndJanMayen = "SJ",
  Slovakia = "SK",
  SierraLeone = "SL",
  SanMarino = "SM",
  Senegal = "SN",
  Somalia = "SO",
  Suriname = "SR",
  SouthSudan = "SS",
  SaoTomeAndPrincipe = "ST",
  ElSalvador = "SV",
  SintMaartenDutchPart = "SX",
  SyrianArabRepublic = "SY",
  Eswatini = "SZ",
  TurksAndCaicosIslands = "TC",
  Chad = "TD",
  FrenchSouthernTerritories = "TF",
  Togo = "TG",
  Thailand = "TH",
  Tajikistan = "TJ",
  Tokelau = "TK",
  TimorLeste = "TL",
  Turkmenistan = "TM",
  Tunisia = "TN",
  Tonga = "TO",
  Turkey = "TR",
  TrinidadAndTobago = "TT",
  Tuvalu = "TV",
  Taiwan = "TW",
  Tanzania = "TZ",
  Ukraine = "UA",
  Uganda = "UG",
  UnitedStatesMinorOutlyingIslands = "UM",
  UnitedStatesOfAmerica = "US",
  Uruguay = "UY",
  Uzbekistan = "UZ",
  HolySee = "VA",
  SaintVincentAndTheGrenadines = "VC",
  Venezuela = "VE",
  BritishVirginIslands = "VG",
  VirginIslandsUS = "VI",
  VietNam = "VN",
  Vanuatu = "VU",
  WallisAndFutuna = "WF",
  Samoa = "WS",
  Yemen = "YE",
  Mayotte = "YT",
  SouthAfrica = "ZA",
  Zambia = "ZM",
  Zimbabwe = "ZW",
}
