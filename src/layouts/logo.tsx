import { UniversityEDL } from "@/app/(main)/edl-eservice/menu-service/icon";
import Image from "next/image";

interface IconProps {
    iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
    return (
        <div className=" rounded-full bg-[#ffff]" >
            <Image className="" src={UniversityEDL} alt={"logo"} />
        </div>
    );
}
