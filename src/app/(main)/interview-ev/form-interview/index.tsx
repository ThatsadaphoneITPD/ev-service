//slide-show
'use client';
import React, { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Select from '@/components/ui/select';
import {
    typeevcharger,
    capacitycharger,
    typechargerport,
    installSmartMeter,
    carBanner,
} from '@/app/shared/roles-permissions/utils';
import { HeadLine } from './headLine';
import toast from 'react-hot-toast';
import { CreateFormEVInput, createFormEVSchema } from './create-formev.schema';
import { Radio, RadioGroup, } from "rizzui";
import { electricCarData } from '@/config/constants';
import { RiArrowGoBackFill } from "react-icons/ri";
import axios from 'axios';
import Image from 'next/image';
import { ACCCS2, ACGBT, DCCCS2, DCGBT } from './icon';
import MyMapComponent from './google-map';


interface Props {

}
interface Accordion {
    mainContent: string,
    peakDescritp: boolean
    flatRate: boolean
}
interface CustomInputLabelProps {
    children: React.ReactNode;
    isRequire: boolean
}

interface DynamicFormProps {
    name: string;
    label: string;
    options: any;
    errors: any;
    placeholder: any;
    additionCompare: any;
    register: any
    control: any
}
const Asterisk: React.FC = () => <span className='text-red text-sm'> * </span>;
const CustomInputLabel: React.FC<CustomInputLabelProps> = ({ children, isRequire }) => (
    <div>
        {children}
        {isRequire == true && <Asterisk />}
    </div>
);

const DynamicForm: React.FC<DynamicFormProps> = (props) => {
    const [selectedValue, setSelectedValue] = useState<string>('');

    return (
        <>
            {selectedValue !== props.additionCompare ? (
                <RadioGroup value={selectedValue} setValue={setSelectedValue} className="grid grid-cols-1 sm:grid-cols-3 mx-auto gap-4">
                    {props?.options.map((item: any) => (
                        <div className="flex justify-center items-center" key={item.value}>
                            <div className="flex-none mx-3">
                                <Radio
                                    {...props.register(props.name)}
                                    value={item.value}
                                    checked={item.value === selectedValue}
                                    inputClassName='bg-white'
                                    size="xl"
                                />
                            </div>
                            <div
                                {...props.register(props.name)}
                                onClick={() => setSelectedValue(item.value)}
                                className={`grid grid-cols-4 gap-4 relative bg-white shadow-lg rounded-md w-[12rem] ${item.name === "ETC" ? "h-20 flex justify-center items-center" : "h-6/12"} hover:ring-2 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md transition-transform duration-300 transform hover:scale-110 text-center`}
                            >
                                <div className="mx-1 col-span-4 ">{item.value}</div>
                                {item.name !== "ETC" && (
                                    <>
                                        <div className="mx-1 col-span-2">
                                            <div className="flex justify-center items-center">
                                                <div className="flex-none ">{item.name === "GBT" && "AC"} {item.name === "TYPE2_CCS2" && "AC"}</div>
                                                <div className="flex-initial ">{item.name === "GBT" && <Image src={ACGBT} alt='ACGBT' />} {item.name === "TYPE2_CCS2" && <Image src={ACCCS2} alt='ACCCS2' />}</div>
                                            </div>
                                        </div>
                                        <div className="mx-1 col-span-2">
                                            <div className="flex justify-center items-center">
                                                <div className="flex-none ">{item.name === "GBT" && "DC"} {item.name === "TYPE2_CCS2" && "DC"}</div>
                                                <div className="flex-initial ">{item.name === "GBT" && <Image src={DCGBT} alt='DCGBT' />} {item.name === "TYPE2_CCS2" && <Image className='h-[3.5rem]' src={DCCCS2} alt='DCCCS2' />}</div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            ) : (
                <Input
                    type='text'
                    inputClassName='bg-white'
                    suffix={<RiArrowGoBackFill className='hover:duration-200 transition-transform duration-300 transform hover:scale-110 hover:text-bold' onClick={() => { setSelectedValue("") }} />}
                    placeholder="ເພີ່ມໃໝ່"
                    {...props.register(props.name)}
                    error={props.errors}
                />
            )}
        </>
    );
};


export const FormInterview = (props: Props) => {
    const [reset, setReset] = React.useState({});
    const styleCardBG = "rgb(74 108 247/3%)";

    const [carmodel, setCarmodel] = React.useState<string>("")
    const selectedCar = (carmodel: any) => {
        return electricCarData.find((car) => car.name === carmodel);
    };
    const selectedCarObject = selectedCar(carmodel);
    const modelsArray = selectedCarObject?.models || [];
    const carmodels = Object.entries(modelsArray).map(([key, value]) => ({
        name: value,
        value: value,
    }));
    const [agree, setAgree] = useState<string>('');
    const [expectCost, setExpectCost] = useState<string>('ບໍ່ເລືອກ');
    const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });

    const HeadlAccordion: React.FC<Accordion> = ({ mainContent, peakDescritp, flatRate }) => {
        return (
            <div>
                <div className="relative w-full mt-1 h-full">
                    {/* <LuArrowRightCircle style={{ color: "#3758F4", backgroundColor: "white" }} className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full" /> */}
                    <div className="ml-6">
                        <div aria-label="header" className="max-w-screen flex items-center space-x-2">
                            <div className="flex-1 ">
                                <h4 className="font-bold text-blue-500">{mainContent}</h4>
                            </div>
                        </div>
                        {peakDescritp == true &&
                            <div aria-label="header" className="max-w-screen flex items-center space-x-2 p-4">
                                <div className="space-y-0.5">
                                    <ul className="list-disc space-4">
                                        <li> <h5 className="font-bold"> ຊ່ວງ Peak ເວລາແຕ່ 9:00 ຫາ 22:00 ວັນຈັນ-ວັນສຸກ</h5></li>
                                        <li> <h5 className="font-bold"> ຊ່ວງ Off-Peak ເວລາແຕ່ 22:00 ຫາ 9:00 ວັນຈັນ-ວັນສຸກ ແລະ  0:00 ຫາ 24:00 ວັນເສົາ-ວັນອາທິດ ວັນພັກລັດຖະການ </h5></li>
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

    const onSubmit: SubmitHandler<CreateFormEVInput> = async (data) => {

        const formattedData = {
            ...data,
            charger_tou_peak_off: expectCost,
            install_cost: agree !== "ສົນໃຈ" ? "0" : expectCost,
            latitude: `${markerPosition?.lat}`,
            longitude: `${markerPosition?.lng}`,
            electic_bill_policy: "none",
            intrest_install: "none",
            reason_install: "none",
        };
        const saveDataPromise = () => new Promise((resolve, reject) => {
            // Simulate a delay for the loading state
            setTimeout(async () => {
                try {
                    // Handle the successful response here
                    resolve('Settings saved!');
                    setReset({
                        first_name: "", last_name: "", phone_number: "", village: "", city: "", province: "", meter_account: '', car_banner: "", car_model: "", car_battery: '', car_port: "", type_charger: "", charger_banner: "", charger_power: '', charger_tou_peak_off: "", install_cost: "",
                    })
                } catch (error) {
                    // Handle errors here
                    reject((error: any) => {
                        if (error.response) {
                            // The request was made, but the server responded with a status code
                            console.error('Server responded with an error status:', error.response.status);
                            console.error('Response data:', error.response.data);
                            toast.error(error.response.status);
                        } else if (error.request) {
                            // The request was made, but no response was received.
                            console.error('No response received from the server.');
                            toast.error('No response received from the server',
                                {
                                    style: {
                                        borderRadius: '10px',
                                        background: '#333',
                                        color: '#fff',
                                    },
                                }
                            );
                        } else {
                            // Something happened in setting up the request that triggered the error.
                            console.error('Error setting up the request:', error.message);
                            toast.error(error.message, {
                            });
                        }
                    });
                }
            }, 2000); // Simulating a 1-second delay
        });
        try {
            // Handle the successful response here
            // console.log(formattedData)
            const envapi = process.env.NEXT_PUBLIC_API_BACKEND;
            const apiHttp = axios.create({
                baseURL: envapi,
                headers: {
                    "Content-type": "application/json",
                    'Content-Disposition': 'attachment; filename*=UTF-8\'\'',
                },
            });
            const response = await apiHttp.post("/api_v1/evRegister/add", formattedData);
            await toast.promise(
                saveDataPromise(),
                {
                    loading: 'Saving...',
                    success: <b>{response.data.message}</b>,
                    error: <b>{response.data.message}</b>,
                }
            );
        }
        catch (error: any) {
            // Handle errors here
        }
    };

    return (
        <Form<CreateFormEVInput> resetValues={reset} onSubmit={onSubmit} validationSchema={createFormEVSchema} className='h-full' >
            {({ register, control, watch, formState: { errors } }) => {
                // console.log('errors', errors);
                return (
                    <>
                        {/* 0--------------------------------ຂໍ້ມູນຜູ້ຊົມໃຊ້ໄຟຟ້າ------------------------------------ */}
                        <div className="overflow-hidden flex justify-center items-center">
                            <div className="container " >
                                <div className="flex flex-wrap lg:justify-center lg:items-center">
                                    <div className="w-full lg:w-7/12 xl:w-8/12">
                                        <div style={{ background: styleCardBG }} className="wow fadeInUp shadow-three mb-5 rounded-lg px-8 py-5 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]" data-wow-delay=".15s"  >
                                            <HeadLine rank={0} mainContent='ຂໍ້ມູນຜູ້ຊົມໃຊ້ໄຟຟ້າ' subtext='' frontIcon={false} />
                                            <div className="-mx-4 flex flex-wrap">
                                                <div className="w-full px-4 md:w-1/2">
                                                    <div className="mb-8">
                                                        <label
                                                            htmlFor="number"
                                                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                                        ><CustomInputLabel isRequire={true}>ຊື່</CustomInputLabel>
                                                        </label>
                                                        <Input
                                                            type='text'
                                                            inputClassName='bg-white'
                                                            placeholder="ກະລຸນາປ້ອນຊື່"
                                                            {...register('first_name')}
                                                            error={errors.first_name?.message}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 md:w-1/2">
                                                    <div className="mb-8">
                                                        <label className="mb-3 block text-sm font-medium text-dark dark:text-white"  > <CustomInputLabel isRequire={true}>ນາມສະກຸນ</CustomInputLabel> </label>
                                                        <Input
                                                            type="text"
                                                            inputClassName='bg-white'
                                                            placeholder="ກະລຸນາປ້ອນນາມສະກຸນ"
                                                            {...register('last_name')}
                                                            error={errors.last_name?.message}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 md:w-1/2">
                                                    <div className="mb-8">
                                                        <label htmlFor="number" className="mb-3 block text-sm font-medium text-dark dark:text-white" ><CustomInputLabel isRequire={true}>ເບີໂທຕິດຕໍ່ ຫຼື Whatapp</CustomInputLabel>
                                                        </label>
                                                        <Input
                                                            type='number'
                                                            placeholder=" xxxx xxxx"
                                                            inputClassName='bg-white'
                                                            prefix="020"
                                                            {...register('phone_number')}
                                                            error={errors.phone_number?.message}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 md:w-1/2">
                                                    <div className="mb-8">
                                                        <label

                                                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                                        >
                                                            <CustomInputLabel isRequire={true}>ເລກບັນຊີຜູ້ຊົມໃຊ້ໄຟ</CustomInputLabel>
                                                        </label>
                                                        <Input
                                                            type='number'
                                                            inputClassName='bg-white'
                                                            placeholder="ປ້ອນ ເລກບັນຊີ"
                                                            {...register('meter_account', {
                                                                setValueAs: (value: string) => {
                                                                    const parsedValue = parseFloat(value);
                                                                    return isNaN(parsedValue) ? undefined : parsedValue;
                                                                },
                                                            })}
                                                            error={errors.meter_account?.message}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-7/12 xl:w-8/12">
                                        <div style={{ background: styleCardBG }} className="wow fadeInUp shadow-three mb-5 relative z-10 rounded-lg p-8 sm:p-11 lg:p-8 xl:p-11" data-wow-delay=".2s" >
                                            <h3 className="mb-4 text-2xl font-bold leading-tight text-black w-full text-center">
                                                ທີ່ຢູ່ປະຈຸບັນ
                                            </h3>
                                            <div className='-mx-4 flex flex-wrap'>
                                                <div className="w-full px-4 md:w-1/3">
                                                    <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ແຂວງ</CustomInputLabel> </label>
                                                    <Input
                                                        placeholder="ນະຄອນຫຼວງ"
                                                        className='w-full'
                                                        inputClassName='bg-white'
                                                        {...register('province')}
                                                        error={errors.province?.message}
                                                    />
                                                </div>
                                                <div className="w-full px-4 md:w-1/3">
                                                    <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ເມືອງ</CustomInputLabel> </label>
                                                    <Input
                                                        className='w-full mt-4 md:mt-0'
                                                        placeholder="ສີສັດຕະນາກ"
                                                        inputClassName='bg-white'
                                                        {...register('city')}
                                                        error={errors.city?.message}
                                                    />
                                                </div>
                                                <div className="w-full px-4 md:w-1/3">
                                                    <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ບ້ານ</CustomInputLabel> </label>
                                                    <Input
                                                        className='w-full mt-4 md:mt-0'
                                                        placeholder="ໂສກປ່າຫຼວງ"
                                                        inputClassName='bg-white'
                                                        {...register('village')}
                                                        error={errors.village?.message}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full text-left mt-5 mb-5 text-[0.9rem] font-black"><CustomInputLabel isRequire={true}>ຈຸດພິກັດບ່ອນຊົມໃຊ້ໄຟ</CustomInputLabel> </div>
                                            <MyMapComponent markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 2-----------------------------------------------------------ຂໍ້ມູນການຊົມໃຊ້ລົດໄຟຟ້າ----------------------------------------------------------------------------------- */}
                        <div className="overflow-hidden ">
                            <div className="container">
                                <div className="-mx-2 flex flex-wrap lg:justify-center lg:items-center">
                                    <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                                        <div style={{ background: styleCardBG }} className="wow fadeInUp shadow-three dark:bg-gray-dark mb-5 rounded-sm bg-white px-8 py-5 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]" data-wow-delay=".15s"   >
                                            <HeadLine rank={1} mainContent='ຂໍ້ມູນການຊົມໃຊ້ລົດໄຟຟ້າ' subtext='' frontIcon={false} />
                                            <div className="-mx-4 flex flex-wrap">
                                                <div className="w-full px-4 md:w-1/2">
                                                    <div className="mb-8">
                                                        <label className="mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ຍີ່ຫໍ້ລົດ</CustomInputLabel> </label>
                                                        <Controller
                                                            name="car_banner"
                                                            control={control}
                                                            render={({ field: { name, onChange, value } }) => (
                                                                <Select
                                                                    options={carBanner}
                                                                    value={value}
                                                                    onChange={(selectedOption: any) => {
                                                                        onChange(selectedOption);
                                                                        setCarmodel(selectedOption);
                                                                    }}
                                                                    selectClassName="bg-white"
                                                                    name={name}
                                                                    isRequired={true}
                                                                    error={errors?.charger_power?.message}
                                                                    getOptionValue={(option) => option.value}
                                                                    displayValue={(selected: string) =>
                                                                        carBanner.find((option) => option.value === selected)?.name ??
                                                                        selected
                                                                    }
                                                                    placeholder="VOLKSWAGEN"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 md:w-1/2">
                                                    <div className="mb-8">
                                                        <label className="mb-3 block text-sm font-medium text-dark dark:text-white"  > ລຸ້ນ </label>
                                                        <Controller
                                                            name="car_model"
                                                            control={control}
                                                            render={({ field: { name, onChange, value } }) => (
                                                                <Select
                                                                    options={carmodels}
                                                                    value={value}
                                                                    onChange={onChange}
                                                                    selectClassName="bg-white"
                                                                    name={name}
                                                                    isRequired={true}
                                                                    error={errors?.charger_power?.message}
                                                                    getOptionValue={(option) => option.value}
                                                                    displayValue={(selected: string) =>
                                                                        carmodels.find((option) => option.value === selected)?.name ??
                                                                        selected
                                                                    }
                                                                    placeholder="ID6"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 md:w-1/2">
                                                    <div className="mb-8">
                                                        <label htmlFor="number" className="mb-3 block text-sm font-medium text-dark dark:text-white" >ຂະໜາດແບັດເຕີຣີ </label>
                                                        <Input
                                                            type="number"
                                                            suffix="kWh"
                                                            inputClassName='bg-white'
                                                            placeholder="65 kWh"
                                                            {...register('car_battery', {
                                                                setValueAs: (value: string) => {
                                                                    const parsedValue = parseFloat(value);
                                                                    return isNaN(parsedValue) ? 0 : parsedValue;
                                                                },
                                                            })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full px-4 ">
                                                    <div className="mb-8">
                                                        <label className="mb-3 block text-sm font-medium text-dark dark:text-white"  > <CustomInputLabel isRequire={true}>ປະເພດຫົວສາກ</CustomInputLabel> </label>
                                                        <DynamicForm
                                                            register={register}
                                                            name="car_port"
                                                            label=""
                                                            options={typechargerport}
                                                            errors={errors.car_port?.message}
                                                            placeholder="ເລືອກ ປະເພດຫົວ"
                                                            additionCompare={typechargerport[2]?.value}
                                                            control={control}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full px-4 lg:w-4/12 xl:w-8/12">
                                        <div style={{ background: styleCardBG }} className="wow fadeInUp shadow-three relative z-10 rounded-sm bg-white p-8 sm:p-11 lg:p-8 xl:p-11" data-wow-delay=".2s" >
                                            <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white w-full text-center">
                                                <HeadLine rank={2} mainContent='ຂໍ້ມູນອຸປະກອນສາກລົດໄຟຟ້າ' subtext='' frontIcon={false} />
                                            </h3>
                                            <div>
                                                <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ປະເພດທີ່ນໍາໃຊ້ເຄື່ອງສາກລົດ</CustomInputLabel> </label>
                                                <Controller
                                                    name="type_charger"
                                                    control={control}
                                                    render={({ field: { name, onChange, value } }) => (
                                                        <Select
                                                            options={typeevcharger}
                                                            value={value}
                                                            onChange={onChange}
                                                            name={name}
                                                            isRequired={true}
                                                            selectClassName="bg-white"
                                                            className="col-span-full"
                                                            error={errors?.type_charger?.message}
                                                            getOptionValue={(option) => option.value}
                                                            displayValue={(selected: string) =>
                                                                typeevcharger.find((option) => option.value === selected)?.name ??
                                                                selected
                                                            }
                                                            placeholder="ແບບພົກພາ/ສຸກເສີນ"
                                                        />
                                                    )}
                                                />
                                                <div className="-mx-4 flex flex-wrap" style={{ marginTop: "1rem" }}>
                                                    <div className="w-full px-4 md:w-1/2">
                                                        <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ຍີ່ຫໍ້ຂອງເຄື່ອງສາກ</CustomInputLabel> </label>
                                                        <Input placeholder="WallBox" inputClassName='bg-white' {...register('charger_banner')} error={errors.charger_banner?.message} />
                                                    </div>
                                                    <div className="w-full px-4 md:w-1/2">
                                                        <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ແຮງດັນເຄື່ອງສາກລົດ</CustomInputLabel> </label>
                                                        <Controller
                                                            name="charger_power"
                                                            control={control}
                                                            render={({ field: { name, onChange, value } }) => (
                                                                <Select
                                                                    options={capacitycharger}
                                                                    value={value}
                                                                    onChange={onChange}
                                                                    selectClassName="bg-white"
                                                                    name={name}
                                                                    isRequired={true}
                                                                    error={errors?.charger_power?.message}
                                                                    getOptionValue={(option) => option.value}
                                                                    displayValue={(selected: number) =>
                                                                        capacitycharger.find((option) => option.value === selected)?.name ??
                                                                        selected
                                                                    }
                                                                    suffix="kW"
                                                                    placeholder="7kw/11kw/22kw"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div>
                        {/*4---------------------------------------------ການສອບຖາມຂໍ້ມູນອື່ນໆ---------------------------------------------------------*/}
                        <div className="overflow-hidden py-6 md:py-14">
                            <div className="container">
                                <div className="-mx-2 flex flex-wrap lg:justify-center lg:items-center" >
                                    <div className="w-full px-4 lg:w-10/12 xl:w-8/12">
                                        <div style={{ background: styleCardBG }} className="wow fadeInUp shadow-three dark:bg-gray-dark relative z-10 rounded-sm bg-white p-8 sm:p-11 lg:p-8 xl:p-11" data-wow-delay=".2s" >
                                            <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white w-full text-center">
                                                <HeadLine rank={3} mainContent='ການສອບຖາມຂໍ້ມູນອື່ນໆ' subtext='' frontIcon={false} />
                                            </h3>
                                            <div className={`transition bg-indigo-50`}>
                                                <div className={`accordion-content pt-0 overflow-hidden max-h-0 transition-max-height duration-300 ease max-h-[30rem]`} >
                                                    <HeadlAccordion mainContent='4.1 ທ່ານສົນໃຈ ຕິດຕັ້ງໝໍ້ນັບໄຟແຍກສະເພາະ ເພື່ອນຳໃຊ້ກັບ ເຄື່ອງສາກລົດ EV ສະເພາະຫຼືບໍ ເພື່ອຮັບລາຄາໄຟຟ້າ ແບບນະໂຍບາຍສົ່ງເສີມ ຫຼື ບໍ ?":' peakDescritp={true} flatRate={false} />
                                                </div>
                                            </div>
                                            <div>
                                                <RadioGroup value={agree} setValue={setAgree} className="-mx-2 flex flex-wrap p-2 md:p-10">
                                                    <Radio inputClassName="bg-white" size='lg' className='px-4 w-1/2' label="ສົນໃຈ" value="ສົນໃຈ" />
                                                    <Radio inputClassName="bg-white" size='lg' className="px-4 w-1/2" label="ບໍ່ສົນໃຈ" value="ບໍ່ສົນໃຈ" />
                                                </RadioGroup>
                                            </div>
                                            <div className={`transition bg-indigo-50 mt-4`}>
                                                <div className={`accordion-content pt-0 overflow-hidden max-h-0 transition-max-height duration-300 ease max-h-[30rem]`} >
                                                    <HeadlAccordion mainContent='4.2 ຄ່າໃຊ້ຈ່າຍໃນການຕິດຕັ້ງ ໝໍ້ນັບໄຟແຍກສະເພາະ ເພື່ອນຳໃຊ້ກັບ ເຄື່ອງສາກລົດ EV ໃນຊ່ວງລາຄາເທົ່າໃດທີ່ທ່ານເຫັນວ່າເໝາະສົມ ?' peakDescritp={false} flatRate={true} />
                                                </div>
                                            </div>
                                            <div>
                                                <RadioGroup value={expectCost} setValue={setExpectCost} className="flex flex-wrap p-[1px] md:p-10 mt-5 text-sm md:text-[1rem]">
                                                    {installSmartMeter?.map((item: any) => (<Radio key={item.name} label={item.name} value={item.value} inputClassName="bg-white" className="w-full md:w-1/3 p-[1px] md:px-4" />))}
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div>
                        {/* 5----------------------------------Summit---------------------------------- */}
                        <div className="col-span-full flex items-center justify-center gap-4 mt-20 ml-8">

                            {expectCost !== "ບໍ່ເລືອກ" && agree == "ສົນໃຈ" || agree == "ບໍ່ສົນໃຈ" ?
                                <Button
                                    type="submit"
                                    className="w-full h-[55px] md:w-[10rem] lg:w-[30rem] xl:w-[40rem] bg-[#3734A9]"
                                >
                                    ສົ່ງຂໍ້ມູນ
                                </Button>
                                :
                                <></>}
                        </div>
                    </>
                );
            }}
        </Form >
    );
}