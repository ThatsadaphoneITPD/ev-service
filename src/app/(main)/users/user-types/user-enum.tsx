export const ROLES = {
    Developer: 'Developer',
    Administrator: 'Administrator',
    Manager: 'Manager',
    Sales: 'Sales',
    Support: 'Support',
    Customer: 'Customer',
} as const;

export const Regions = {
    South: 'ພາກໃຕ້',
    Center: 'ພາກກາງ',
    North: 'ພາກເໜືອ',
} as const;

export enum DepartmentType {
    First = 1,
    Second = 2,
    Third = 3,
}
export const departments = {
    1: "ຝ່າຍຄຸ້ມຄ້ອງລະບົບໄຟຟ້າພາກເໜືອ",
    2: "ຝ່າຍຄຸ້ມຄ້ອງລະບົບໄຟຟ້າພາກກາງ",
    3: "ຝ່າຍຄຸ້ມຄ້ອງລະບົບໄຟຟ້າພາກໃຕ້",
} as const;