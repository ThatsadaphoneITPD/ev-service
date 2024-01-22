import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createFormEVSchema = z.object({
    first_name: z.string().min(1, { message: messages.EvFirstNameEvRequired }),
    last_name: z.string().min(1, { message: messages.EvLastNameEvRequired }),
    phone_number: z.string().min(1, { message: messages.EvPhoneNumberIsRequired, }),
    village: z.string().min(1, { message: messages.EvVilageIsRequired }),
    city: z.string().min(1, { message: messages.EvCityIsRequired }),
    province: z.string().min(1, { message: messages.EvProvinceIsRequired }),
    meter_account: z.number().refine((value) => value >= 0, { message: messages.EvMeterAccIsRequired }),
    car_banner: z.string().min(1, { message: messages.EvCarBannerIsRequired }),
    car_model: z.string().optional(),
    car_battery: z.number().optional(),
    car_port: z.string().optional(),
    type_charger: z.string().min(1, { message: messages.EvTypeChargerIsRequired }),
    charger_banner: z.string().optional(),
    charger_power: z.number().refine((value) => value >= 0, { message: messages.EvChargerPowerIsRequired }),
    install_cost: z.string().optional(),
});
export const placholder = {
    firstname: "ປ້ອນຊື່",
    lastname: "ປ້ອນນາມສະກຸນ",
    phonenumber: "xxxx xxxx",
    electric_acc: "ປ້ອນເລກໃຊ້ໄຟ",
    province: "ເລືອກ ແຂວງ",
    city: "ເລືອກ ເມືອງ",
    village: "ເລືອກ ບ້ານ",
    car_banner: "ເລືອກ ຍີ່ຫໍ້",
    car_model: "ເລືອກ ລຸ້ນ",
    car_battery: "ເລືອກ ຈຳນວນ kWh",
    car_port: "ປ້ອນ ປະເພດອື່ນ",
    type_charger: "ເລືອກ ປະເພດ",
    charger_banner: "ປ້ອນ ຍີ່ຫໍ້",
    charger_power: "ເລືອກ ຈຳນວນ kW",
}

// generate form types from zod validation schema
export type CreateFormEVInput = z.infer<typeof createFormEVSchema>;
