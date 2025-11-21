import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<p>Home page</p>} />
          <Route path="/search" element={<p>Search Page</p>} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          {isLoggedIn && (
            <>
              <Route path="/add-hotel" element={<AddHotel />} />
              <Route path="/my-hotels" element={<MyHotels />} />
              <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
            </>
          )}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
