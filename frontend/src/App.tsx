import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<p>Home page</p>} />
          <Route path="/search" element={<p>Search Page</p>} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
