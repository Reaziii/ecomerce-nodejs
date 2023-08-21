import express from 'express';
import dotnev from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth'
import bodyParser from 'body-parser';
import categoryRoute from './routes/catagory'
import productRoute from './routes/product'
import cors from 'cors'
import bannerRoute from './routes/banner'
import PaymentRoute from './routes/payment'
import ordersRoute from './routes/orders'
dotnev.config();
const app = express();

//connect mongodb
mongoose.connect(process.env.db ?? "").then(() => {
    console.log("[database] connected");
}).catch(err => {
    console.log(err);
})

const jsonParser = bodyParser.json({ limit: '10mb' });
const urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: true });
//middlewares
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors())


//routes
app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/banner", bannerRoute)
app.use('/payment', PaymentRoute)
app.use("/order", ordersRoute)
app.use('/uploads', express.static('uploads'));








app.get("/", (req, res) => {
    res.send("server is running good");
})






app.listen(process.env.PORT, () => {
    console.log("server is running on port : ", process.env.PORT ?? 1444)
});