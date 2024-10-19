import { Route, Routes } from "react-router-dom";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import { Typography } from "@mui/material";
import { useAppSelector } from "./app/hooks";
import { selectUser } from "./features/users/usersSlice";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute";
import Cocktails from "./features/cocktails/containers/Cocktails";
import CreateCocktail from "./features/cocktails/containers/CreateCocktail";
import MyCocktails from "./features/cocktails/containers/MyCocktails";
import OneCocktail from "./features/cocktails/components/OneCocktail";

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <main>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Cocktails />} />

          <Route path="/cocktails/:id" element={<OneCocktail />} />

          <Route
            path="/cocktails/create"
            element={
              <ProtectedRoute
                isAllowed={
                  (user && user.role === "admin") || user?.role === "user"
                }
              >
                <CreateCocktail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cocktails/myCocktails"
            element={
              <ProtectedRoute
                isAllowed={
                  (user && user.role === "admin") || user?.role === "user"
                }
              >
                <MyCocktails />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Typography variant="h1">Not found</Typography>}
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
