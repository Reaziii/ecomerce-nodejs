import { Router } from "express";
import { createNewProduct, deleteProduct, getProductByProductId, getProducts, getProductByCategoryId } from "../controllers/product";
import { checkAdminAuthentication } from "../middlewares/auth";
import upload from "../controllers/upload";
import { uploadProductImages } from "../controllers/productsImage";

const route = Router();

route.post("/", checkAdminAuthentication, upload.array("images"), (req, res) => {
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    createNewProduct(req.body.name, req.body.price, req.body.description, req.body.categoryId, files?.map(item => item.path)).then(result => {
        res.send(result);
    })
})
route.delete("/:id", checkAdminAuthentication, (req, res) => {
    deleteProduct(req.params.id).then(result => {
        res.send(result);
    })
})
route.get("/:id", (req, res) => {
    getProductByProductId(req.params.id).then(result => {
        res.send(result);
    })
})
route.get("/", (req, res) => {
    getProducts().then(result => {
        res.send(result);
    })
})

route.post("/:id/thumb-image", checkAdminAuthentication, upload.single("thumb"), (req, res) => {
    uploadProductImages(req.file?.path ?? "", req.params.id, "thumb").then(result => {
        res.send(result);
    })
})
route.post("/:id/product-images", checkAdminAuthentication, upload.array("images"), async (req, res) => {
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    for (let i = 0; i < files.length; i++) {
        let item = files[i];
        const v = await uploadProductImages(item.path, req.params.id, "image");
        if (v.status === false) {
            return res.status(400).send(v);
        }

    }
    return res.status(200).send({ status: true, message: "File uploaded successfully!" })
});

route.get("/:id/products-by-category", (req, res) => {
    getProductByCategoryId(req.params.id).then(result => res.send(result))
})

export default route;