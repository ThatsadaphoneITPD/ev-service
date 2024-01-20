"use client"
import React from 'react'
import './styles.css'
import Link from 'next/link';
import Image from "next/image";
interface Props {
    memuitems: any
}

export const MernuServiceItem = (props: Props) => {
    const handleLinkClick = (value: string) => {
        // Set local storage when the link is clicked
        localStorage.setItem('routerpath', value);
    };
    return props.memuitems?.map((item: any, index: number) =>
        <div key={index + 1} className="text-center">
            <div className="flex flex-col items-center">
                <div className="relative group">
                    {item?.soonof === true &&
                        <div style={{ background: item?.background, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', position: 'absolute', zIndex: 1, }}
                            className="rounded-md w-[5rem] h-[2rem] top-[-15px] right-[15px] md:top-[-20px] md:right-[15px] md:w-[7rem] md:h-[2rem] text-[9px] md:text-[12px] md:text-base text-[#2E3192] font-semibold hover:ring-2 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md transition-transform duration-300 transform hover:scale-110">
                            <div className="flex items-center justify-center h-full">
                                {item?.soon}
                            </div>
                        </div>
                    }
                    <Link
                        href={item?.href}
                        onClick={() => handleLinkClick(item?.href)}
                        key={item?.name + index}>
                        <div style={{ background: item?.mainbg, }}
                            className="relative flex m-2 bg-white shadow-lg rounded-lg w-[9.5rem] h-[6rem] sm:w-[12rem] sm:h-[6rem] md:w-[20rem] md:h-[10rem] hover:ring-2 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md transition-transform duration-300 transform hover:scale-110">
                            {/* content Image Here */}
                            <div className='px-[0.6rem] py-[1rem] flex-1'>
                                <Image
                                    className="w-[4rem] h-[4rem] md:w-[8rem] md:h-[8rem] "
                                    src={item?.png}
                                    alt=''
                                />
                            </div>
                            <div className={`flex-1 items-center pr-[1rem] py-[1rem] w-[6rem] md:w-full ${item?.soonof === true ? "text-[#2E3192]" : "text-[white]"}  flex items-center justify-center h-full`}>
                                <div>
                                    <h3 className={`w-full font-semibold text-[13px] sm:text-sm md:text-md lg:text-lg xl:text-xl text-center ${item?.soonof === true ? "text-[#2E3192]" : "text-[white]"} `}>
                                        {item?.name}
                                    </h3>
                                    {item?.subname !== "" &&
                                        <p className="w-full font-semibold text-[11px] sm:text-sm md:text-md lg:text-lg xl:text-xl text-center font-light">
                                            {item?.subname}
                                        </p>
                                    }
                                    {item?.morename !== "" &&
                                        <p className="w-full font-semibold text-[11px] sm:text-sm md:text-md lg:text-lg xl:text-xl text-center font-light">
                                            {item?.morename}
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
