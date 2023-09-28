import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"
import { ADMIN_ROUTES } from "./routes/adminRoutes"
import ViewDetails from "./pages/view"
import Create from "./pages/Create"
import AdminPage from "./pages/AdminPage"
import Home from "./pages/Home"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        ></Route>
        <Route
          path="/admin/"
          element={<AdminLayout />}
        >
          {/* {ADMIN_ROUTES.map(({ path, element: Element }) => (
              <Route
                path={path}
                element={<Element />}
              />
            ))} */}
          <Route
            path=":category"
            element={<AdminPage />}
          />
          <Route
            path="view/:category/:id"
            element={<ViewDetails />}
          />
          <Route
            path=":category/create"
            element={<Create />}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
