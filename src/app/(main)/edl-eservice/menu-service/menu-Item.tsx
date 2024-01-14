import { routes } from '@/config/routes';
import { evchargerBlue, evleaf, evleaf1, ev2d, solarroof, solarroofgreen } from "./icon"
// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
    {
        name: 'ແບບຟອມ EV',
        subname: '',
        href: routes.interview.ev,
        png: evchargerBlue,
        background: 'linear-gradient(to right, #afc6d9, #4683e5)',
    },
    {
        name: 'ແບບຟອມ Solar Roof',
        subname: '',
        href: "",
        png: solarroof,
        background: 'linear-gradient(to right, #d9c7af, #e5a346)',
    },

];
