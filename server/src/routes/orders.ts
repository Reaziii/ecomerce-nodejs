import express, { Request } from 'express';
import { checkAdminAuthentication, checkAuthentication } from '../middlewares/auth';
import jwt from 'jsonwebtoken';
import CustomRequestInterface from '../interfaces/customRequestInterface';
import userInterface from '../interfaces/userInterface';
import { deliveryStatusChange, getAllOrders, getUserOrders } from '../controllers/orders';

const route = express();


route.get("/myorders", checkAuthentication, (req: CustomRequestInterface, res) => {
    if (!req.user) return;
    const user: userInterface = req.user;
    getUserOrders(user._id).then(result => {
        res.send(result);
    })
});


route.get("/", checkAdminAuthentication, (req, res) => {
    getAllOrders().then(result => res.send(result))
})

route.put("/change-delivery-status/:id", checkAdminAuthentication, (req, res) => {
    deliveryStatusChange(req.params.id, req.body.status).then(result => {
        res.send(result);
    })
})

export default route;