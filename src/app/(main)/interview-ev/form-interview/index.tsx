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
    typemetercost,
    installSmartMeter,
} from '@/app/shared/roles-permissions/utils';
import { HeadLine } from './headLine';
import toast from 'react-hot-toast';
import { CreateFormEVInput, createFormEVSchema } from './create-formev.schema';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Radio, RadioGroup, Textarea } from "rizzui";
import { useGeolocation } from 'react-use';
import { LuArrowRightCircle } from "react-icons/lu";
import { TYPEMETERCOST } from '@/config/constants';
import axios from 'axios';


interface Props {

}
const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 0,
    lng: 0,
};

interface Coords {
    latitude: number;
    longitude: number;
}

interface GoogleMapComponentProps {
    coords: Coords | null;
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
    const handleSelectChange = (selectedValue: string) => {
        setSelectedValue(selectedValue);
    };
    return (
        <>
            {selectedValue !== props.additionCompare ? (
                <Controller
                    name={props.name}
                    control={props.control}
                    render={({ field: { name, onChange, value } }) => (
                        <Select
                            options={props.options}
                            value={value}
                            onChange={(selectedValue: string) => { onChange(selectedValue); handleSelectChange(selectedValue); }}
                            name={name}
                            label={props.label + ' ' + selectedValue}
                            isRequired={true}
                            error={props.errors}
                            getOptionValue={(option) => option.value}
                            displayValue={(selected: string) => props.options.find((option: any) => option.value === selected)?.name ?? selected}
                            placeholder={props.placeholder}
                        />
                    )}
                />
            ) : (
                <Input
                    type='text'
                    label={<CustomInputLabel isRequire={true} >{" " + props.label + ' ອື່ນໆ'}</CustomInputLabel>}
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
    // const [currentStep, setCurrentStep] = React.useState(0);
    const geolocation = useGeolocation();
    const coords: Coords | null = geolocation.latitude !== null && geolocation.longitude !== null
        ? { latitude: geolocation.latitude, longitude: geolocation.longitude }
        : null;
    const [chargeTime, setChargeTime] = React.useState<string>("")
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = (bool: boolean) => {
        setExpanded(bool);
    };
    const [agree, setAgree] = useState<string>('');
    const [agreeInstall, setAgreeInstall] = useState<string>('');
    const [textareaValue, setTextareaValue] = useState<string>("");
    const [optionTOU, setOptionTOU] = useState<string>('');

    const onSubmit: SubmitHandler<CreateFormEVInput> = async (data) => {

        const formattedData = {
            ...data,
            charger_tou_peak_off: agree !== "ສົນໃຈ" ? "ບໍ່ໄດ້ເລືອກ ຊ່ວງເວລາ" : data.charger_tou_peak_off,
            install_cost: agree !== "ສົນໃຈ" ? "0" : data.install_cost,
            latitude: `${coords?.latitude}`,
            longitude: `${coords?.longitude}`,
            electic_bill_policy: agree,
            intrest_install: agreeInstall,
            reason_install: textareaValue,
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
            console.log(formattedData)
            const apiUrl = 'http://192.168.20.76:4004';
            const apiHttp = axios.create({
                baseURL: apiUrl,
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
            console.error('Error:', error.message);
        }
    };
    const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ coords }) => {
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: 'AIzaSyAxhuy4xUQo_dDVXyJJ5ZHzNjXh8bEMlyI',
        });

        const [map, setMap] = useState<google.maps.Map | null>(null);

        const onLoad = (map: google.maps.Map) => {
            setMap(map);
        };

        React.useEffect(() => {
            if (map && coords) {
                const bounds = new window.google.maps.LatLngBounds();
                bounds.extend(new window.google.maps.LatLng(coords.latitude, coords.longitude));
                map.fitBounds(bounds);
            }
        }, [map, coords]);

        return isLoaded ? (
            <>
                {/* <button onClick={() => map?.panTo(coords?.latitude)}> Set location</button> */}
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20} onLoad={onLoad}>
                    {coords && (
                        <Marker position={{ lat: coords.latitude, lng: coords.longitude }} title="Your Location" />
                    )}
                </GoogleMap>
            </>
        ) : null;
    };
    const LocationInput: React.FC = () => {
        return (
            <div className="flex flex-col items-center justify-center space-y-4">
                {coords ? (
                    <p>
                        Latitude: {coords.latitude}, Longitude: {coords.longitude}
                    </p>
                ) : (
                    <p>Loading...</p>
                )}
                <GoogleMapComponent coords={coords} />
            </div>
        );
    };
    const HeadlAccordion: React.FC<Accordion> = ({ mainContent, peakDescritp, flatRate }) => {
        return (
            <div>
                <div className="relative w-full mt-1 h-full">
                    <LuArrowRightCircle style={{ color: "#3758F4", backgroundColor: "white" }} className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full" />
                    <div className="ml-6">
                        <div aria-label="header" className="max-w-screen flex items-center space-x-2">
                            <div className="space-y-0.5 flex-1 ">
                                <h4 className="font-bold text-blue-500">{mainContent}</h4>
                            </div>
                        </div>
                        {peakDescritp == true &&
                            <div aria-label="header" className="max-w-screen flex items-center space-x-2">
                                <div className="space-y-0.5 flex-1 ">
                                    <h6 className="font-bold">1. ຊ່ວງ Peak ເວລາ 9:00 am - 22:00 pm ຈັນ-ສຸກ (ລາຄາແພງກ່ວາແຈ້ງການ)</h6>
                                    <h6 className="font-bold">2. ຊ່ວງ Off Peak: </h6>
                                    <h6 className="font-bold">
                                        <span className="ml-4" /> ເວລາ 22:00 pm - 9:00 am ຈັນ-ສຸກ (ລາຄາປົກກະຕິ ຕາມແຈ້ງການ)
                                        <br />
                                        <span className="ml-4" /> ເວລາ 00:00 am - 24:00 pm (ລາຄາຖືກ):
                                        <br />
                                        <span className="ml-8" />- ວັນເສົາ-ອາທິດ ແລະ ວັນຫຍຸດແຈ້ງການລັດຖະການ (ບໍ່ລວມວັນຊົດເຊີຍ)
                                        <br />
                                        <span className="ml-8" />- ວັນກຳມະກອນ
                                    </h6>
                                </div>
                            </div>
                        }

                        {flatRate == true &&
                            <div aria-label="header" className="max-w-screen flex items-center space-x-2">
                                <div className="space-y-0.5 flex-1 ">
                                    <h6 className="font-bold">1. ຊ່ວງ flatRate ເວລາ 9:00 am - 22:00 pm ຈັນ-ອາທິດ (ລາຄາແຈ້ງການ)</h6>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }

    return (
        <Form<CreateFormEVInput>
            resetValues={reset}
            onSubmit={onSubmit}
            validationSchema={createFormEVSchema}
            className='h-full'
        >
            {({ register, control, watch, formState: { errors } }) => {
                console.log('errors', errors);
                return (
                    <>
                        {/* <div>
                            <Stepper currentIndex={currentStep} className="w-full">
                                <Step
                                    color="success"
                                    title="Login"

                                />
                                <Step
                                    status="error"
                                    color="danger"
                                    title="Verification"
                                />
                                <Step
                                    title="Pay"
                                />
                                <Step
                                    title="Done"
                                />
                            </Stepper>
                        </div> */}
                        <div className="border-l-2 border-dashed" >
                            <HeadLine mainContent='ຂໍ້ມູນທົ່ວໄປຂອງຜູ້ຊົມໃຊ້' subtext='' frontIcon={false} />
                            <div style={{ marginLeft: "3rem" }}>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        type='text'
                                        label={<CustomInputLabel isRequire={true}>ຊື່</CustomInputLabel>}
                                        placeholder="ຊື່ທ່ານ"
                                        {...register('first_name')}
                                        error={errors.first_name?.message}
                                    />

                                    <Input
                                        type="text"
                                        label={<CustomInputLabel isRequire={true}>ນາມສະກຸນ</CustomInputLabel>}
                                        placeholder="ປ້ອນ ນາມສະກຸນ"
                                        {...register('last_name')}
                                        error={errors.last_name?.message}
                                    />
                                </div>
                                <Input
                                    type='number'
                                    label={<CustomInputLabel isRequire={true}>ເບີໂທຕິດຕໍ່ ຫຼື Whatapp</CustomInputLabel>}
                                    placeholder="Tel:"
                                    className="col-span-full mt-1"
                                    {...register('phone_number')}
                                    error={errors.phone_number?.message}
                                />
                                <div style={{ marginTop: "1rem" }}>
                                    <div className="space-y-0.5 flex-1 mb-1">
                                        <CustomInputLabel isRequire={true} >ທີ່ຢູ່ປະຈຸບັນ:</CustomInputLabel>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Input
                                            label=""
                                            placeholder="ບ້ານ *"
                                            {...register('village')}
                                            error={errors.village?.message}
                                        />
                                        <Input
                                            label=""
                                            placeholder="ເມືອງ *"
                                            {...register('city')}
                                            error={errors.city?.message}
                                        />
                                        <Input
                                            label=""
                                            placeholder="ແຂວງ *"
                                            {...register('province')}
                                            error={errors.province?.message}
                                        />
                                    </div>
                                </div>
                                <Input
                                    type='number'
                                    label={<CustomInputLabel isRequire={true}>ເລກບັນຊີຜູ້ຊົມໃຊ້ໄຟ</CustomInputLabel>}
                                    placeholder="ປ້ອນ ເລກບັນຊີ"
                                    className="col-span-full mt-1"
                                    {...register('meter_account', {
                                        setValueAs: (value: string) => {
                                            const parsedValue = parseFloat(value);
                                            return isNaN(parsedValue) ? undefined : parsedValue;
                                        },
                                    })}
                                    error={errors.meter_account?.message}
                                />
                                <LocationInput />
                            </div>
                        </div>
                        <div className="border-l-2 border-dashed" >
                            <HeadLine mainContent='ການຊົມໃຊ້ລົດ EV' subtext='' frontIcon={false} />
                            <div className="grid grid-cols-2 gap-4" style={{ marginLeft: "3rem" }}>
                                <Input
                                    type='text'
                                    label={<CustomInputLabel isRequire={true} >ຍີ່ຫໍ້ລົດ</CustomInputLabel>}
                                    placeholder="ກະລຸນາ ປ້ອນ ຊື້"
                                    {...register('car_banner')}
                                    error={errors.car_banner?.message}
                                />
                                <Input
                                    type='text'
                                    label={<CustomInputLabel isRequire={false} >ລຸ້ນ</CustomInputLabel>}
                                    placeholder="ປ້ອນ ລຸ້ນ"
                                    {...register('car_model')}
                                // error={errors.car_model?.message}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4" style={{ marginLeft: "3rem" }}>
                                <Input
                                    type="number"
                                    label="ຂະໜາດຂອງ battery"
                                    suffix="kWh"
                                    placeholder="ປ້ອນຈຳນວນ"
                                    {...register('car_battery', {
                                        setValueAs: (value: string) => {
                                            const parsedValue = parseFloat(value);
                                            return isNaN(parsedValue) ? 0 : parsedValue;
                                        },
                                    })}
                                />
                                <DynamicForm
                                    register={register}
                                    name="car_port"
                                    label="ປະເພດຫົວສາກ"
                                    options={typechargerport}
                                    errors={errors.car_port?.message}
                                    placeholder="ເລືອກ ປະເພດຫົວ"
                                    additionCompare={typechargerport[2]?.value}
                                    control={control}
                                />
                            </div>
                        </div>
                        <div className="border-l-2 border-dashed" >
                            <HeadLine mainContent='ອຸປະກອນສາກລົດ' subtext='' frontIcon={false} />
                            <div style={{ marginLeft: "3rem" }}>
                                <Controller
                                    name="type_charger"
                                    control={control}
                                    render={({ field: { name, onChange, value } }) => (
                                        <Select
                                            options={typeevcharger}
                                            value={value}
                                            onChange={onChange}
                                            name={name}
                                            label="ປະເພດທີ່ນໍາໃຊ້ເຄື່ອງສາກລົດ"
                                            isRequired={true}
                                            className="col-span-full"
                                            error={errors?.type_charger?.message}
                                            getOptionValue={(option) => option.value}
                                            displayValue={(selected: string) =>
                                                typeevcharger.find((option) => option.value === selected)?.name ??
                                                selected
                                            }
                                            placeholder="ເລືອກ ເຄື່ອງສາກ"
                                        />
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4" style={{ marginTop: "1rem" }}>
                                    <Input
                                        label="ຍີ່ຫໍ້ຂອງເຄື່ອງສາກ"
                                        placeholder="ປ້ອນຍີ່ຫໍ້"
                                        {...register('charger_banner')}
                                        error={errors.charger_banner?.message}
                                    />
                                    <Controller
                                        name="charger_power"
                                        control={control}
                                        render={({ field: { name, onChange, value } }) => (
                                            <Select
                                                options={capacitycharger}
                                                value={value}
                                                onChange={onChange}
                                                name={name}
                                                label="ແຮງດັນເຄື່ອງສາກລົດ"
                                                isRequired={true}
                                                error={errors?.charger_power?.message}
                                                getOptionValue={(option) => option.value}
                                                displayValue={(selected: number) =>
                                                    capacitycharger.find((option) => option.value === selected)?.name ??
                                                    selected
                                                }
                                                suffix="kW"
                                                placeholder="EX: 11 kW"
                                            />
                                        )}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="border-l-2 border-dashed" >
                            <HeadLine mainContent='ທ່ານສົນໃຈຕິດຕັ້ງ ໝໍ້ນັບໄຟ ແຍກສະເພາະ ແລະ ສາກລົດໄຟຟ້າເພື່ອຮັບນະໂຍບາຍລາຄາໄຟບໍ? ' subtext='' frontIcon={false} />
                            <div style={{ marginLeft: "3rem" }}>
                                <div style={{ marginTop: "1rem" }}>
                                    <div>
                                        <RadioGroup value={agree} setValue={setAgree} className="grid grid-cols-2 gap-4">
                                            <Radio label="ສົນໃຈ" value="ສົນໃຈ" onClick={() => { toggleAccordion(true), setAgreeInstall("ສົນໃຈ"), setTextareaValue("ສົນໃຈ ຕິດຕັ້ງ Smart Meter") }} />
                                            <Radio label="ບໍ່ສົນໃຈ" value="ບໍ່ສົນໃຈ" onClick={() => { setChargeTime(""), toggleAccordion(false), setAgreeInstall("ບໍ່ສົນໃຈ"), setTextareaValue("ບໍ່ສົນໃຈ ຮັບນະໂຍບາຍລາຄາໄຟສາກລົດ") }} />
                                        </RadioGroup>
                                    </div>
                                    <div className={`transition ${isExpanded ? 'bg-indigo-50' : ''}`}>
                                        {/* Body Content */}
                                        <div className={`accordion-content px-5 pt-0 overflow-hidden max-h-0 transition-max-height duration-300 ease ${isExpanded ? 'max-h-[50rem] md:max-h-[45rem]' : ''}`} >
                                            {/* Header */}
                                            <div className='mt-4'>
                                                <Controller
                                                    name="charger_tou_peak_off"
                                                    control={control}
                                                    render={({ field: { name, onChange, value } }) => (
                                                        <Select
                                                            options={typemetercost}
                                                            isRequired={true}
                                                            defaultValue={'ບໍ່ໄດ້ເລືອກ ຊ່ວງເວລາ'}
                                                            value={value}
                                                            onChange={(selectedOption: any) => {
                                                                onChange(selectedOption);
                                                                setChargeTime(selectedOption);
                                                            }}
                                                            name={name}
                                                            label="ຄ່າໄຟສໍາລັບ Meter ສະເພາະເຄື່ອງສາກລົດໄຟຟ້າທີ່ທ່ານຄິດວ່າເໝາະສົມ?"
                                                            className="col-span-full"
                                                            error={errors?.charger_tou_peak_off?.message}
                                                            getOptionValue={(option) => option.value}
                                                            displayValue={(selected: string) =>
                                                                typemetercost.find((option) => option.value === selected)?.name ??
                                                                selected
                                                            }
                                                            placeholder="ຕ້ອງປະກອບ: ຄ່າໝໍ້ນັບໄຟ ສຳລັບເຄື່ອງສາກ"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className="accordion-header cursor-pointer transition flex items-center h-full mt-5">
                                                <div className={`transition ${chargeTime == TYPEMETERCOST.peakofpeak ? 'bg-indigo-50' : ''}`}>
                                                    <div className={`accordion-content  pt-0 overflow-hidden max-h-0 transition-max-height duration-300 ease ${chargeTime == TYPEMETERCOST.peakofpeak ? 'px-5 max-h-[30rem]' : ''}`} >
                                                        {chargeTime == TYPEMETERCOST.peakofpeak && <HeadlAccordion mainContent='ເວລານຳໃຊ້ "Time of Use (TOU)":' peakDescritp={true} flatRate={false} />}
                                                    </div>
                                                </div>
                                                <div className={`transition ${chargeTime == TYPEMETERCOST.flatrate ? 'bg-indigo-50' : ''}`}>
                                                    <div className={`accordion-content  pt-0 overflow-hidden max-h-0 transition-max-height duration-300 ease ${chargeTime == TYPEMETERCOST.flatrate ? 'px-5 max-h-[30rem]' : ''}`} >
                                                        {chargeTime == TYPEMETERCOST.flatrate && <HeadlAccordion mainContent='ລາຄາຕະຫຼອດ 24 ຊົ່ວໂມງ (Flat rate)":' peakDescritp={false} flatRate={true} />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-full">
                                                <HeadlAccordion mainContent='ຄ່າໃຊ້ຈ່າຍໃນການຕິດຕັ້ງ Smart Meter:' peakDescritp={false} flatRate={false} />
                                            </div>
                                            <div className='mt-4'>
                                                <div className='mt-3'>
                                                    <Controller
                                                        name="install_cost"
                                                        control={control}
                                                        render={({ field: { name, onChange, value } }) => (
                                                            <Select
                                                                options={installSmartMeter}
                                                                isRequired={true}
                                                                value={value}
                                                                onChange={(selectedOption: any) => {
                                                                    onChange(selectedOption);
                                                                    setOptionTOU(selectedOption);
                                                                }}
                                                                name={name}
                                                                label="ຄ່າຕິດຕັ້ງ ທີວ່າເໝາະສົມ?"
                                                                className="col-span-full"
                                                                error={errors?.install_cost?.message}
                                                                getOptionValue={(option) => option.value}
                                                                displayValue={(selected: string) =>
                                                                    installSmartMeter.find((option) => option.value === selected)?.name ??
                                                                    selected
                                                                }
                                                                placeholder="ຕ້ອງປະກອບ: ຄ່າໝໍ້ນັບໄຟທັນສະໄໝ"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                                <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-full">
                                                    <HeadlAccordion mainContent='ທ່ານສົນໃຈຕິດຕັ້ງ Smart Meter' peakDescritp={false} flatRate={false} />
                                                </div>
                                                <div className='mt-3 max-h-[20rem] m-10 p-2 '>
                                                    <RadioGroup value={agreeInstall} setValue={setAgreeInstall} className="grid grid-cols-2 gap-4 p-5">
                                                        <Radio label="ສົນໃຈ" value="ສົນໃຈ" onClick={() => setTextareaValue("ສົນໃຈ ຕິດຕັ້ງ Smart Meter")} />
                                                        <Radio label="ບໍ່ສົນໃຈ" value="ບໍ່ສົນໃຈ" onClick={() => setTextareaValue("ບໍ່ສົນໃຈ ຍ້ອນວ່າ:")} />
                                                    </RadioGroup>
                                                    <div className="accordion-header cursor-pointer transition flex items-center w-full max-h-[10rem]  mt-5">
                                                        <div className={`transition w-full ${agreeInstall === "ບໍ່ສົນໃຈ" ? 'bg-indigo-50' : ''}`}>
                                                            <div className={`accordion-content w-full pt-0 overflow-hidden max-h-0 transition-max-height duration-300 ease ${agreeInstall === "ບໍ່ສົນໃຈ" ? 'px-3 max-h-full' : ''}`} >
                                                                <Textarea
                                                                    label={<h6>ສະເຫດທີທ່ານ ບໍ່ສົນໃຈຕິດຕັ້ງ</h6>}
                                                                    variant="text"
                                                                    value={textareaValue}
                                                                    onChange={(e) => setTextareaValue(e.target.value)}
                                                                    className="w-full h-[10rem]"
                                                                    placeholder="ປະກອບຄຳເຫັນຂອງທ່ານ"
                                                                    name="agreeInstallSmartMeter"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full flex items-center justify-center gap-4 mt-20 ml-8">

                            {chargeTime !== "" && optionTOU !== "" && agree == "ສົນໃຈ" || agree == "ບໍ່ສົນໃຈ" ?
                                <Button
                                    type="submit"
                                    className="w-full xl:w-auto dark:bg-gray-200 dark:text-white dark:active:enabled:bg-gray-300"
                                >
                                    ບັນທຶກ
                                </Button>
                                :
                                <></>}
                        </div>
                    </>
                );
            }}
        </Form>
    );
}