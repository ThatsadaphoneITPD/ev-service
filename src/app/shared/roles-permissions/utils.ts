import {
  ROLES,
  TYPEEVCHARGER,
  CAPACITYCHARGER,
  TYPECHARGERPORT,
  TYPEMETERCOST,
  PEAKTIMER,
  InstallationCostSmartMeter,
} from '@/config/constants';
import { PERMISSIONS, STATUSES } from '@/data/users-data';

export const statuses = Object.values(STATUSES).map((status) => ({
  name: status,
  value: status,
}));
export const permissions = Object.values(PERMISSIONS).map((permission) => ({
  name: permission,
  value: permission,
}));
export const roles = Object.entries(ROLES).map(([key, value]) => ({
  name: value,
  value: key,
}));
export const typeevcharger = Object.entries(TYPEEVCHARGER).map(
  ([key, value]) => ({
    name: value,
    value: value,
  })
);
export const capacitycharger = Object.entries(CAPACITYCHARGER).map(
  ([key, value]) => ({
    name: value,
    value: value,
  })
);
export const typechargerport = Object.entries(TYPECHARGERPORT).map(
  ([key, value]) => ({
    name: key,
    value: value,
  })
);
export const typemetercost = Object.entries(TYPEMETERCOST).map(
  ([key, value]) => ({
    name: value,
    value: value,
  })
);
export const typepeaktimer = Object.entries(PEAKTIMER).map(([key, value]) => ({
  name: value,
  value: value,
}));
export const installSmartMeter = Object.entries(InstallationCostSmartMeter).map(
  ([key, value]) => ({
    name: value,
    value: value,
  })
);
