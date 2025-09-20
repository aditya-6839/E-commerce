import express from 'express'
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateOrderStatus, verifyStripe } from '../controllers/orderController.js'

import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js';


const orderRouter = express.Router()

// Admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

// Payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/place/stripe', authUser, placeOrderStripe);


// Verify the payment
orderRouter.post('/verifyStripe',authUser, verifyStripe)

// User features
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;
