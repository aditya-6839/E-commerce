<<<<<<< HEAD
# Outflair - Full Stack MERN E-commerce Website 🛍️

Welcome to **Outflair**, a comprehensive full-stack e-commerce platform built with the MERN stack. This project features a complete customer-facing storefront and a powerful admin panel for managing products and orders, complete with payment gateway integrations like Stripe and Razorpay.

---

### 🌟 Features

The application is divided into two main parts: a customer storefront and an admin panel.

#### Customer Storefront

* **Homepage**: Features the latest collections, best-selling products, and an email subscription form.
* **Collections Page**: Includes advanced filtering (by category, type), sorting (by price), and a search bar to easily find products.
* **Product Details Page**: A detailed view of each product with an image gallery, reviews, and related product suggestions.
* **Shopping Cart**: A dynamic cart where users can add, remove, and adjust quantities of items before checkout.
* **User Authentication**: Secure sign-up and sign-in functionality for personalized shopping.
* **Checkout Process**: A seamless checkout experience with multiple payment options (Stripe, Razorpay, Cash on Delivery).
* **My Orders Page**: Users can track their order history and view the current status of their purchases.

#### Admin Panel

* **Order Management**: Admins can view and update the status of customer orders, which is instantly reflected on the customer's account.
* **Product Management**: A complete system for adding new products, updating existing ones, and marking items as "best sellers" to be featured on the homepage.
* **Visual Management**: Admins can upload multiple product images using a dedicated form.

---

### 💻 Tech Stack

This project is a full-stack application leveraging modern web technologies.

#### Frontend

* **Framework**: React.js (with Vite)
* **Styling**: Tailwind CSS
* **Routing**: React Router DOM
* **State Management**: React Context API
* **Notifications**: React Toastify
* **API Calls**: Axios

#### Backend

* **Framework**: Node.js & Express.js
* **Database**: MongoDB (via MongoDB Atlas)
* **Authentication**: JSON Web Tokens (JWT) & Bcrypt
* **Image Storage**: Cloudinary (integrated with Multer)
* **Payment Gateways**: Stripe & Razorpay

---

### 🚀 Getting Started

To run this project locally, you will need to set up the backend, frontend, and admin panel separately.

#### Prerequisites

* Node.js and npm
* MongoDB Atlas account
* Cloudinary account
* Stripe and Razorpay accounts for API keys

#### Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/outflair.git](https://github.com/your-username/outflair.git)
    cd outflair
    ```

2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add your environment variables:
    ```
    PORT=4000
    MONGO_DB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```
    Start the server:
    ```bash
    npm run server
    ```

3.  **Frontend Setup**:
    ```bash
    cd ../frontend
    npm install
    ```
    Create a `.env` file in the `frontend` directory:
    ```
    VITE_BACKEND_URL=https://outflair-backend.vercel.app/
    ```
    Start the client:
    ```bash
    npm run dev
    ```

4.  **Admin Panel Setup**:
    ```bash
    cd ../admin
    npm install
    ```
    Create a `.env` file in the `admin` directory:
    ```
    VITE_BACKEND_URL=https://outflair-backend.vercel.app/
    ```
    Start the admin panel:
    ```bash
    npm run dev
    ```

Your e-commerce application should now be running with the frontend on `https://outflair-backend.vercel.app/`, the admin panel on `http://localhost:5174`, and the backend server on `https://outflair-backend.vercel.app/`.

---

### 🤝 Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

### 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### 📧 Contact

Your Name - Aditya Fulsoundar

Project Link: [https://github.com/aditya-6839/E-commerce](https://github.com/aditya-6839/E-commerce)
=======
Something
>>>>>>> 34a77a8bfe4b7cadf4f57688446f2bcae7168dd7
