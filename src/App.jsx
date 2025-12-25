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
import Arrival from './features/arrival/Arrival';
import Invoice from './features/order/Invoice';

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
    else if (pathname.includes('/order/:id')) pageTitle = 'Invoice';

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
        gutter={12}
        toastOptions={{
          duration: 3500,
          // Modern Industrial Style
          style: {
            background: "#FFFFFF",
            color: "#000000",
            borderRadius: "0px", // Sharp corners
            border: "2px solid #000000", // Bold border
            padding: "12px 20px",
            fontSize: "11px",
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            boxShadow: "8px 8px 0px 0px rgba(0,0,0,0.05)", // Blocky shadow
          },

          success: {
            iconTheme: {
              primary: "#000000",
              secondary: "#FFFFFF",
            },
            style: {
              borderLeft: "8px solid #000000", // Thick accent line
            },
          },

          error: {
            iconTheme: {
              primary: "#E11D48", // Rose-600 to match your theme
              secondary: "#FFFFFF",
            },
            style: {
              borderLeft: "8px solid #E11D48",
              color: "#E11D48",
            },
          },

          loading: {
            style: {
              borderLeft: "8px solid #94a3b8",
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
          <Route path="/arrival" element={<Arrival />} />
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
        <Route path="/order/:id" element={<Invoice />} />
      </Routes>
    </>
  )
}

export default App
