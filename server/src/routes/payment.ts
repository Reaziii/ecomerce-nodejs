import { Router } from 'express';
import { failedPayment, initPayment, successPayment } from '../controllers/payment';
import { sendPayment } from '../controllers/paymentRequest';
import { checkAuthentication } from '../middlewares/auth';
import {decode} from 'jsonwebtoken';
const route = Router();


route.post("/", (req, res) => {
    console.log(req.body)
    initPayment(req).then(result => {
        if (result.status) {
            sendPayment(result.order?._id, result.price ?? 10000, (message) => {
                res.send(message)
            })
        }
        else {
            res.send(result);
        }
    })
});


route.post("/success/:orderid", (req, res) => {
    successPayment(req.params.orderid).then(result => {
        res.redirect("http://localhost:3000/myorders");
    })

})

route.post("/failed/:orderid", (req, res) => {
    failedPayment(req.params.orderid).then(result => {
        res.redirect("http://localhost:3000/payment-failed")
    })
})



export default route;