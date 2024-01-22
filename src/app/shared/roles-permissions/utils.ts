import {
  ROLES,
  TYPEEVCHARGER,
  CAPACITYCHARGER,
  TYPECHARGERPORT,
  TYPEMETERCOST,
  PEAKTIMER,
  InstallationCostSmartMeter,
  CARBANNER,
} from '@/config/constants';
import { Districts, Provinces, Villages } from '@/config/countryconstants';
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
export const carBanner = Object.entries(CARBANNER).map(([key, value]) => ({
  name: value,
  value: value,
}));
// export const provincesList = Object.entries(Provinces).map(([key, value]) => ({
//   name: value.province_name,
//   value: value.province_name,
//   // key: value.province_code,
// }));
export const provincesList = Object.entries(Provinces).map(([key, value]) => ({
  name: value.province_name,
  value: value.province_name,
  key: value.province_code,
}));
export const getDistrict = (selectedProvince: string | undefined) => {
  const filteredDistricts = Districts.filter(
    (district) => district.province_code === selectedProvince
  );
  const districts = Object.entries(filteredDistricts).map(([key, value]) => ({
    name: value.district_name,
    value: value.district_name,
    key: value.district_code,
  }));
  return districts;
};

export const getVillages = (selectedDistrict: string | undefined) => {
  const filteredVillages = Villages.filter(
    (village) => village.district_code === selectedDistrict
  );
  const villages = Object.entries(filteredVillages).map(([key, value]) => ({
    name: value.village_name,
    value: value.village_name,
    key: value.district_code,
  }));
  return villages;
};
