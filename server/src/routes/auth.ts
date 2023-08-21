import { Router } from "express";
import userInterface from "../interfaces/userInterface";
import { loginUser, registerUser } from "../controllers/auth";
const route = Router();

route.post("/registration", (req, res) => {
    const user: userInterface = req.body;
    console.log(user);
    registerUser(user).then(result => {
        res.send(result);
    })
})


route.post("/login", (req, res) => {
    loginUser(req.body.email ?? "", req.body.password ?? "").then(result => {
        res.send(result);
    })
})


export default route;