import { Router } from "express";
import { createCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategory } from "../controllers/catagory";
import { checkAdminAuthentication } from "../middlewares/auth";
import upload from "../controllers/upload";
const route = Router();
route.post("/", checkAdminAuthentication, upload.single("logo"), (req, res) => {
    const data = req.body;
    createCategory(data.name, req.file?.path ?? null).then(result => {
        res.send(result);
    })
})
route.delete("/:id", checkAdminAuthentication, (req, res) => {
    const id = req.params.id;
    deleteCategoryById(id).then(result => {
        res.send(result);
    })

})
route.get("/:id", (req, res) => {
    getCategoryById(req.params.id).then(result => {
        res.status(200).send(result)
    })

})

route.get("/", (req, res) => {
    getAllCategories().then(result => {
        res.send(result);
    })
})

route.put("/:id", checkAdminAuthentication, upload.single("logo"), (req, res) => {
    updateCategory(req.params.id, req.body.name, req.body.logo).then(result => {
        res.send(result);
    })
})

export default route;