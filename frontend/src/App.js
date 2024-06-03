import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './pages/User/Login';
import Signup from './pages/User/signup';
import ActivationPage from './pages/User/ActivationPage';
import Store from './redux/store';
import { loadUser, loadseller } from './redux/actions/user';
import ProductPage from './pages/User/ProductPage';
import BestSellingPage from './pages/User/BestSellingPage';
import ProductDetailPage from './pages/User/ProductDetailPage';
import Profile from './pages/User/Profile/Profile';
import EventPage from './pages/User/EventPage';
import Faq from './pages/User/Faq';
import ProtectedRoute from './routes/ProtectedRoute';
import ProductRoute from './routes/ProductRoute';
import ProductRoute2 from './routes/ProductRoute2';
import AllShops from './pages/User/AllShops';
import ShopPreviewPage from './pages/User/Shop/ShopPreviewPage';
import ShopCreate from './pages/Shop/Shop_Signup';
import SellerActivationPage from './pages/Shop/SellerActivationPage';
import ShopLogin from './pages/Shop/ShopLogin';
import ShopHomePage from './pages/Shop/Profile/ShopHomePage';
import SellerProtectedRoute from './routes/SellerProtectedRoute';
import ShopDashboardPage from './pages/Shop/Dashboard/ShopDashboardPage';
import ShopCreateProduct from './pages/Shop/Dashboard/Create_Product/ShopCreateProduct';
import ShopProductPage from './pages/Shop/Dashboard/All_Products/ShopProductPage';
import CreateEventPage from './pages/Shop/Dashboard/Event/CreateEventPage';
import AllEventpage from './pages/Shop/Dashboard/Event/AllEventsPage';
import AllCouponsPage from './pages/Shop/Dashboard/Coupons/AllCouponsPage';
import { getAllProducts } from './redux/actions/product';
import { getAllEvents } from './redux/actions/event';
import OrderCompletePage from './pages/User/OrderCompletePage';
import OrderDetailPage from './pages/User/OrderDetailPage';
import AllOrder from './pages/User/Profile/AllOrders';
import Orders from './pages/User/Profile/Orders';
import ChangePassword from './pages/User/Profile/ChangePassword';
import Address from './pages/User/Profile/Address';
import Payment from './components/User/Payment/Payment';
import Checkout from './components/User/Checkout/Checkout';
import Home from './components/User/Home';
import UserInbox from './pages/User/Profile/UserInbox';
import ShopOrdersPage from './pages/Shop/Dashboard/All Orders/ShopOrdersPage';
import ShopOrderDetails from './pages/Shop/Dashboard/All Orders/ShopOrderDetails';
import ShopSettingPage from './pages/Shop/Dashboard/Setting/ShopSettingPage';
import ShopInboxPage from './pages/Shop/Dashboard/Inbox/ShopInboxPage';
import OrderPage from './pages/Shop/Dashboard/Live_Orders/OrdersPage';

import ModelPage from './pages/Model/ModelPage';
import LoginPage from './pages/Admin/Login';
import HomePage from './pages/Admin/HomePage';
import ViewShop from './pages/Admin/View/ViewShop';
import ViewUser from './pages/Admin/View/ViewUser';
import ProductDetailPage2 from './pages/User/ProductDetailPage2';
import ProductDetailPage3 from './pages/User/ProductDetailPage3';
import ResetPasswordPage from './pages/User/resetPassword';
import ForgotPassword from './pages/User/ForgetPassword';
import ShopForgotPassword from './pages/Shop/ShopForgetPassword';
import ShopResetPasswordPage from './pages/Shop/ShopResetPassword';






function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadseller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());

  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/all-shops" element={<AllShops />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

          <Route path="/checkout" element={
            <ProtectedRoute >
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute >
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/complete-order" element={
            <ProtectedRoute >
              <OrderCompletePage />
            </ProtectedRoute>
          } />
          <Route path="/best-selling"
            element={<BestSellingPage />}
          />
          <Route path="/product/:id" element={
            <ProductRoute>
              <ProductDetailPage />
            </ProductRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute >
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/user-all-orders" element={
            <ProtectedRoute >
              <AllOrder />
            </ProtectedRoute>
          } />
          <Route path="/user-orders" element={
            <ProtectedRoute >
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/user-update-password" element={
            <ProtectedRoute >
              <ChangePassword />
            </ProtectedRoute>
          } />
          <Route path="/user-address" element={
            <ProtectedRoute >
              <Address />
            </ProtectedRoute>
          } />
          <Route path="/user/order/:id" element={
            <ProtectedRoute >
              <OrderDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/user-inbox" element={
            <ProtectedRoute >
              <UserInbox />
            </ProtectedRoute>
          } />
          <Route path="/activation/:activation_token" element={<ActivationPage />} />
          
          <Route path="seller/activation/:activation_token" element={<SellerActivationPage />} />
          <Route path="shop/preview/:id" element={<ShopPreviewPage />} />

          {/* Shop Routes */}
          <Route path="/shop-create" element={<ShopCreate />} />
          <Route path="/shop-login" element={<ShopLogin />} />

          <Route path="/shop-forgot-password" element={<ShopForgotPassword />} />
          <Route path="/shop-reset-password/:token" element={<ShopResetPasswordPage />} />

          <Route path="/shop/:id" element={
            <SellerProtectedRoute >
              <ShopHomePage />
            </SellerProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <SellerProtectedRoute >
              <ShopDashboardPage />
            </SellerProtectedRoute>
          } />
          <Route path="/dashboard-create-product" element={
            <SellerProtectedRoute >
              <ShopCreateProduct />
            </SellerProtectedRoute>
          } />
          <Route path="/dashboard-products" element={
            <SellerProtectedRoute >
              <ShopProductPage />
            </SellerProtectedRoute>
          } />
          <Route path="/dashboard-create-event" element={
            <SellerProtectedRoute >
              <CreateEventPage />
            </SellerProtectedRoute>
          } />
          <Route path="/dashboard-events" element={
            <SellerProtectedRoute >
              <AllEventpage />
            </SellerProtectedRoute>
          } />
          <Route path="/dashboard-coupons" element={
            <SellerProtectedRoute >
              <AllCouponsPage />
            </SellerProtectedRoute>
          } />

          <Route path="/dashboard-all-orders" element={
            <SellerProtectedRoute >
              <ShopOrdersPage />
            </SellerProtectedRoute>
          } />
          <Route path="/dashboard-orders" element={
            <SellerProtectedRoute >
              <OrderPage />
            </SellerProtectedRoute>
          } />
          <Route path="/dashboard-setting" element={
            <SellerProtectedRoute >
              <ShopSettingPage />
            </SellerProtectedRoute>
          } />
          <Route path="/order/:id" element={
            <SellerProtectedRoute >
              <ShopOrderDetails />
            </SellerProtectedRoute>
          } />
          <Route path="/dashboard-inbox" element={
            <SellerProtectedRoute >
              <ShopInboxPage />
            </SellerProtectedRoute>
          } />
          <Route path="/product/2/:id" element={
            <ProductRoute2>
              <ProductDetailPage2 />
            </ProductRoute2>
          } />
          <Route path="/product/3/:id" element={
            <ProductRoute2>
              <ProductDetailPage3 />
            </ProductRoute2>
          } />


          <Route path="/model" element={<ModelPage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/homepage" element={<HomePage />} />
          <Route path="/view/shop/:id" element={<ViewShop />} />
          <Route path="/view/user/:id" element={<ViewUser />} />



        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>

  );
}

export default App;
