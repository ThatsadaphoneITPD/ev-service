//slide-show
'use client';
import React, { useState, ChangeEvent } from 'react';
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
import { CreateFormEVInput, createFormEVSchema } from './create-formev.schema';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Radio, RadioGroup, Textarea } from "rizzui";
import { useGeolocation } from 'react-use';
import { TYPEMETERCOST } from '@/config/constants';

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
                            error={props.errors?.typeCharger?.message}
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
    const geolocation = useGeolocation();
    const coords: Coords | null = geolocation.latitude !== null && geolocation.longitude !== null
        ? { latitude: geolocation.latitude, longitude: geolocation.longitude }
        : null;
    const [isLoading, setLoading] = React.useState(false);
    const [chargeTime, setChargeTime] = React.useState<string>("")
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = (bool: boolean) => {
        setExpanded(bool);
    };
    const [agree, setAgree] = useState<string>('');
    const [agreeInstall, setAgreeInstall] = useState<string>('');
    const [textareaValue, setTextareaValue] = useState<string>("");

    const onSubmit: SubmitHandler<CreateFormEVInput> = (data) => {
        // set timeout ony required to display loading state of the create category button
        const formattedData = {
            ...data,
            createdAt: new Date(),
            latitude: coords?.latitude,
            longitude: coords?.longitude
        };


        setLoading(true);
        setTimeout(() => {
            console.log('formattedData', formattedData);
            setLoading(false);
            // setReset({
            //     fullName: '',
            //     email: '',
            //     role: '',
            //     permissions: '',
            //     status: '',
            // });
            // closeModal();
        }, 600);
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke="#2f54eb" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

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
                        <div className="border-l-2 border-dashed" >
                            <HeadLine mainContent='ຂໍ້ມູນທົ່ວໄປຂອງຜູ້ຊົມໃຊ້' subtext='' frontIcon={false} />
                            <div style={{ marginLeft: "3rem" }}>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        type='text'
                                        label={<CustomInputLabel isRequire={true}>ຊື່</CustomInputLabel>}
                                        placeholder="ຊື່ທ່ານ"
                                        {...register('firstName')}
                                        error={errors.firstName?.message}
                                    />

                                    <Input
                                        type="text"
                                        label={<CustomInputLabel isRequire={true}>ນາມສະກຸນ</CustomInputLabel>}
                                        placeholder="ປ້ອນ ນາມສະກຸນ"
                                        {...register('lastName')}
                                        error={errors.lastName?.message}
                                    />
                                </div>
                                <Input
                                    type='number'
                                    label={<CustomInputLabel isRequire={true}>ເບີໂທຕິດຕໍ່ ຫຼື Whatapp</CustomInputLabel>}
                                    placeholder="Tel:"
                                    className="col-span-full mt-1"
                                    {...register('phonNumber', {
                                        setValueAs: (value: string) => {
                                            const parsedValue = parseFloat(value);
                                            return isNaN(parsedValue) ? undefined : parsedValue;
                                        },
                                    })}
                                    error={errors.phonNumber?.message}
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
                                    {...register('meterAccount', {
                                        setValueAs: (value: string) => {
                                            const parsedValue = parseFloat(value);
                                            return isNaN(parsedValue) ? undefined : parsedValue;
                                        },
                                    })}
                                    error={errors.meterAccount?.message}
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
                                    {...register('carBanner')}
                                    error={errors.carBanner?.message}
                                />
                                <Input
                                    type='text'
                                    label={<CustomInputLabel isRequire={false} >ລຸ້ນ</CustomInputLabel>}
                                    placeholder="ປ້ອນ ລຸ້ນ"
                                    {...register('carModel')}
                                // error={errors.carModel?.message}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4" style={{ marginLeft: "3rem" }}>
                                <Input
                                    type="number"
                                    label="ຂະໜາດຂອງ battery"
                                    suffix="kWh"
                                    placeholder="ປ້ອນຈຳນວນ"
                                    {...register('carbattery', {
                                        setValueAs: (value: string) => {
                                            const parsedValue = parseFloat(value);
                                            return isNaN(parsedValue) ? undefined : parsedValue;
                                        },
                                    })}
                                />
                                <DynamicForm
                                    register={register}
                                    name="carPort"
                                    label="ປະເພດຫົວສາກ"
                                    options={typechargerport}
                                    errors={errors.carPort?.message}
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
                                    name="typeCharger"
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
                                            error={errors?.typeCharger?.message}
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
                                        {...register('chargerBanner')}
                                        error={errors.chargerBanner?.message}
                                    />
                                    <Controller
                                        name="chargerPower"
                                        control={control}
                                        render={({ field: { name, onChange, value } }) => (
                                            <Select
                                                options={capacitycharger}
                                                value={value}
                                                onChange={onChange}
                                                name={name}
                                                label="ແຮງດັນເຄື່ອງສາກລົດ"
                                                isRequired={true}
                                                error={errors?.chargerPower?.message}
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
                                            <Radio label="ບໍ່ສົນໃຈ" value="ບໍ່ສົນໃຈ" onClick={() => { toggleAccordion(false), setAgreeInstall("ບໍ່ສົນໃຈ"), setTextareaValue("ບໍ່ສົນໃຈ ຮັບນະໂຍບາຍລາຄາໄຟສາກລົດ"), setReset({ chargerTOUPeakOff: "", installCost: "" }), setChargeTime("") }} />
                                        </RadioGroup>
                                    </div>
                                    <div className={`transition ${isExpanded ? 'bg-indigo-50' : ''}`}>
                                        {/* Body Content */}
                                        <div className={`accordion-content px-5 pt-0 overflow-hidden max-h-0 transition-max-height duration-300 ease ${isExpanded ? 'max-h-[50rem] md:max-h-[45rem]' : ''}`} >
                                            {/* Header */}
                                            <div className='mt-4'>
                                                <Controller
                                                    name="chargerTOUPeakOff"
                                                    control={control}
                                                    render={({ field: { name, onChange, value } }) => (
                                                        <Select
                                                            options={typemetercost}
                                                            isRequired={true}
                                                            value={value}
                                                            onChange={(selectedOption: any) => {
                                                                onChange(selectedOption);
                                                                setChargeTime(selectedOption);
                                                            }}
                                                            name={name}
                                                            label="ຄ່າໄຟສໍາລັບ Meter ສະເພາະເຄື່ອງສາກລົດໄຟຟ້າທີ່ທ່ານຄິດວ່າເໝາະສົມ?"
                                                            className="col-span-full"
                                                            error={errors?.chargerTOUPeakOff?.message}
                                                            getOptionValue={(option) => option.value}
                                                            displayValue={(selected: string) =>
                                                                typemetercost.find((option) => option.value === selected)?.name ??
                                                                selected

                                                            }
                                                            placeholder="ຄ່າໝໍ້ນັບໄຟ ສຳລັບເຄື່ອງສາກ"
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
                                                        name="installCost"
                                                        control={control}
                                                        render={({ field: { name, onChange, value } }) => (
                                                            <Select
                                                                options={installSmartMeter}
                                                                isRequired={true}
                                                                value={value}
                                                                onChange={onChange}
                                                                name={name}
                                                                label="ຄ່າຕິດຕັ້ງ ທີວ່າເໝາະສົມ?"
                                                                className="col-span-full"
                                                                error={errors?.installCost?.message}
                                                                getOptionValue={(option) => option.value}
                                                                displayValue={(selected: string) =>
                                                                    installSmartMeter.find((option) => option.value === selected)?.name ??
                                                                    selected
                                                                }
                                                                placeholder="ຄ່າໝໍ້ນັບໄຟທັນສະໄໝ"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                                <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-full">
                                                    <HeadlAccordion mainContent='ທ່ານສົນໃຈຕິດຕັ້ງ Smart Meter? :' peakDescritp={false} flatRate={false} />
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

                            {agree == "ສົນໃຈ" || agree == "ບໍ່ສົນໃຈ" ?
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