import { UniversityEDL } from "@/app/(main)/edl-eservice/menu-service/icon";
import Image from "next/image";


export default function Logo() {
    return (
        <div className=" rounded-full bg-[#ffff]" >
            <Image className="" src={UniversityEDL} alt={"logo"} />
        </div>
    );
}
