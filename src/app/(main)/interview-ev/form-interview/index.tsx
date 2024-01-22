//slide-show
'use client';
import React, { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Select from '@/components/ui/select';
import { MdElectricMeter } from "react-icons/md";
import { typeevcharger, capacitycharger, typechargerport, installSmartMeter, carBanner, provincesList, getDistrict, getVillages } from '@/app/shared/roles-permissions/utils';
import { HeadLine } from './headLine';
import toast from 'react-hot-toast';
import { CreateFormEVInput, createFormEVSchema, placholder } from './create-formev.schema';
import { Radio, RadioGroup, } from "rizzui";
import { electricCarData } from '@/config/constants';
// import { RiArrowGoBackFill } from "react-icons/ri";
import axios from 'axios';
import Image from 'next/image';
import { ACCCS2, ACGBT, DCCCS2, DCGBT } from './icon';
import GoogleMapComponent from './google-map';
import Link from 'next/link';
import { Districts, Villages } from '@/config/countryconstants';

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
    value: any;
    setvalue: any;
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
    <div >
        {children}
        {isRequire == true && <Asterisk />}
    </div>
);

const DynamicForm: React.FC<DynamicFormProps> = (props) => {
    // const [selectedValue, setSelectedValue] = useState<string>('');

    return (
        <>
            <RadioGroup value={props.value} setValue={props.setvalue} className="grid grid-cols-1 sm:grid-cols-3 mx-auto gap-2 md:gap-4">
                {props?.options.map((item: any) => (
                    <div className="flex justify-items-stretch items-center" key={item.value}>
                        <div className="flex-none mx-3">
                            <Radio
                                name={props.name}
                                value={item.value}
                                checked={item.value === props.value}
                                inputClassName='bg-white'
                                size="xl"
                            />
                        </div>
                        <div
                            {...props.register(props.name)}
                            onClick={() => props.setvalue(item.value)}
                            className={`grid grid-cols-4 gap-4 relative bg-white shadow-lg rounded-md w-[12rem] ${item.name === "ETC" ? "h-24 flex justify-center items-center" : "h-24"} hover:ring-2 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md transition-transform duration-300 transform hover:scale-110 text-center`}
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
            {props.value === props.additionCompare && (
                <div className='mt-[1rem]'>
                    <label className="mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ເພີ່ມ ປະເພດຫົວສາກ ອື່ນໆ</CustomInputLabel> </label>
                    <Input
                        type='text'
                        inputClassName='bg-white'
                        onChange={(value) => props.setvalue(value)}
                        // suffix={<RiArrowGoBackFill className='hover:duration-200 transition-transform duration-300 transform hover:scale-110 hover:text-bold' onClick={() => { props.setvalue("") }} />}
                        placeholder={placholder.car_port}
                        {...props.register(props.name)}
                        error={props.value == "" ? "ກະລຸນາປ້ອນ" : undefined}
                    />
                </div>
            )}
        </>
    );
};


export const FormInterview = (props: Props) => {
    const [reset, setReset] = React.useState({});
    const styleCardBG = "rgb(74 108 247/3%)";
    const [cartport, setCarPort] = useState<string>('');
    const [carmodel, setCarmodel] = React.useState<string>("")
    const [selectedProvince, setSelectedProvince] = useState<string | undefined>(undefined);
    const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
    const selectedCar = (carmodel: any) => {
        return electricCarData.find((car) => car.name === carmodel);
    };


    const selectedCarObject = selectedCar(carmodel);
    const modelsArray = selectedCarObject?.models || [];
    const carmodels = Object.entries(modelsArray).map(([key, value]) => ({ name: value, value: value, }));
    ///address EV user 
    const districts = getDistrict(selectedProvince);
    const villages = getVillages(selectedDistrict);
    //ETC state
    const [agree, setAgree] = useState<string>('');
    const [expectCost, setExpectCost] = useState<string>('none');
    const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
    const [done, setDone] = useState<boolean>(false);

    const HeadlAccordion: React.FC<Accordion> = ({ mainContent, peakDescritp, flatRate }) => {
        return (
            <div>
                <div className="relative w-full mt-1 h-full">
                    {/* <LuArrowRightCircle style={{ color: "#3758F4", backgroundColor: "white" }} className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full" /> */}
                    <div className=" md:ml-6">
                        <div aria-label="header" className="max-w-screen flex items-center space-x-2">
                            <div className="flex-1 ">
                                <h4 className="font-bold text-[14.35345px] md:text-[24]">{mainContent}</h4>
                            </div>
                        </div>
                        {peakDescritp == true &&
                            <div aria-label="header" className="max-w-screen space-x-2 p-4">
                                <h4 className="font-bold text-[14.35345px] md:text-[24]">ລາຄານຳໃຊ້ໄຟຟ້າສຳລັບລົດ EV ແບບນະໂຍບາຍຈະເປັນຮູບແບບ Time of Use (TOU) ເຊີ່ງຈະກຳນົດເປັນຊ່ວງເວລາ ເຊັ່ນ:</h4>
                                <div className="space-y-0.5 ">
                                    <ul className="list-disc space-4">
                                        <li> <h5 className="font-bold text-[14.35345px] md:text-[24]"> ຊ່ວງ Peak ເວລາແຕ່ 9:00 ຫາ 22:00 ວັນຈັນ-ວັນສຸກ</h5></li>
                                        <li> <h5 className="font-bold text-[14.35345px] md:text-[24]"> ຊ່ວງ Off-Peak ເວລາແຕ່ 22:00 ຫາ 9:00 ວັນຈັນ-ວັນສຸກ ແລະ  0:00 ຫາ 24:00 ວັນເສົາ-ວັນອາທິດ ວັນພັກລັດຖະການ </h5></li>
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
    const handleLinkClick = (value: string) => {
        // Set local storage when the link is clicked
        localStorage.setItem('routerpath', value);
    };
    const onSubmit: SubmitHandler<CreateFormEVInput> = async (data) => {

        const formattedData = {
            ...data,
            car_model: data.car_model === "" ? "none" : data.car_model,
            car_port: cartport,
            charger_banner: data.charger_banner === "" ? "none" : data.charger_banner,
            charger_tou_peak_off: agree !== "ສົນໃຈ" ? "none" : agree,
            install_cost: expectCost === "" ? "none" : expectCost,
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
                    setDone(true)
                    setReset({
                        first_name: "", last_name: "", phone_number: "", village: "", city: "", province: "", meter_account: '', car_banner: "", car_model: "", car_battery: '', type_charger: "", charger_banner: "", charger_power: '', charger_tou_peak_off: "", install_cost: "",
                    })
                    setAgree("")
                    setExpectCost("ບໍ່ເລືອກ")
                    setMarkerPosition({ lat: 0, lng: 0 })
                } catch (error) {
                    // Handle errors here
                    reject(error);
                }
            }, 2000); // Simulating a 1-second delay
        });
        if (cartport === "") {
            toast.error("ເລືອກປະເພດຫົວສາກ");

        } else {
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
                if (error.response) {
                    // The request was made, but the server responded with a status code
                    // console.error('Server responded with an error status:', error.response.status);
                    // console.error('Response data:', error.response.data);
                    toast.error(error.response.status);
                } else if (error.request) {
                    // The request was made, but no response was received.
                    // console.error('No response received from the server.');
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
                    // console.error('Error setting up the request:', error.message);
                    toast.error(error.message, {
                    });
                }
            }
        }
    };

    return (
        <div className={`${done === true ? "h-screen" : "h-full"}`}>
            <Form<CreateFormEVInput> resetValues={reset} onSubmit={onSubmit} validationSchema={createFormEVSchema} className={`h-full ${done === true ? "hidden" : "h-full"}`} >
                {({ register, control, watch, formState: { errors } }) => {
                    console.log('errors', errors);
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
                                                    <div className="w-1/2 px-4 md:w-1/2">
                                                        <div className="mb-8">
                                                            <label
                                                                htmlFor="number"
                                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                                            ><CustomInputLabel isRequire={true}>ຊື່</CustomInputLabel>
                                                            </label>
                                                            <Input
                                                                type='text'
                                                                inputClassName='bg-white'
                                                                className='placeholder:tex-gay-400/0'
                                                                placeholder={placholder.firstname}
                                                                {...register('first_name')}
                                                                error={errors.first_name?.message}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-1/2 px-4 md:w-1/2">
                                                        <div className="mb-8">
                                                            <label className="mb-3 block text-sm font-medium text-dark dark:text-white"  > <CustomInputLabel isRequire={true}>ນາມສະກຸນ</CustomInputLabel> </label>
                                                            <Input
                                                                type="text"
                                                                inputClassName='bg-white'
                                                                placeholder={placholder.lastname}
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
                                                                placeholder={placholder.phonenumber}
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
                                                                placeholder={placholder.electric_acc}
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
                                                        {/* <Input
                                                            placeholder={placholder.province}
                                                            className='w-full'
                                                            inputClassName='bg-white'
                                                            {...register('province')}
                                                            error={errors.province?.message}
                                                        /> */}
                                                        <Controller
                                                            name="province"
                                                            control={control}
                                                            render={({ field: { name, onChange, value } }) => (
                                                                <Select
                                                                    name={name}
                                                                    options={provincesList}
                                                                    value={value}
                                                                    onChange={(selectedOption: any) => {
                                                                        onChange(selectedOption);
                                                                        setSelectedProvince(provincesList.find((option) => option.value === selectedOption)?.key);
                                                                    }}
                                                                    selectClassName="bg-white"
                                                                    getOptionValue={(option) => option.value}
                                                                    displayValue={(selected: string) =>
                                                                        provincesList.find((option) => option.value === selected)?.name ??
                                                                        selected
                                                                    }
                                                                    error={errors.province?.message}
                                                                    placeholder={placholder.province}
                                                                />
                                                            )}
                                                        />

                                                    </div>
                                                    <div className="w-full px-4 md:w-1/3">
                                                        <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ເມືອງ</CustomInputLabel> </label>
                                                        {/* <Input
                                                            className='w-full mt-4 md:mt-0'
                                                            placeholder={placholder.city}
                                                            inputClassName='bg-white'
                                                            {...register('city')}
                                                            error={errors.city?.message}
                                                        /> */}
                                                        <Controller
                                                            name="city"
                                                            control={control}
                                                            render={({ field: { name, onChange, value } }) => (
                                                                <Select
                                                                    name={name}
                                                                    options={districts}
                                                                    value={value}
                                                                    onChange={(selectedOption: any) => {
                                                                        onChange(selectedOption);
                                                                        setSelectedDistrict(districts.find((option) => option.value === selectedOption)?.key);
                                                                    }}
                                                                    selectClassName="bg-white"
                                                                    getOptionValue={(option) => option.value}
                                                                    displayValue={(selected: string) =>
                                                                        districts.find((option) => option.value === selected)?.name ??
                                                                        selected
                                                                    }
                                                                    error={errors.city?.message}
                                                                    placeholder={placholder.city}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="w-full px-4 md:w-1/3">
                                                        <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ບ້ານ</CustomInputLabel> </label>
                                                        {/* <Input
                                                            className='w-full mt-4 md:mt-0'
                                                            placeholder={placholder.village}
                                                            inputClassName='bg-white'
                                                            {...register('village')}
                                                            error={errors.village?.message}
                                                        /> */}
                                                        <Controller
                                                            name="village"
                                                            control={control}
                                                            render={({ field: { name, onChange, value } }) => (
                                                                <Select
                                                                    name={name}
                                                                    options={villages}
                                                                    value={value}
                                                                    onChange={onChange}
                                                                    selectClassName="bg-white"
                                                                    getOptionValue={(option) => option.value}
                                                                    displayValue={(selected: string) =>
                                                                        villages.find((option) => option.value === selected)?.name ??
                                                                        selected
                                                                    }
                                                                    error={errors.village?.message}
                                                                    placeholder={placholder.village}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full text-left mt-5 mb-5 text-[0.9rem] font-black"><CustomInputLabel isRequire={true}>ຈຸດພິກັດບ່ອນຊົມໃຊ້ໄຟ</CustomInputLabel> </div>
                                                <GoogleMapComponent markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 2-----------------------------------------------------------ຂໍ້ມູນການຊົມໃຊ້ລົດໄຟຟ້າ----------------------------------------------------------------------------------- */}
                            <div className="overflow-hidden ">
                                <div className="container">
                                    <div className="flex flex-wrap lg:justify-center lg:items-center">
                                        <div className="w-full lg:w-7/12 xl:w-8/12">
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
                                                                        placeholder={placholder.car_banner}
                                                                    />
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-full px-4 md:w-1/2">
                                                        <div className="mb-8">
                                                            <label className="mb-3 block text-sm font-medium text-dark dark:text-white"> ລຸ້ນ </label>
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
                                                                        placeholder={placholder.car_model}
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
                                                                inputClassName='bg-white'
                                                                placeholder={placholder.car_battery}
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
                                                        <div className="mb-[1rem]">
                                                            <label className="mb-3 block text-sm font-medium text-dark dark:text-white"  > <CustomInputLabel isRequire={true}>ປະເພດຫົວສາກ</CustomInputLabel> </label>
                                                            <DynamicForm
                                                                value={cartport}
                                                                setvalue={setCarPort}
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
                                        <div className="w-full lg:w-7/12 xl:w-8/12">
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
                                                                placeholder={placholder.type_charger}
                                                            />
                                                        )}
                                                    />
                                                    <div className="-mx-4 flex flex-wrap" style={{ marginTop: "1rem" }}>
                                                        <div className="w-full px-4 md:w-1/2">
                                                            <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white">ຍີ່ຫໍ້ຂອງເຄື່ອງສາກ </label>
                                                            <Input placeholder={placholder.charger_banner} inputClassName='bg-white' {...register('charger_banner')} error={errors.charger_banner?.message} />
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
                                                                        placeholder={placholder.charger_power}
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
                            <div className="overflow-hidden py-6 md:py-6">
                                <div className="container">
                                    <div className="flex flex-wrap lg:justify-center lg:items-center">
                                        <div className="w-full lg:w-7/12 xl:w-8/12">
                                            <div style={{ background: styleCardBG }} className="wow fadeInUp shadow-three dark:bg-gray-dark relative z-10 rounded-sm bg-white p-8 sm:p-11 lg:p-8 xl:p-11" data-wow-delay=".2s" >
                                                <h3 className="mb-4 text-2xl font-bold leading-tight text-black w-full text-center">
                                                    <HeadLine rank={3} mainContent='ການສອບຖາມຂໍ້ມູນອື່ນໆ' subtext='' frontIcon={false} />
                                                </h3>
                                                <div className={`transition bg-indigo-50`}>
                                                    <div className={`accordion-content pt-0 overflow-hidden max-h-0 transition-max-height duration-300 ease max-h-[30rem]`} >
                                                        <HeadlAccordion mainContent='4.1 ທ່ານສົນໃຈ ຕິດຕັ້ງໝໍ້ນັບໄຟແຍກສະເພາະ ເພື່ອນຳໃຊ້ກັບ ເຄື່ອງສາກລົດ EV ສະເພາະຫຼືບໍ ເພື່ອຮັບລາຄາໄຟຟ້າ ແບບນະໂຍບາຍສົ່ງເສີມ ຫຼື ບໍ?' peakDescritp={true} flatRate={false} />
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
                                                    <RadioGroup value={expectCost} setValue={setExpectCost} className="flex flex-wrap p-[1px] md:p-10 mt-5 text-sm md:text-[4rem]">
                                                        {installSmartMeter?.map((item: any) => (<Radio key={item.name} label={item.name} value={item.value} inputClassName="bg-white" size='lg' className="w-full md:w-1/3 p-4 md:px-4" />))}
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            </div>
                            {/* 5----------------------------------Summit---------------------------------- */}
                            <div className="col-span-full flex items-center justify-center gap-4 mb-[1rem]">
                                <Button type="submit" className="w-full h-[55px] md:w-[10rem] lg:w-[30rem] xl:w-[40rem] bg-[#3734A9]"  >
                                    ສົ່ງຂໍ້ມູນ
                                </Button>
                            </div>
                        </>
                    );
                }}
            </Form >
            <div className={`${done === true ? "h-full" : "hidden"}`} >
                <div className="bg-white p-6  md:mx-auto">
                    <svg viewBox="0 0 24 24" className="text-[#3DB43A] w-[10rem] h-[10rem] mx-auto my-6 p-3">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div className="text-center">
                        <h1 className="text-[3rem] md:text-[4rem] text-gray-900 font-semibold text-center">ຂອບໃຈ</h1>
                        <h6 className=" text-base  mb-5 mt-6">ສຳລັບຄວາມຮ່ວມມືໃນການ</h6>
                        <h6 className=" text-base mt-5"> ສະໜອງຂໍ້ມູນໃຫ້ພວກເຮົາ  </h6>
                        <div className="py-5 text-center" >
                            <Link href={"./"} onClick={() => handleLinkClick("home")}>
                                <Button onClick={() => setDone(false)} className=" w-[10rem] bg-[#4e71c8] hover:bg-[#3734A9] focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                                    <div className='flex items-center justify-center h-full'>
                                        <MdElectricMeter size={22} /> Home
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}