import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { FcCallback, FcConferenceCall } from "react-icons/fc";
import { RiCustomerService2Line } from "react-icons/ri";
import { LuFolderLock } from "react-icons/lu";
import { BsFileImage } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa6";
// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  // {
  //   name: 'ໜ້າຫຼັກ',
  // },
  {
    name: 'E-serivice',
    href: routes.edlService.eservice,
    icon: <BsFileImage />,
  },
  {
    name: 'ການສຳຫຼວດ ຜູ້ໃຊ້ EV',
    href: routes.interview.ev,
    icon: <BsFileImage />,
  },
  {
    name: 'ສະຫຼຸບ ການສຳຫຼວດ',
    href: routes.interview.sum,
    icon: <BsFileImage />,
  },
  // label end
  // {
  //   name: 'Dashboard',
  //   href: '/',
  //   // href: routes.file.dashboard,
  //   icon: <BsFileImage />,
  // },
  {
    name: 'ສ້າງໜັງສືລາຍງານ',
    href: routes.createDocEDL.reportDoc,
    // href: routes.file.dashboard,
    icon: <BsFileImage />,
  },
  // {
  //   name: 'Servie Center',
  //   href: "*",
  //   icon: <FcCallback />,
  //   dropdownItems: [
  //     {
  //       name: 'ສູນບໍລິການນວ1',
  //       href: routes.serviceCenter.area(1),
  //       icon: <RiCustomerService2Line />,
  //     },
  //     {
  //       name: 'ສູນບໍລິການນວ2',
  //       href: routes.serviceCenter.area(2),
  //       icon: <RiCustomerService2Line />,
  //     },
  //   ],
  // },
  // {
  //   name: 'ການຈັດການຜູ້ໃຊ້ງານ',
  // },
  // // label end
  {
    name: 'ກຳນົດສິດໃຊ້ງານ',
    href: routes.user.rolesPermissions,
    icon: <LuFolderLock />,
  },
  // {
  //   name: 'ສູນບໍລິການ',
  //   href: routes.serviceCenter.Adminarea,
  //   icon: <LuFolderLock />,
  // },
  // {
  //   name: 'ຜູ້ໃຊ້ລະບົບ',
  //   href: routes.userRail.Adminarea,
  //   icon: <LuFolderLock />,
  // },
  // {
  //   name: 'ບໍລິຫານຈັດການ',
  // },
  // {
  //   name: 'Menu',
  //   href: '#',
  //   icon: <FaUserSecret />,
  //   dropdownItems: [

  //     {
  //       name: 'sub menu1',
  //       href: '#',
  //       icon: <FcConferenceCall />,
  //     },
  //     {
  //       name: 'sub menu2',
  //       href: '#',
  //       icon: <FcConferenceCall />,
  //     },
  //     {
  //       name: 'sub menu3',
  //       href: '#',
  //       icon: <FcConferenceCall />,
  //     },
  //     {
  //       name: 'sub menu4',
  //       href: '#',
  //       icon: <FcConferenceCall />,
  //     },

  //   ],
  // },
];
