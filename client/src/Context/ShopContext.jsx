import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import axios from 'axios'
export const shopContext = createContext();

export const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size before adding to cart!", {
                position: "top-center",
                autoClose: 2000,
            });
            return;
        }

        // ✅ Update state immediately (optimistic update)
        setCartItems((prevCart) => {
            const cartData = structuredClone(prevCart);

            if (cartData[itemId]) {
                cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
            } else {
                cartData[itemId] = { [size]: 1 };
            }

            return cartData;
        });

        // ✅ Sync with backend if logged in
        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/add`,
                    { itemId, size },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                toast.success("Item added to cart!", {
                    position: "top-center",
                    autoClose: 2000,
                });
            } catch (error) {
                console.error(error);

                toast.error(
                    error.message || "Failed to add item to cart!",
                    { position: "top-center", autoClose: 2000 }
                );

                // ❌ Revert optimistic update if request failed
                setCartItems((prevCart) => {
                    const cartData = structuredClone(prevCart);

                    if (cartData[itemId]?.[size]) {
                        cartData[itemId][size] -= 1;
                        if (cartData[itemId][size] <= 0) {
                            delete cartData[itemId][size];
                        }
                        if (Object.keys(cartData[itemId]).length === 0) {
                            delete cartData[itemId];
                        }
                    }
                    return cartData;
                });
            }
        } else {
            // Guest user → local only
            toast.success("Item added to cart!", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }
    const updateQuantity = async (itemId, size, quantity) => {
        // Optimistic update
        setCartItems((prevCart) => {
            const cartData = structuredClone(prevCart);

            if (!cartData[itemId]) cartData[itemId] = {};
            cartData[itemId][size] = quantity;

            // If quantity <= 0 → remove item/size
            if (quantity <= 0) {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }

            return cartData;
        });

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, size, quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error(error);

                toast.error(
                    error.message || "Failed to update cart!",
                    { position: "top-center", autoClose: 2000 }
                );

                // ❌ Rollback if request failed
                setCartItems((prevCart) => {
                    const cartData = structuredClone(prevCart);

                    // revert to previous value by decreasing or restoring old quantity
                    if (!cartData[itemId]) cartData[itemId] = {};
                    cartData[itemId][size] =
                        cartItems[itemId]?.[size] || 0; // revert from old state

                    return cartData;
                });
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }


    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/get`,
                {}, { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.message || "Failed to fetch the cart data!",
                { position: "top-center", autoClose: 2000 }
            );
        }
    };

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, token, setToken
    }
    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    )
}
