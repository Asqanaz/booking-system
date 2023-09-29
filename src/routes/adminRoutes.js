import AdminPage from "../pages/AdminPage"

export const ADMIN_ROUTES = [
    {
        path: 'professionals',
        element: AdminPage,
        title: 'Professionals'
    },
    {
        path: 'services',
        element: AdminPage,
        title: 'Services'
    },
    {
        path: 'available-hours',
        element: AdminPage,
        title: 'Available Hours'
    },
]