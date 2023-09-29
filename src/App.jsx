import { Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import ViewDetails from "./pages/ViewDetails"
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
        />
        <Route
          path="/admin/"
          element={<AdminLayout />}
        >
          <Route
            path=":category"
            element={<AdminPage />}
          />
          <Route
            path="view/:category/:id"
            element={<ViewDetails />}
          />
          <Route
            path="create/:category"
            element={<Create />}
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
