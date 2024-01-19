"use client"
import React from 'react'
import { FormInterview } from './form-interview'

interface Props {

}

const page = (props: Props) => {
    return (
        // <div className="px-4 pb-6 pt-2 flex flex-col items-center relative md:w-[60rem] md:mx-auto mt-10">
        <div className="px-4 pb-6 pt-2 flex flex-col items-center relative md:mx-auto mt-10">
            <FormInterview />
        </div>
    )
}
export default page