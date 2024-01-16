"use client"
import React from 'react'
import './styles.css'
import Link from 'next/link';
import Image from "next/image";
interface Props {
    memuitems: any
}

export const MernuServiceItem = (props: Props) => {
    return props.memuitems?.map((item: any, index: number) =>
        <div key={index + 1} className="text-center">
            <div className="flex flex-col items-center">
                <div className="relative group">
                    <div
                        style={{
                            background: item?.background,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            transform: 'skewY(-6deg) rotate(20deg)',
                        }}
                        className="absolute inset-0 rounded-3xl w-20 h-20 md:w-[10rem] md:h-[10rem] animate-rolling">
                    </div>
                    <Link
                        href={item?.href}
                        key={item?.name + index}>
                        <div style={{ background: '#d8ddf3', }} className="relative bg-white shadow-lg rounded-3xl w-20 h-20 md:w-[10rem] md:h-[10rem] hover:ring-2 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md transition-transform duration-300 transform hover:scale-110">
                            {/* content Image Here */}
                            <Image
                                className="w-20 h-20 md:w-[10rem] md:h-[10rem] rounded-3xl "
                                src={item?.png}
                                alt=''
                            />
                        </div>
                    </Link>
                </div>
                <div className="w-full flex flex-col items-center mt-2 md:mt-5">
                    <h3 className='w-full  font-semibold text-white text-sm md:text-md lg:text-lg xl:text-xl text-center'>
                        {item.name}
                    </h3>
                    <p className="w-full text-sm md:text-md text-center text-white font-light">
                        {item.subname}
                    </p>
                </div>
            </div>
        </div>
    )
}
