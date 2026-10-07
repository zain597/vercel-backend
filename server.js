//const dns = require('node:dns');
//dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const { registerUser } = require('./controllers/auth/auth-controller');
const adminProductsRouter = require("./routes/admin/products-routes.js");
const adminOrderRouter = require("./routes/admin/order-routes.js");

const shopProductsRouter = require("./routes/shop/products-routes.js");
const shopCartRouter = require("./routes/shop/cart-routes.js");
const shopAddressRouter = require("./routes/shop/address-routes.js");
const shopOrderRouter = require("./routes/shop/order-routes.js");
const shopSearchRouter = require("./routes/shop/search-routes.js");
const shopReviewRouter = require("./routes/shop/review-routes.js");

const commonFeatureRouter = require("./routes/common/feature-routes.js");

//create a database connection -> u can also create a seprate file for this and then import/use that file here
mongoose
    .connect('mongodb+srv://zainmehdi80_db_user:O0QrjFdfvsPC2aIh@cluster0.3kmgxgf.mongodb.net/ecomdb?retryWrites=true&w=majority')
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://vercel-frontend-jade-eta.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
//
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);

app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/orders', adminOrderRouter);

app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);

app.use('/api/common/feature', commonFeatureRouter);


app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'MERN Backend API is running'
    });
});
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;