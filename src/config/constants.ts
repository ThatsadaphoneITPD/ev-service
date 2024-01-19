export const CART_KEY = 'isomorphic-cart';
export const DUMMY_ID = 'FC6723757651DB74';
export const CHECKOUT = 'isomorphic-checkout';
export const CURRENCY_CODE = 'USD';
export const LOCALE = 'en';
export const CURRENCY_OPTIONS = {
  formation: 'en-US',
  fractions: 2,
};

export const ROW_PER_PAGE_OPTIONS = [
  {
    value: 5,
    name: '5',
  },
  {
    value: 10,
    name: '10',
  },
  {
    value: 15,
    name: '15',
  },
  {
    value: 20,
    name: '20',
  },
];

export const ROLES = {
  Administrator: 'Administrator',
  Manager: 'Manager',
  Sales: 'Sales',
  Support: 'Support',
  Developer: 'Developer',
  HRD: 'HR Department',
  RestrictedUser: 'Restricted User',
  Customer: 'Customer',
} as const;
export const TYPECHARGERPORT = {
  GBT: 'GBT',
  TYPE2_CCS2: 'TYPE2/CCS2',
  ETC: 'ປະເພດອື້ນໆ',
} as const;
export const TYPEEVCHARGER = {
  moveable: 'ແບບພົບພາ',
  installable: 'ແບບຕິດຕັ້ງຢູ່ທີ່ພັກອາໄສ',
} as const;
export const TYPEMETERCOST = {
  flatrate: 'ລາຄາດຽວຕະຫຼອດ 24 ຊົ່ວໂມງ (Flat rate)',
  peakofpeak: 'ລາຄາຊ່ວງເວລາ (Peak / Off Peak)',
} as const;
export const InstallationCostSmartMeter = {
  small: '3,000,000 - 5,000,000 ກີບ',
  middle: '5,000,000 - 8,000,000 ກີບ',
  high: '8,000,000 ກີບ ຂື້ນໄປ',
} as const;
export const CAPACITYCHARGER = {
  sevenkw: 7,
  elevenkw: 11,
  twentytwokw: 22,
} as const;
export const PEAKTIMER = {
  peakmorning: 'Peak ເວລາ 9:00 - 22:00 ໂມງ (ສະເພາະ ວັນຈັນ-ວັນສຸກ)',
  peakmidnight: 'Off Peak ເວລາ 22:01 - 8:59 ໂມງ (ສະເພາະ ວັນຈັນ-ວັນສຸກ)',
  peakfullweak: 'ເວລາ 00:00 - 24:00 ໂມງ (ສະເພາະ ວັນເສົາ-ວັນອາທິດ ແລະ ວັນພັກ)',
} as const;

export const Regions = {
  South: 'ພາກໃຕ້',
  Center: 'ພາກກາງ',
  North: 'ພາກເໜືອ',
} as const;
export const CARBANNER = {
  Aiways: 'Aiways',
  AUDI: 'AUDI',
  BENTLEY: 'BENTLEY',
  BMW: 'BMW',
  BYD: 'BYD',
  CHANGAN: 'CHANGAN',
  CHEVROLET: 'CHEVROLET',
  CITOREN: 'CITOREN',
  DONGFENG: 'DONGFENG',
  FIAT: 'FIAT',
  FOMM: 'FOMM',
  FORD: 'FORD',
  GAC_AION: 'GAC AION',
  GEELY: 'GEELY',
  GWM: 'GWM',
  HIGER: 'HIGER',
  HONDA: 'HONDA',
  HONGQI: 'HONGQI',
  HYUNDAI: 'HYUNDAI',
  IMIO: 'IMIO',
  JAC: 'JAC',
  JAGUAR: 'JAGUAR',
  KIA: 'KIA',
  LEAPMOTOR: 'LEAPMOTOR',
  LEXUS: 'LEXUS',
  LI_AUTO: 'LI AUTO',
  MERCEDES_BENZ: 'MERCEDES-BENZ',
  MG: 'MG',
  MINI_COOPER: 'MINI-COOPER',
  MITSUBISHI: 'MITSUBISHI',
  NETA: 'NETA',
  NEX_POINT: 'NEX POINT',
  NIO: 'NIO',
  NISSAN: 'NISSAN',
  ORA: 'ORA',
  PEUGEOT: 'PEUGEOT',
  POCCO: 'POCCO',
  POLESTAR: 'POLESTAR',
  PORSCHE: 'PORSCHE',
  RADAR: 'RADAR',
  RANGE_ROVER: 'RANGE ROVER',
  SERES: 'SERES',
  STROM: 'STROM',
  TESLA: 'TESLA',
  TOYOTA: 'TOYOTA',
  VOLKSWAGEN: 'VOLKSWAGEN',
  VOLT_CITY_EV: 'VOLT CITY EV',
  VOLVO: 'VOLVO',
  WELTMEISTER: 'WELTMEISTER',
  WULING: 'WULING',
  XPENG: 'XPENG',
  ZEEKR: 'ZEEKR',
} as const;
export const electricCarData = [
  { name: 'Aiways', models: ['U5', 'U6'] },
  {
    name: 'AUDI',
    models: [
      'E-TRON 55',
      'Q4 e-Tron',
      'Q4 Sportback e-tron',
      'Q8 e-tron',
      'Q8 Sportback e-tron',
      'SQ8 e-tron',
      'SQ8 Sportback e-tron',
      'e-tron GT',
      'Q5 PHEV',
    ],
  },
  { name: 'BENTLEY', models: ['BENTAYGA'] },
  {
    name: 'BMW',
    models: [
      '330e F30 2017',
      '330e Msport',
      '740Le',
      '530e',
      'X3',
      'x5 45e',
      'i3 2017',
      'i3s',
      'i4',
      'i7',
      'i8 2017',
      'iX3',
      'IX40',
    ],
  },
  {
    name: 'BYD',
    models: [
      'ATTO 3',
      'E2',
      'E6',
      'M3',
      'T3',
      'SEAL',
      'DOLPHIN',
      'HAN',
      'TANG',
      'SONG PLUS EV',
      'YUAN PLUS EV',
      'QIN',
      'SEAGULL',
    ],
  },
  {
    name: 'CHANGAN',
    models: [
      'Raeton CC',
      'Eado XT',
      'Eado',
      'Eado DT',
      'Alsvin',
      'Unik-idd',
      'BEN BEN E-STAR',
      'UNI-K',
      'UNIV-IDD',
    ],
  },
  {
    name: 'CHEVROLET',
    models: [
      'EQUINOX EV',
      'BLAZER EV',
      '2023 Bolt EUV',
      'Bolt 2017',
      'SparkEV',
      'SILVERADO EV',
    ],
  },
  { name: 'CITOREN', models: ['Berlingo II', 'Czero 2010', 'E-C3'] },
  { name: 'DONGFENG', models: ['A9', 'E70', 'NANO EX 1', 'NANO BOX'] },
  { name: 'FIAT', models: ['Fiat 2017'] },
  { name: 'FOMM', models: ['One'] },
  { name: 'FORD', models: ['Mustang Mach-E'] },
  { name: 'GAC AION', models: ['GA8', 'GA6', 'EMPOW55'] },
  { name: 'GEELY', models: ['GEOMETRY C', 'GEOMETRY A', 'GEOMETRY E'] },
  {
    name: 'GWM',
    models: [
      'Haval H6 PHEV',
      'Ora Good Cat 400 Pro',
      'Ora Good Cat 400 Tech',
      'Ora Good Cat 500 Ultral',
      'Ora Good Cat GT',
    ],
  },
  { name: 'HIGER', models: ['H5C EV', 'H5C EV CARGO'] },
  { name: 'HONDA', models: ['FitEV 2014', 'e:NS1'] },
  { name: 'HONGQI', models: ['E-HS9', 'E-QM5'] },
  {
    name: 'HYUNDAI',
    models: [
      'IONIQ',
      'IONIQ Electric',
      'KONA Electric SE',
      'KONA Electric SEL',
      'KONA SE',
      'KONA SEL',
    ],
  },
  { name: 'IMIO', models: ['Pocco'] },
  { name: 'JAC', models: ['e-J7', 'e-JS4', 'eJS1', 'N55 EV'] },
  { name: 'JAGUAR', models: ['I-PACE'] },
  { name: 'KIA', models: ['ALL-NEW SOUL EV', 'SOUL EV 2017', 'EV 5'] },
  { name: 'LEAPMOTOR', models: ['C11', 'T03'] },
  { name: 'LEXUS', models: ['NX450+', 'ux300e'] },
  { name: 'LI AUTO', models: ['L7', 'L8', 'L9'] },
  {
    name: 'MERCEDES-BENZ',
    models: [
      '300 AMG Dynamic',
      '300 E',
      '500e',
      'C300e',
      'C350e',
      'E 300 Excutive',
      'E350e Avangarde',
      'EQS 450+ AMG Premium',
      'EQS 450+ Edition 1',
      'S560e AMG Premium',
      'S500e',
    ],
  },
  { name: 'MG', models: ['EP', 'HS', 'MG HS PHEV', 'MG4', 'ZS EV'] },
  { name: 'MINI-COOPER', models: ['Countryman', 'Model SE'] },
  { name: 'MITSUBISHI', models: ['MiEV 2017', 'Outlander'] },
  { name: 'NETA', models: ['Neta V', 'Neta S'] },
  { name: 'NEX POINT', models: ['Stream X'] },
  { name: 'NIO', models: ['ES7', 'ET5', 'ES6', 'ES8', 'ET7'] },
  {
    name: 'NISSAN',
    models: [
      'LEAF 2019',
      'LEAF S 2017',
      'LEAF SL 2017',
      'LEAF SV 2017',
      'Env200',
    ],
  },
  { name: 'ORA', models: ['0'] },
  { name: 'PEUGEOT', models: ['Partner', 'Ion'] },
  { name: 'POCCO', models: ['MM YX', 'MM ZX', 'DD L', 'DD K'] },
  { name: 'POLESTAR', models: ['0'] },
  {
    name: 'PORSCHE',
    models: [
      'Cayenne',
      'Cayenne E-Hybrid',
      'Panamera E-Hybrid',
      'Taycan',
      'Taycan Turbo',
    ],
  },
  { name: 'RADAR', models: ['RD6'] },
  { name: 'RANGE ROVER', models: ['Sport P400e'] },
  { name: 'SERES', models: ['SERES 3', 'SERES 5'] },
  { name: 'STROM', models: ['GORILLA GRL-200L'] },
  {
    name: 'TESLA',
    models: [
      'Model 3LR',
      'Model 3 PF',
      'Model 3 SP',
      'Model S',
      'Model X',
      'Model Y LR',
      'Model Y PF',
      'Model Y SP',
      'Roadster',
    ],
  },
  { name: 'TOYOTA', models: ['Rav4EV', 'bz3', 'BZ4X'] },
  {
    name: 'VOLKSWAGEN',
    models: ['eGolf', 'ID 4', 'ID 6', 'ID 3', 'ID7 VIZZION'],
  },
  { name: 'VOLT CITY EV', models: ['VOLT FOR-FOUR', 'VOLT FOR TWO'] },
  { name: 'VOLVO', models: ['C40', 'S60', 'S90', 'V60', 'XC40', 'XC60 8T'] },
  { name: 'WELTMEISTER', models: ['E5', 'EX5', 'EX6', 'W6', 'W5'] },
  {
    name: 'WULING',
    models: [
      'Bingo',
      'MINI EV Cabrio',
      'Air EV',
      'Hongguang MINI EV Gameboy',
      'Hongguang NanoEV',
      'MINI EV',
    ],
  },
  {
    name: 'XPENG',
    models: [
      'G9 AWD',
      'P5 600P',
      'P5 550P',
      'P5 460G',
      'G3 520i',
      'G3 460c',
      'G3 460i',
      'P7 4WD High Performance',
      'P7 RWD Super Long Range',
      'P7 RWD Long Range',
      'P7 RWD Standard Range',
    ],
  },
  {
    name: 'ZEEKR',
    models: [
      'ZEEKR X',
      '2023 ZEEKR 001',
      'ZEEKR 009',
      'ZEEKR 001 Dual Mortor YOU',
      'ZEEKR 001 Dual Motor WE',
      'ZEEKR 001 Single Motor WE',
    ],
  },
];
