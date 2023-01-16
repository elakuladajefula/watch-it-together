import { createRouter, createWebHistory } from "vue-router";
import MyShows from './pages/MyShows.vue'
import MyFriends from './pages/MyFriends.vue'
import SearchFriends from './pages/SearchFriends.vue'
import SearchShows from './pages/SearchShows.vue'
import ProfileSettings from './pages/ProfileSettings.vue'
import LogIn from './pages/LogIn.vue'
import RegisterUser from './pages/RegisterUser.vue'
import FriendShows from './pages/FriendShows.vue'

const routes = 
[
    {
        name: "LogIn",
        path: "/",
        component: LogIn,
    },
    {
        name: "Register",
        path: "/register",
        component: RegisterUser,
    },
    {
        name: "MyShows",
        path: "/my-shows",
        component: MyShows,
    },
    {
        name: "MyFriends",
        path: "/my-friends",
        component: MyFriends,
    },
    {
        name: "SearchShows",
        path: "/search-shows",
        component: SearchShows,
    },
    {
        name: "SearchFriends",
        path: "/search-friends",
        component: SearchFriends,
    },
    // {
    //     name: "FriendShows",
    //     path: "/friend-shows",
    //     component: FriendShows,
    // },
    {
        name: "ProfileSettings",
        path: "/profile-settings",
        component: ProfileSettings,
    },
];

const router = createRouter(
{
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;