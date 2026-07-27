# Online Grocery System

A comprehensive full-stack web application for an online grocery store. Built using the MERN stack (MongoDB, Express.js, React, Node.js), this project features a modern, responsive UI and a robust backend to handle product management, user authentication, shopping carts, and payment processing.

## 🌟 Features

- **User Authentication**: Secure signup and login using JWT and bcrypt.
- **Product Management**: Browse, search, and view detailed information about grocery products.
- **Shopping Cart**: Add products to cart, update quantities, and remove items seamlessly.
- **Secure Checkout**: Payment integration with Stripe for safe and seamless transactions.
- **Admin Dashboard**: Manage products, categories, users, and view analytics/charts.
- **Image Uploads**: Cloudinary and Multer integration for handling product images.
- **Responsive Design**: Beautiful and responsive UI using Tailwind CSS and Framer Motion animations.

## 💻 Tech Stack

**Frontend:**
- [React 19](https://react.dev/) (with [Vite](https://vitejs.dev/))
- [Redux Toolkit](https://redux-toolkit.js.org/) (State Management)
- [Tailwind CSS v4](https://tailwindcss.com/) (Styling)
- [Framer Motion](https://www.framer.com/motion/) (Animations)
- [React Router DOM](https://reactrouter.com/) (Routing)
- [Chart.js](https://www.chartjs.org/) & [Recharts](https://recharts.org/) (Analytics)
- [React Hook Form](https://react-hook-form.com/) (Form Handling)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) (Database & ODM)
- JSON Web Token (JWT) for authentication
- bcrypt (Password hashing)
- [Stripe](https://stripe.com/) (Payment Gateway API)
- [Cloudinary](https://cloudinary.com/) (Image storage)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB installed locally or a MongoDB Atlas URI
- Stripe account (for payment API keys)
- Cloudinary account (for image upload credentials)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jaysingh600/Online-grocery-system.git
   cd Online-grocery-system
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/ogc
   JWT_SECRET=your_jwt_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```
   Start the backend server:
   ```bash
   npm start # or node server.js
   ```

3. **Frontend Setup**
   Open a new terminal window/tab:
   ```bash
   cd frontend
   npm install
   ```
   *(Optional)* If your backend is running on a different URL/port, you may need to configure a `.env` file in the frontend with your API URL:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
Online-grocery-system/
├── backend/            # Express server, routes, controllers, models, utils
├── frontend/           # React frontend application, components, pages, styles
└── README.md           # Project documentation
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is licensed under the ISC License.
