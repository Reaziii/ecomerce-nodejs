import productImageInterface from "../interfaces/productImage";
import productInterface from "../interfaces/productInterfaces";
import ProductModel from "../schemas/product"
import ProductImageModel from "../schemas/productImage";

export const uploadProductImages = async (filePath: string, productId: string, type: "thumb" | "image"): Promise<{ status: boolean, message: string, image?: productImageInterface }> => {
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return { status: false, message: "Product doesn't exists" };
        }
        const image = new ProductImageModel({
            type,
            productId,
            image: filePath,
        });
        await image.save();
        return { status: true, message: "Product Image uploaded successfully", image: image };
    } catch (err) {
        console.log("upload failed", err);
        return { status: false, message: "Failed to upload product image" };
    }

}

export const deleteProductImageByProductId = async (productId: string): Promise<{ status: boolean, message: string }> => {
    try {
        await ProductImageModel.deleteMany({ productId });
        return { status: true, message: "product images deleted" };
    }
    catch (err) {
        return { status: false, message: "Failed to delete product images" };
    }
}


export const getProductThumb = async (productId: string): Promise<productImageInterface | null> => {
    const image: productImageInterface | null = await ProductImageModel.findOne({ productId, type: "thumb" });
    return image;
}