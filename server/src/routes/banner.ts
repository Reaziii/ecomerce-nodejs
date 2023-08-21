import { Router } from "express";
import upload from "../controllers/upload";
import { checkAdminAuthentication } from "../middlewares/auth";
import { addNewBanner, changeStatusOfBanner, deleteBanner, getActiveBanners, getAllBanners } from "../controllers/banners";

const route = Router();


route.post("/", checkAdminAuthentication, upload.single("banner"), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ status: false, message: "Banner file required" });
    }
    addNewBanner(req.file.path).then(result => res.send(result))
})

route.delete("/:id", checkAdminAuthentication, (req, res) => {
    deleteBanner(req.params.id).then(result => res.send(result))
})


route.post("/change-status/:id", checkAdminAuthentication, (req, res) => {
    changeStatusOfBanner(req.params.id).then(result => res.send(result))
})


route.get("/", checkAdminAuthentication, (req, res) => {
    getAllBanners().then(result => res.send(result));
})

route.get("/active", (req, res) => {
    getActiveBanners().then(result => res.send(result));
})


export default route;