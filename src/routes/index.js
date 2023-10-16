import {
    Login,
    Home,
    Register
} from "@/pages";
import { AuthLayout } from "layouts";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: AuthLayout },
    { path: '/register', component: Register, layout: AuthLayout }
];

const privateRoutes = [

];

export { publicRoutes, privateRoutes };