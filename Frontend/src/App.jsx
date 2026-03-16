import "./App.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Skeleton from "./components/Skeleton";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
const Account = lazy(() => import("./Pages/Account"));
const Shop = lazy(() => import("./Pages/Shop"));
const Signup = lazy(() => import("./Pages/Signup"));
const Logout = lazy(() => import("./Pages/Logout"));
const ResetPass = lazy(() => import("./Pages/ResetPass"));
const AddNewSuit = lazy(() => import("./Pages/AddNewSuit"));
const SuitView = lazy(() => import("./Pages/SuitView"));
const About = lazy(() => import("./Pages/About"));
const Policy = lazy(() => import("./Pages/Policy"));
const ReturnPolicy = lazy(() => import("./Pages/ReturnPolicy"));
const TermConditions = lazy(() => import("./Pages/TermConditions"));
const Cart = lazy(() => import("./Pages/Cart"));
import UserProtectedWrapper from "./components/UserProtectedWrapper";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <ScrollToTop />
      <Suspense fallback={<Skeleton />}>
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
      </Suspense>
    </>
  );
}

export default App;
