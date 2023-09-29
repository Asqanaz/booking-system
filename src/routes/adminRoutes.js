import AdminPage from "../pages/AdminPage"

export const ADMIN_ROUTES = [
    {
        path: 'services',
        element: AdminPage,
        title: 'Services'
    },
    {
        path: 'professionals',
        element: AdminPage,
        title: 'Professionals'
    },
    {
        path: 'available-hours',
        element: AdminPage,
        title: 'Available Hours'
    },
]