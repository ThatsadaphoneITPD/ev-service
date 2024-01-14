import React from 'react'

interface Props {
    mainContent: string,
    subtext: string,
    frontIcon: boolean
}

export const HeadLine = (props: Props) => {
    return (

        <div className="relative w-full mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-blue-500">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
            <div className="ml-6">
                <div aria-label="header" className="max-w-screen flex items-center space-x-2">
                    {props.frontIcon == true &&
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 shrink-0"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>
                        </svg>}
                    <div className="space-y-0.5 flex-1 ">
                        <h4 className="font-bold text-blue-500">{props.mainContent}</h4>
                        <p className="text-sm font-normal text-gray-400 leading-none">
                            {props.subtext ?? props.subtext}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
