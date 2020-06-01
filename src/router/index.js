import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            name: "main",
            path: "/", //localhost:8080
            redirect: "about",
            component: () => import("@/views/MainView"), // todo main slit into admin/user panel
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: "scripts",
                    name: "scripts",
                    component: () => import("@/views/AdminScript"),
                    props: true,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: "vm",
                    name: "vm",
                    component: () => import("@/views/AdminVM"),
                    props: true,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    name: "users",
                    path: "users",
                    component: () => import("@/views/AdminUsers"),
                    props: true,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    name: "about",
                    path: "about",
                    component: () => import("@/views/About"),
                    props: true,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    name: "configuration",
                    path: "configuration",
                    component: () => import("@/views/UserVM"),
                    props: true,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    name: "charts",
                    path: "charts",
                    component: () => import("@/views/UserCharts"),
                    props: true,
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            name: "login",
            path: "/login",
            component: () => import("@/views/SignIn"),
            props: true
        },
        {
            name: "*",
            path: "/*",
            component: () => import("@/views/NotFound"),
            props: true
        }
    ],
    mode: 'history'
})
