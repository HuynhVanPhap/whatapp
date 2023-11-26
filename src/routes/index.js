import {
    Login,
    Home,
    Register,
    ListAccount
} from "@/pages";
import { AuthLayout } from "layouts";

const publicRoutes = [
    { path: '/login', component: Login, layout: AuthLayout },
    { path: '/register', component: Register, layout: AuthLayout },
    { path: '/list-account', component: ListAccount }
];

const privateRoutes = [
    { path: '/', component: Home },
];

export { publicRoutes, privateRoutes };