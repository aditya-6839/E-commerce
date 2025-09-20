import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App'
import { ShopContextProvider } from './Context/ShopContext'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
       <ToastContainer />
      <App />
    </ShopContextProvider>
  </BrowserRouter>
)