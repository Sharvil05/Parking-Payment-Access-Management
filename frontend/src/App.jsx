import Users from "./pages/Users";
import Vehicles from "./pages/Vehicles";
import ParkingSlots from "./pages/ParkingSlots";
import EntryExit from "./pages/EntryExit";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./layouts/Layout";

function App() {

    const token =
        localStorage.getItem("token");

    return (
        <BrowserRouter>

            <Routes>

                {/* DEFAULT */}

                <Route
                    path="/"
                    element={
                        token
                            ? <Navigate to="/dashboard" />
                            : <Navigate to="/login" />
                    }
                />

                {/* LOGIN */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* PROTECTED APPLICATION */}

                <Route element={<Layout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                    path="/users"
                    element={<Users />}
                />

                 <Route
                      path="/vehicles"
                      element={<Vehicles />}
                  />

                    <Route
                        path="/parking-slots"
                        element={<ParkingSlots />}
                    />

                  <Route
                    path="/entry-exit"
                    element={<EntryExit />}
                />

              <Route
                  path="/payments"
                  element={<Payments />}
              />

             <Route
                path="/reports"
                element={<Reports />}
            />

                </Route>


                {/* UNKNOWN URL */}

               <Route
                path="/users"
                element={<Users />}
            />

            </Routes>

        </BrowserRouter>
    );
}

export default App;