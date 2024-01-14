import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';
import { DepartmentType, Regions } from './user-enum';

export type User = {
    id: string;
    avatar: string;
    name: string;
    address: string;
    region: keyof typeof Regions;
    department: DepartmentType; ///ຝ່າຍ
    division: number; //ພະແນກ/ສາຂາ
    unit: number; //ສູນບໍລິການ
    createdAt: Date;
};
export const UsersData = [
    {
        id: '0256',
        avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
            avatarIds
        )}.webp`,
        name: 'Bessie Beatty',
        address: 'christophe78@gmail.com',
        region: Regions.Center,
        department: 1, // Update with the actual department value
        division: 5, // Update with the actual division value
        unit: 3, // Update with the actual unit value
        createdAt: new Date('2029-10-14T16:01:40.021Z'),
    },
    {
        id: '6177',
        avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
            avatarIds
        )}.webp`,
        name: 'Joshua Green',
        address: 'ayla_schuster28@yahoo.com',
        region: Regions.Center,
        department: 2, // Update with the actual department value
        division: 3, // Update with the actual division value
        unit: 4, // Update with the actual unit value
        createdAt: new Date('2027-11-01T13:23:52.903Z'),
    },
    {
        id: '6107',
        avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
            avatarIds
        )}.webp`,
        name: 'Joshua Green',
        address: 'ayla_schuster28@yahoo.com',
        region: Regions.Center,
        department: 3, // Update with the actual department value
        division: 2, // Update with the actual division value
        unit: 3, // Update with the actual unit value
        createdAt: new Date('2027-11-01T13:23:52.903Z'),
    },
];
