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
  CCS2: 'CCS2',
  ອື່ນໆ: 'ເຊັ່ນ:',
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
  small: '3.000.000 - 5.000.000',
  // middle: '3.500.000 - 4.200.000',
  // high: '4.200.000 - 5.000.000',
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
