import { UniversityEDL } from "@/app/(main)/edl-eservice/menu-service/icon";
import Image from "next/image";


export default function Logo() {
    return (

        <div className="rounded-full bg-[#ffff] w-12 h-12 md:w-14 md:h-14 ">
            <Image className="p-[2.50px]" src={UniversityEDL} alt="logo" />
        </div>
    );
}
