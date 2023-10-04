import {
    Login,
    Home
} from "@/pages";
import { AuthLayout } from "layouts";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: AuthLayout }
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };