import { UsersData } from './user-types/users-data';


export const users = Object.entries(UsersData).map(([key, value]) => ({
    name: value,
    value: key,
}));
