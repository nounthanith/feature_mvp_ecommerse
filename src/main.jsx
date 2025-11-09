import { createRoot } from 'react-dom/client'
import './index.css'
import CartProvider from './features/cart/CartProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { WishlistProvider } from './features/wishlist/WishlistProvider';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <CartProvider>
            <WishlistProvider>
                <App />
            </WishlistProvider>
        </CartProvider>
    </BrowserRouter> 
)
