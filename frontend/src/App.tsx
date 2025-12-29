import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="register" element={<Register />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="detail/:hotelId" element={<Detail />} />

          <Route element={<ProtectedRoute />}>
            <Route path="add-hotel" element={<AddHotel />} />
            <Route path="my-hotels" element={<MyHotels />} />
            <Route path="edit-hotel/:hotelId" element={<EditHotel />} />
            <Route path="hotel/:hotelId/booking" element={<Booking />} />
            <Route path="my-bookings" element={<MyBookings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
