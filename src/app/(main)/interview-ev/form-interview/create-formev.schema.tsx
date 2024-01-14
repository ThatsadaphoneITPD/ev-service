import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createFormEVSchema = z.object({
    firstName: z.string().min(1, { message: messages.EvFirstNameEvRequired }),
    lastName: z.string().min(1, { message: messages.EvLastNameEvRequired }),
    phonNumber: z.number().refine((value) => value !== undefined && value !== null, { message: messages.EvPhoneNumberIsRequired, }),
    village: z.string().min(1, { message: messages.EvVilageIsRequired }),
    city: z.string().min(1, { message: messages.EvCityIsRequired }),
    province: z.string().min(1, { message: messages.EvProvinceIsRequired }),
    meterAccount: z.number().refine((value) => value >= 0, { message: messages.EvMeterAccIsRequired }),
    carBanner: z.string().min(1, { message: messages.EvCarBannerIsRequired }),
    carModel: z.string(),
    carbattery: z.number(),
    carPort: z.string().min(1, { message: messages.EvCarPortChargeIsRequired }),
    typeCharger: z.string().min(1, { message: messages.EvTypeChargerIsRequired }),
    chargerBanner: z.string(),
    chargerPower: z.number().refine((value) => value >= 0, { message: messages.EvChargerPowerIsRequired }),
    minInsallPrice: z.number().refine((value) => value >= 0, { message: messages.EvMinInsallPriceIsRequired }),
    maxInsallPrice: z.number().refine((value) => value >= 0, { message: messages.EvMaxInsallPriceIsRequired }),
    chargerTOUPeakOff: z.string().min(1, { message: messages.EvChargerPeakOffIsRequired }),
    installCost: z.string(),
    interesrInstall: z.string()
});

// generate form types from zod validation schema
export type CreateFormEVInput = z.infer<typeof createFormEVSchema>;
