export const dashboardRoutes = [
    {
        index: true,
        component: 'HomePage',
        roles: ["nodal_officer", "department"]
    },
    {
        path: "logout",
        component: 'Logout',
        roles: ["nodal_officer", "department"]
    }
];