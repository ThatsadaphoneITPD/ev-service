import { routes } from '@/config/routes';
import { pugcharge, roottop, edlapp, edlbuilding } from "./icon"
// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
    {
        name: 'ລົງທະບຽນ',
        subname: 'ຜູ້ນຳໃຊ້ ລົດ',
        morename: "EV",
        soon: "Coming  Soon",
        soonof: false,
        href: routes.interview.ev,
        png: pugcharge,
        sunbg: "white",
        text: "#EAEAEA",
        background: '#D9D9D9',
        mainbg: "#2E3192",
    },
    {
        name: 'ລົງທະບຽນ',
        subname: 'ຜູ້ນຳໃຊ້  Solar',
        morename: " Rooft Top",
        soon: "Coming  Soon",
        soonof: true,
        href: "",
        sunbg: "white",
        text: "#2E3192",
        png: roottop,
        background: '#D9D9D9',
        mainbg: "#f0f0f0",

    },
    {
        name: 'ຂໍຊົມໃຊ້',
        subname: 'ໄຟຟ້າໃໝ່',
        morename: "",
        soon: "Coming  Soon",
        soonof: true,
        href: "",
        sunbg: "white",
        text: "#2E3192",
        png: edlapp,
        background: '#D9D9D9',
        mainbg: "#f0f0f0",
    },

];


export const generalService =
    [

        {
            name: 'ຂໍ້ມູນສູນບໍລິການ',
            subname: '',
            soon: "Coming  Soon",
            soonof: true,
            href: "",
            sunbg: "white",
            text: "#2E3192",
            png: edlbuilding,
            background: '#D9D9D9',
            mainbg: "#f0f0f0",
        },

    ];
