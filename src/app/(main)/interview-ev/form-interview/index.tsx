//slide-show
'use client';
import React, { useState, useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Select from '@/components/ui/select';
import { useTheme } from "next-themes";
import {
    typeevcharger,
    capacitycharger,
    typechargerport,
    typemetercost,
    installSmartMeter,
    carBanner,
} from '@/app/shared/roles-permissions/utils';
import { HeadLine } from './headLine';
import toast from 'react-hot-toast';
import { CreateFormEVInput, createFormEVSchema } from './create-formev.schema';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Radio, RadioGroup, AdvancedRadio, } from "rizzui";
import { useGeolocation } from 'react-use';
import { electricCarData } from '@/config/constants';
import { RiArrowGoBackFill } from "react-icons/ri";
import axios from 'axios';
import Image from 'next/image';
import { ACCCS2, ACGBT, DCCCS2, DCGBT } from './icon';


interface Props {

}
const containerStyle = {
    width: '100%',
    height: '200px',
    borderRadius: '10px',
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
    onLocationChange: (newCoords: Coords) => void;
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
    const handleAdvancedRadioClick = (value: string) => {
        setSelectedValue(value);
    };

    return (
        <>
            {selectedValue !== props.additionCompare ? (
                <RadioGroup value={selectedValue} setValue={setSelectedValue} className="grid grid-cols-1 sm:grid-cols-3  mx-auto gap-4"  >
                    {props?.options.map((item: any) => (
                        <div className="flex justify-center items-center" key={item.value}>
                            <div className="flex-none mx-3"> <Radio key={item.value}  {...props.register(props.name)} value={item.value} checked={item.value === selectedValue && true} inputClassName='bg-white' size="xl" />  </div>
                            <div {...props.register(props.name)} onClick={() => { setSelectedValue(item.value) }} className={`grid grid-cols-4 gap-4 relative bg-white shadow-lg rounded-md w-[12rem] ${item.name === "ETC" ? "h-20 flex justify-center items-center" : "h-6/12"} hover:ring-2 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md transition-transform duration-300 transform hover:scale-110 text-center`}>
                                <div className="mx-1 col-span-4 " >  {item.value} </div>
                                {item.name !== "ETC" &&
                                    <>
                                        <div className="mx-1 col-span-2">
                                            <div className="flex justify-center items-center">
                                                <div className="flex-none ">  {item.name === "GBT" && "AC"} {item.name === "TYPE2_CCS2" && "AC"}  </div>
                                                <div className="flex-initial "> {item.name === "GBT" && <Image src={ACGBT} alt='ACGBT' />}  {item.name === "TYPE2_CCS2" && <Image src={ACCCS2} alt='ACCCS2' />}  </div>
                                            </div>
                                        </div>
                                        <div className="mx-1 col-span-2">
                                            <div className="flex justify-center items-center">
                                                <div className="flex-none "> {item.name === "GBT" && "DC"}  {item.name === "TYPE2_CCS2" && "DC"} </div>
                                                <div className="flex-initial ">  {item.name === "GBT" && <Image src={DCGBT} alt='DCGBT' />}  {item.name === "TYPE2_CCS2" && <Image className='h-[3.5rem]' src={DCCCS2} alt='DCCCS2' />} </div>
                                            </div>
                                        </div>
                                    </>
                                }

                            </div>
                        </div>
                    ))}
                </RadioGroup >
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
    const { theme } = useTheme();
    // const [currentStep, setCurrentStep] = React.useState(0);
    const geolocation = useGeolocation();
    const coords: Coords | null = geolocation.latitude !== null && geolocation.longitude !== null ? { latitude: geolocation.latitude, longitude: geolocation.longitude } : null;
    const [userCoords, setUserCoords] = useState<Coords | null>(coords);
    const handleLocationChange = (newCoords: Coords) => {
        // Handle the new location data as needed
        setUserCoords(newCoords);
        console.log('New Location:', newCoords);
    };
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

    const onSubmit: SubmitHandler<CreateFormEVInput> = async (data) => {

        const formattedData = {
            ...data,
            charger_tou_peak_off: expectCost,
            install_cost: agree !== "ສົນໃຈ" ? "0" : expectCost,
            latitude: `${coords?.latitude}`,
            longitude: `${coords?.longitude}`,
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
            console.log(formattedData)
            const envapi = process.env.NEXT_PUBLIC_API_BACKEND;
            const apiUrl = 'https://ev.edl.com.la';
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
            // if (error.response) {
            //     // The request was made, but the server responded with a status code
            //     console.error('Server responded with an error status:', error.response.status);
            //     console.error('Response data:', error.response.data);
            //     toast.error(error.response.status);
            // } else if (error.request) {
            //     // The request was made, but no response was received.
            //     console.error('No response received from the server.');
            //     toast.error('No response received from the server',
            //         {
            //             style: {
            //                 borderRadius: '10px',
            //                 background: '#333',
            //                 color: '#fff',
            //             },
            //         }
            //     );
            // } else {
            //     // Something happened in setting up the request that triggered the error.
            //     console.error('Error setting up the request:', error.message);
            //     toast.error(error.message, {
            //     });
            // }
        }
    };
    const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ coords, onLocationChange }) => {
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: 'AIzaSyAxhuy4xUQo_dDVXyJJ5ZHzNjXh8bEMlyI',
        });

        const [map, setMap] = useState<google.maps.Map | null>(null);

        const onLoad = (map: google.maps.Map) => {
            setMap(map);
            // Add a click event listener to the map
            map.addListener('click', (event: any) => {
                // Extract the latitude and longitude from the click event
                const newCoords: Coords = {
                    latitude: event.latLng.lat(),
                    longitude: event.latLng.lng(),
                };
                // Call the onLocationChange callback to notify the parent component about the new location
                onLocationChange(newCoords);
            });
        };

        useEffect(() => {
            if (map && coords) {
                const bounds = new window.google.maps.LatLngBounds();
                bounds.extend(new window.google.maps.LatLng(coords.latitude, coords.longitude));
                map.fitBounds(bounds);
            }
        }, [map, coords, onLocationChange]);

        return isLoaded ? (
            <>
                {/* <button onClick={() => map?.panTo(coords?.latitude)}> Set location</button> */}
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={25} onLoad={onLoad}>
                    {coords && (
                        <Marker position={{ lat: coords.latitude, lng: coords.longitude }} title="Your Location" />
                    )}
                </GoogleMap>
            </>
        ) : null;
    };
    const LocationInput: React.FC = () => {
        return (
            <div className="flex flex-col items-center justify-center">

                {coords ? (

                    <GoogleMapComponent coords={coords} onLocationChange={handleLocationChange} />
                ) : (
                    <p>Loading...</p>
                )}

            </div>
        );
    };
    const HeadlAccordion: React.FC<Accordion> = ({ mainContent, peakDescritp, flatRate }) => {
        return (
            <div>
                <div className="relative w-full mt-1 h-full">
                    {/* <LuArrowRightCircle style={{ color: "#3758F4", backgroundColor: "white" }} className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full" /> */}
                    <div className="ml-6">
                        <div aria-label="header" className="max-w-screen flex items-center space-x-2">
                            <div className="space-y-0.5 flex-1 ">
                                <h4 className="font-bold text-blue-500">{mainContent}</h4>
                            </div>
                        </div>
                        {peakDescritp == true &&
                            <div aria-label="header" className="max-w-screen flex items-center space-x-2 p-4">
                                <div className="space-y-0.5 flex-1 pl-2">
                                    <ul className="list-disc space-4">
                                        <li> <h5 className="font-bold"> ຊ່ວງ Peak ເວລາແຕ່ 9:00 ຫາ 22:00 ວັນຈັນ-ວັນສຸກ</h5></li>
                                        <li> <h5 className="font-bold"> ຊ່ວງ Off-Peak ເວລາແຕ່ 22:00 ຫາ 9:00 ວັນຈັນ-ວັນສຸກ ແລະ  0:00 ຫາ 24:00 ວັນເສົາ-ວັນອາທິດ ວັນພັກລັດຖະການ </h5></li>
                                    </ul>
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

    const styleCardBG = "rgb(74 108 247/3%)";

    return (
        <Form<CreateFormEVInput> resetValues={reset} onSubmit={onSubmit} validationSchema={createFormEVSchema} className='h-full' >
            {({ register, control, watch, formState: { errors } }) => {
                console.log('errors', errors);
                return (
                    <>
                        <div className="overflow-hidden flex justify-center items-center">
                            <div className="container " >
                                <div className="-mx-2 flex flex-wrap lg:justify-center lg:items-center">
                                    <div className="w-full lg:w-7/12 xl:w-8/12">
                                        <div style={{ background: styleCardBG }} className="wow fadeInUp shadow-three mb-12 rounded-lg px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]" data-wow-delay=".15s"  >
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
                                    <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                                        <div style={{ background: styleCardBG }} className="wow fadeInUp shadow-three relative z-10 rounded-lg p-8 sm:p-11 lg:p-8 xl:p-11" data-wow-delay=".2s" >
                                            <h3 className="mb-4 text-2xl font-bold leading-tight text-black w-full text-center">
                                                ທີ່ຢູ່ປະຈຸບັນ
                                            </h3>
                                            <div className='lg:px-20 justify-center items-center'>
                                                <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ແຂວງ</CustomInputLabel> </label>
                                                <Input
                                                    placeholder="ນະຄອນຫຼວງ"
                                                    className='w-full'
                                                    inputClassName='bg-white'
                                                    {...register('province')}
                                                    error={errors.province?.message}
                                                />
                                                <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ເມືອງ</CustomInputLabel> </label>
                                                <Input
                                                    className='w-full mt-4 md:mt-0'
                                                    placeholder="ສີສັດຕະນາກ"
                                                    inputClassName='bg-white'
                                                    {...register('city')}
                                                    error={errors.city?.message}
                                                />
                                                <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ບ້ານ</CustomInputLabel> </label>
                                                <Input
                                                    className='w-full mt-4 md:mt-0'
                                                    placeholder="ໂສກປ່າຫຼວງ"
                                                    inputClassName='bg-white'
                                                    {...register('village')}
                                                    error={errors.village?.message}
                                                />
                                            </div>
                                            <div className="w-full text-left mt-5 mb-5 text-[0.9rem] font-black"><CustomInputLabel isRequire={true}>ຈຸດພິກັດບ່ອນຊົມໃຊ້ໄຟ</CustomInputLabel> </div>
                                            <LocationInput />

                                            <div>
                                                <span className="absolute left-2 top-7">
                                                    <svg
                                                        width="57"
                                                        height="65"
                                                        viewBox="0 0 57 65"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.5"
                                                            d="M0.407629 15.9573L39.1541 64.0714L56.4489 0.160793L0.407629 15.9573Z"
                                                            fill="url(#paint0_linear_1028_600)"
                                                        />
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_600"
                                                                x1="-18.3187"
                                                                y1="55.1044"
                                                                x2="37.161"
                                                                y2="15.3509"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0.62"
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>

                                                <span className="absolute bottom-24 left-1.5">
                                                    <svg
                                                        width="39"
                                                        height="32"
                                                        viewBox="0 0 39 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.5"
                                                            d="M14.7137 31.4215L38.6431 4.24115L6.96581e-07 0.624124L14.7137 31.4215Z"
                                                            fill="url(#paint0_linear_1028_601)"
                                                        />
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_601"
                                                                x1="39.1948"
                                                                y1="38.335"
                                                                x2="10.6982"
                                                                y2="10.2511"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0.62"
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>

                                                <span className="absolute right-2 top-[140px]">
                                                    <svg
                                                        width="38"
                                                        height="38"
                                                        viewBox="0 0 38 38"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.5"
                                                            d="M10.6763 35.3091C23.3976 41.6367 38.1681 31.7045 37.107 17.536C36.1205 4.3628 21.9407 -3.46901 10.2651 2.71063C-2.92254 9.69061 -2.68321 28.664 10.6763 35.3091Z"
                                                            fill="url(#paint0_linear_1028_602)"
                                                        />
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_602"
                                                                x1="-0.571054"
                                                                y1="-37.1717"
                                                                x2="28.7937"
                                                                y2="26.7564"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0.62"
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>

                                                <span className="absolute right-0 top-0">
                                                    <svg
                                                        width="162"
                                                        height="91"
                                                        viewBox="0 0 162 91"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.3">
                                                            <path
                                                                opacity="0.45"
                                                                d="M1 89.9999C8 77.3332 27.7 50.7999 50.5 45.9999C79 39.9999 95 41.9999 106 30.4999C117 18.9999 126 -3.50014 149 -3.50014C172 -3.50014 187 4.99986 200.5 -8.50014C214 -22.0001 210.5 -46.0001 244 -37.5001C270.8 -30.7001 307.167 -45 322 -53"
                                                                stroke="url(#paint0_linear_1028_603)"
                                                            />
                                                            <path
                                                                opacity="0.45"
                                                                d="M43 64.9999C50 52.3332 69.7 25.7999 92.5 20.9999C121 14.9999 137 16.9999 148 5.49986C159 -6.00014 168 -28.5001 191 -28.5001C214 -28.5001 229 -20.0001 242.5 -33.5001C256 -47.0001 252.5 -71.0001 286 -62.5001C312.8 -55.7001 349.167 -70 364 -78"
                                                                stroke="url(#paint1_linear_1028_603)"
                                                            />
                                                            <path
                                                                opacity="0.45"
                                                                d="M4 73.9999C11 61.3332 30.7 34.7999 53.5 29.9999C82 23.9999 98 25.9999 109 14.4999C120 2.99986 129 -19.5001 152 -19.5001C175 -19.5001 190 -11.0001 203.5 -24.5001C217 -38.0001 213.5 -62.0001 247 -53.5001C273.8 -46.7001 310.167 -61 325 -69"
                                                                stroke="url(#paint2_linear_1028_603)"
                                                            />
                                                            <path
                                                                opacity="0.45"
                                                                d="M41 40.9999C48 28.3332 67.7 1.79986 90.5 -3.00014C119 -9.00014 135 -7.00014 146 -18.5001C157 -30.0001 166 -52.5001 189 -52.5001C212 -52.5001 227 -44.0001 240.5 -57.5001C254 -71.0001 250.5 -95.0001 284 -86.5001C310.8 -79.7001 347.167 -94 362 -102"
                                                                stroke="url(#paint3_linear_1028_603)"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_603"
                                                                x1="291.35"
                                                                y1="12.1032"
                                                                x2="179.211"
                                                                y2="237.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint1_linear_1028_603"
                                                                x1="333.35"
                                                                y1="-12.8968"
                                                                x2="221.211"
                                                                y2="212.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint2_linear_1028_603"
                                                                x1="294.35"
                                                                y1="-3.89678"
                                                                x2="182.211"
                                                                y2="221.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint3_linear_1028_603"
                                                                x1="331.35"
                                                                y1="-36.8968"
                                                                x2="219.211"
                                                                y2="188.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 2---------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div className="overflow-hidden py-6 md:py-14">
                            <div className="container">
                                <div className="-mx-2 flex flex-wrap lg:justify-center lg:items-center">
                                    <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                                        <div style={{ background: styleCardBG }} className="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]" data-wow-delay=".15s"   >
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
                                        <div style={{ background: styleCardBG }} className="wow fadeInUp shadow-three dark:bg-gray-dark relative z-10 rounded-sm bg-white p-8 sm:p-11 lg:p-8 xl:p-11" data-wow-delay=".2s" >
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
                                                <div className="grid grid-cols-2 gap-4" style={{ marginTop: "1rem" }}>
                                                    <div>
                                                        <label className="mt-3 mb-3 block text-sm font-medium text-dark dark:text-white"><CustomInputLabel isRequire={true}>ຍີ່ຫໍ້ຂອງເຄື່ອງສາກ</CustomInputLabel> </label>
                                                        <Input placeholder="WallBox" inputClassName='bg-white' {...register('charger_banner')} error={errors.charger_banner?.message} />
                                                    </div>
                                                    <div>
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
                                            <div>
                                                <span className="absolute left-2 top-7">
                                                    <svg
                                                        width="57"
                                                        height="65"
                                                        viewBox="0 0 57 65"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.5"
                                                            d="M0.407629 15.9573L39.1541 64.0714L56.4489 0.160793L0.407629 15.9573Z"
                                                            fill="url(#paint0_linear_1028_600)"
                                                        />
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_600"
                                                                x1="-18.3187"
                                                                y1="55.1044"
                                                                x2="37.161"
                                                                y2="15.3509"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0.62"
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>

                                                <span className="absolute bottom-24 left-1.5">
                                                    <svg
                                                        width="39"
                                                        height="32"
                                                        viewBox="0 0 39 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.5"
                                                            d="M14.7137 31.4215L38.6431 4.24115L6.96581e-07 0.624124L14.7137 31.4215Z"
                                                            fill="url(#paint0_linear_1028_601)"
                                                        />
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_601"
                                                                x1="39.1948"
                                                                y1="38.335"
                                                                x2="10.6982"
                                                                y2="10.2511"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0.62"
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>

                                                <span className="absolute right-2 top-[140px]">
                                                    <svg
                                                        width="38"
                                                        height="38"
                                                        viewBox="0 0 38 38"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.5"
                                                            d="M10.6763 35.3091C23.3976 41.6367 38.1681 31.7045 37.107 17.536C36.1205 4.3628 21.9407 -3.46901 10.2651 2.71063C-2.92254 9.69061 -2.68321 28.664 10.6763 35.3091Z"
                                                            fill="url(#paint0_linear_1028_602)"
                                                        />
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_602"
                                                                x1="-0.571054"
                                                                y1="-37.1717"
                                                                x2="28.7937"
                                                                y2="26.7564"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0.62"
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>

                                                <span className="absolute right-0 top-0">
                                                    <svg
                                                        width="162"
                                                        height="91"
                                                        viewBox="0 0 162 91"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.3">
                                                            <path
                                                                opacity="0.45"
                                                                d="M1 89.9999C8 77.3332 27.7 50.7999 50.5 45.9999C79 39.9999 95 41.9999 106 30.4999C117 18.9999 126 -3.50014 149 -3.50014C172 -3.50014 187 4.99986 200.5 -8.50014C214 -22.0001 210.5 -46.0001 244 -37.5001C270.8 -30.7001 307.167 -45 322 -53"
                                                                stroke="url(#paint0_linear_1028_603)"
                                                            />
                                                            <path
                                                                opacity="0.45"
                                                                d="M43 64.9999C50 52.3332 69.7 25.7999 92.5 20.9999C121 14.9999 137 16.9999 148 5.49986C159 -6.00014 168 -28.5001 191 -28.5001C214 -28.5001 229 -20.0001 242.5 -33.5001C256 -47.0001 252.5 -71.0001 286 -62.5001C312.8 -55.7001 349.167 -70 364 -78"
                                                                stroke="url(#paint1_linear_1028_603)"
                                                            />
                                                            <path
                                                                opacity="0.45"
                                                                d="M4 73.9999C11 61.3332 30.7 34.7999 53.5 29.9999C82 23.9999 98 25.9999 109 14.4999C120 2.99986 129 -19.5001 152 -19.5001C175 -19.5001 190 -11.0001 203.5 -24.5001C217 -38.0001 213.5 -62.0001 247 -53.5001C273.8 -46.7001 310.167 -61 325 -69"
                                                                stroke="url(#paint2_linear_1028_603)"
                                                            />
                                                            <path
                                                                opacity="0.45"
                                                                d="M41 40.9999C48 28.3332 67.7 1.79986 90.5 -3.00014C119 -9.00014 135 -7.00014 146 -18.5001C157 -30.0001 166 -52.5001 189 -52.5001C212 -52.5001 227 -44.0001 240.5 -57.5001C254 -71.0001 250.5 -95.0001 284 -86.5001C310.8 -79.7001 347.167 -94 362 -102"
                                                                stroke="url(#paint3_linear_1028_603)"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_603"
                                                                x1="291.35"
                                                                y1="12.1032"
                                                                x2="179.211"
                                                                y2="237.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint1_linear_1028_603"
                                                                x1="333.35"
                                                                y1="-12.8968"
                                                                x2="221.211"
                                                                y2="212.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint2_linear_1028_603"
                                                                x1="294.35"
                                                                y1="-3.89678"
                                                                x2="182.211"
                                                                y2="221.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint3_linear_1028_603"
                                                                x1="331.35"
                                                                y1="-36.8968"
                                                                x2="219.211"
                                                                y2="188.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div>
                        <div className="overflow-hidden py-6 md:py-14">
                            <div className="container">
                                <div className="-mx-2 flex flex-wrap lg:justify-center lg:items-center" >
                                    <div className="w-full px-4 lg:w-10/12 xl:w-8/12">
                                        <div style={{ background: styleCardBG }} className="wow fadeInUp shadow-three dark:bg-gray-dark relative z-10 rounded-sm bg-white p-8 sm:p-11 lg:p-8 xl:p-11" data-wow-delay=".2s" >
                                            <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white w-full text-center">
                                                <HeadLine rank={3} mainContent='ການສອບຖາມຂໍ້ມູນອື່ນໆ' subtext='' frontIcon={false} />
                                            </h3>
                                            <div className={`transition bg-indigo-50`}>
                                                <div className={`accordion-content pt-0 overflow-hidden max-h-0 transition-max-height duration-300 ease px-5 max-h-[30rem]`} >
                                                    <HeadlAccordion mainContent='4.1 ທ່ານສົນໃຈ ຕິດຕັ້ງໝໍ້ນັບໄຟແຍກສະເພາະ ເພື່ອນຳໃຊ້ກັບ ເຄື່ອງສາກລົດ EV ສະເພາະຫຼືບໍ ເພື່ອຮັບລາຄາໄຟຟ້າ ແບບນະໂຍບາຍສົ່ງເສີມ ຫຼື ບໍ ?":' peakDescritp={true} flatRate={false} />
                                                </div>
                                            </div>
                                            <div>
                                                <RadioGroup value={agree} setValue={setAgree} className="grid grid-cols-2 gap-4 p-10">
                                                    <Radio inputClassName="bg-white" size='lg' label="ສົນໃຈ" value="ສົນໃຈ" />
                                                    <Radio inputClassName="bg-white" size='lg' label="ບໍ່ສົນໃຈ" value="ບໍ່ສົນໃຈ" />
                                                </RadioGroup>
                                            </div>
                                            <div className={`transition bg-indigo-50 mt-4`}>
                                                <div className={`accordion-content  pt-0 overflow-hidden max-h-0 transition-max-height duration-300 ease px-5 max-h-[30rem]`} >
                                                    <HeadlAccordion mainContent='4.2 ຄ່າໃຊ້ຈ່າຍໃນການຕິດຕັ້ງ ໝໍ້ນັບໄຟແຍກສະເພາະ ເພື່ອນຳໃຊ້ກັບ ເຄື່ອງສາກລົດ EV ໃນຊ່ວງລາຄາເທົ່າໃດທີ່ທ່ານເຫັນວ່າເໝາະສົມ ?' peakDescritp={false} flatRate={true} />
                                                </div>
                                            </div>
                                            <div>
                                                <RadioGroup value={expectCost} setValue={setExpectCost} className="grid grid-cols-1 gap-4 p-10 mt-5 text-sm">
                                                    {installSmartMeter?.map((item: any) => (<Radio key={item.name} label={item.name} value={item.value} inputClassName="bg-white" />))}
                                                </RadioGroup>
                                            </div>

                                            <div>
                                                <span className="absolute left-2 top-7">
                                                    <svg
                                                        width="57"
                                                        height="65"
                                                        viewBox="0 0 57 65"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.5"
                                                            d="M0.407629 15.9573L39.1541 64.0714L56.4489 0.160793L0.407629 15.9573Z"
                                                            fill="url(#paint0_linear_1028_600)"
                                                        />
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_600"
                                                                x1="-18.3187"
                                                                y1="55.1044"
                                                                x2="37.161"
                                                                y2="15.3509"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0.62"
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>

                                                <span className="absolute bottom-24 left-1.5">
                                                    <svg
                                                        width="39"
                                                        height="32"
                                                        viewBox="0 0 39 32"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.5"
                                                            d="M14.7137 31.4215L38.6431 4.24115L6.96581e-07 0.624124L14.7137 31.4215Z"
                                                            fill="url(#paint0_linear_1028_601)"
                                                        />
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_601"
                                                                x1="39.1948"
                                                                y1="38.335"
                                                                x2="10.6982"
                                                                y2="10.2511"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0.62"
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>

                                                <span className="absolute right-2 top-[140px]">
                                                    <svg
                                                        width="38"
                                                        height="38"
                                                        viewBox="0 0 38 38"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            opacity="0.5"
                                                            d="M10.6763 35.3091C23.3976 41.6367 38.1681 31.7045 37.107 17.536C36.1205 4.3628 21.9407 -3.46901 10.2651 2.71063C-2.92254 9.69061 -2.68321 28.664 10.6763 35.3091Z"
                                                            fill="url(#paint0_linear_1028_602)"
                                                        />
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_602"
                                                                x1="-0.571054"
                                                                y1="-37.1717"
                                                                x2="28.7937"
                                                                y2="26.7564"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0.62"
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>

                                                <span className="absolute right-0 top-0">
                                                    <svg
                                                        width="162"
                                                        height="91"
                                                        viewBox="0 0 162 91"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.3">
                                                            <path
                                                                opacity="0.45"
                                                                d="M1 89.9999C8 77.3332 27.7 50.7999 50.5 45.9999C79 39.9999 95 41.9999 106 30.4999C117 18.9999 126 -3.50014 149 -3.50014C172 -3.50014 187 4.99986 200.5 -8.50014C214 -22.0001 210.5 -46.0001 244 -37.5001C270.8 -30.7001 307.167 -45 322 -53"
                                                                stroke="url(#paint0_linear_1028_603)"
                                                            />
                                                            <path
                                                                opacity="0.45"
                                                                d="M43 64.9999C50 52.3332 69.7 25.7999 92.5 20.9999C121 14.9999 137 16.9999 148 5.49986C159 -6.00014 168 -28.5001 191 -28.5001C214 -28.5001 229 -20.0001 242.5 -33.5001C256 -47.0001 252.5 -71.0001 286 -62.5001C312.8 -55.7001 349.167 -70 364 -78"
                                                                stroke="url(#paint1_linear_1028_603)"
                                                            />
                                                            <path
                                                                opacity="0.45"
                                                                d="M4 73.9999C11 61.3332 30.7 34.7999 53.5 29.9999C82 23.9999 98 25.9999 109 14.4999C120 2.99986 129 -19.5001 152 -19.5001C175 -19.5001 190 -11.0001 203.5 -24.5001C217 -38.0001 213.5 -62.0001 247 -53.5001C273.8 -46.7001 310.167 -61 325 -69"
                                                                stroke="url(#paint2_linear_1028_603)"
                                                            />
                                                            <path
                                                                opacity="0.45"
                                                                d="M41 40.9999C48 28.3332 67.7 1.79986 90.5 -3.00014C119 -9.00014 135 -7.00014 146 -18.5001C157 -30.0001 166 -52.5001 189 -52.5001C212 -52.5001 227 -44.0001 240.5 -57.5001C254 -71.0001 250.5 -95.0001 284 -86.5001C310.8 -79.7001 347.167 -94 362 -102"
                                                                stroke="url(#paint3_linear_1028_603)"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <linearGradient
                                                                id="paint0_linear_1028_603"
                                                                x1="291.35"
                                                                y1="12.1032"
                                                                x2="179.211"
                                                                y2="237.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint1_linear_1028_603"
                                                                x1="333.35"
                                                                y1="-12.8968"
                                                                x2="221.211"
                                                                y2="212.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint2_linear_1028_603"
                                                                x1="294.35"
                                                                y1="-3.89678"
                                                                x2="182.211"
                                                                y2="221.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                            <linearGradient
                                                                id="paint3_linear_1028_603"
                                                                x1="331.35"
                                                                y1="-36.8968"
                                                                x2="219.211"
                                                                y2="188.617"
                                                                gradientUnits="userSpaceOnUse"
                                                            >
                                                                <stop
                                                                    offset="0.328125"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                />
                                                                <stop
                                                                    offset="1"
                                                                    stopColor={theme === "light" ? "#4A6CF7" : "#fff"}
                                                                    stopOpacity="0"
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div>
                        {/* 3-------------------------------------------------------------------- */}

                        {/* <div className="" >
                            <HeadLine rank={3} mainContent='ທ່ານສົນໃຈຕິດຕັ້ງ ໝໍ້ນັບໄຟ ແຍກສະເພາະ ແລະ ສາກລົດໄຟຟ້າເພື່ອຮັບນະໂຍບາຍລາຄາໄຟບໍ? ' subtext='' frontIcon={false} />
                            <div style={{ marginLeft: "3rem" }}>
                                <div style={{ marginTop: "1rem" }}>
                                    <div>
                                        <RadioGroup value={agree} setValue={setAgree} className="grid grid-cols-2 gap-4">
                                            <Radio label="ສົນໃຈ" value="ສົນໃຈ" onClick={() => { toggleAccordion(true), setAgreeInstall("ສົນໃຈ"), setTextareaValue("ສົນໃຈ ຕິດຕັ້ງ Smart Meter") }} />
                                            <Radio label="ບໍ່ສົນໃຈ" value="ບໍ່ສົນໃຈ" onClick={() => { setChargeTime(""), toggleAccordion(false), setAgreeInstall("ບໍ່ສົນໃຈ"), setTextareaValue("ບໍ່ສົນໃຈ ຮັບນະໂຍບາຍລາຄາໄຟສາກລົດ") }} />
                                        </RadioGroup>
                                    </div>
                                    <div className={`transition ${isExpanded ? 'bg-indigo-50' : ''}`}>
                                        <div className={`accordion-content px-5 pt-0 overflow-hidden max-h-0 transition-max-height duration-300 ease ${isExpanded ? 'max-h-[50rem] md:max-h-[45rem]' : ''}`} >
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
                        </div> */}
                        <div className="col-span-full flex items-center justify-center gap-4 mt-20 ml-8">

                            {expectCost !== "ບໍ່ເລືອກ" && agree == "ສົນໃຈ" || agree == "ບໍ່ສົນໃຈ" ?
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
        </Form >
    );
}