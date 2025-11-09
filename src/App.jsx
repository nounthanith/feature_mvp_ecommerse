import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Product from './features/products/Product';
import ProductDetail from './features/products/ProductDetail';
import Navbar from './layouts/Navbar';
import { Toaster } from 'react-hot-toast';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Profile from './features/auth/Profile';
import NotFound from './pages/NotFound';
import CategoryIdProduct from './features/category/CategoryIdProduct';
import Cart from './features/cart/Cart';
import Wishlist from './features/wishlist/Wishlist';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    let pageTitle = '404 Not Found';

    if (pathname === '/') pageTitle = 'Home';
    else if (pathname.includes('/product/')) pageTitle = 'Product Details';
    else if (pathname === '/login') pageTitle = 'Login';
    else if (pathname === '/register') pageTitle = 'Register';
    else if (pathname === '/profile') pageTitle = 'My Profile';
    else if (pathname.includes('/category/')) pageTitle = 'Category';
    else if (pathname.includes('/category/:id')) pageTitle = 'Category';
    else if (pathname.includes('/product/:id')) pageTitle = 'Product Details';
    else if (pathname === '*') pageTitle = 'Not Found';
    else if (pathname === '/cart') pageTitle = 'Cart';
    else if (pathname === '/wishlist') pageTitle = 'Wishlist';

    document.title = `TP-Cambo | ${pageTitle}`;
  }, [location]);

  return null;
};

function App() {
  return (
    <>
      <PageTitle />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={16}
        containerStyle={{
          top: 16,
          left: 16,
          bottom: 16,
          right: 16,
        }}
        toastOptions={{
          className: "relative overflow-hidden rounded-lg",
          duration: 4000,
          style: {
            background: "rgba(0, 0, 0, 0.85)",
            color: "#f3f4f6",
            borderRadius: "10px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.3), inset 0 0 10px rgba(255,255,255,0.05)",
            padding: "16px 20px",
            fontSize: "14px",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          },

          success: {
            iconTheme: {
              primary: "#D4AF37",
              secondary: "#000",
            },
            style: {
              borderLeft: "4px solid #D4AF37",
              background: "rgba(0, 0, 0, 0.85)",
            },
          },

          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#000",
            },
            style: {
              borderLeft: "4px solid #EF4444",
              background: "rgba(0, 0, 0, 0.85)",
            },
          },

          loading: {
            iconTheme: {
              primary: "#D4AF37",
              secondary: "transparent",
            },
            style: {
              background: "rgba(0, 0, 0, 0.85)",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navbar />} >
          <Route index element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category/:id" element={<CategoryIdProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
