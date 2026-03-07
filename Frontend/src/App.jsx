import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Account from "./Pages/Account";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import Signup from "./Pages/Signup";
import Logout from "./Pages/Logout";
import ResetPass from "./Pages/ResetPass";
import UserProtectedWrapper from "./components/UserProtectedWrapper";
import AddNewSuit from "./Pages/AddNewSuit";
import SuitView from "./Pages/SuitView";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import About from "./Pages/About";
import Policy from "./Pages/Policy";
import ReturnPolicy from "./Pages/ReturnPolicy";
import TermConditions from "./Pages/TermConditions";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/account"
          element={
            <UserProtectedWrapper>
              <Account />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/cart"
          element={
            <UserProtectedWrapper>
              <Cart />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/addnewsuit"
          element={
            <UserProtectedWrapper>
              <AddNewSuit />
            </UserProtectedWrapper>
          }
        />
        <Route path="/suit/:id" element={<SuitView />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/resetpass" element={<ResetPass />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/returnpolicy" element={<ReturnPolicy />} />
        <Route path="/termandconditions" element={<TermConditions />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
