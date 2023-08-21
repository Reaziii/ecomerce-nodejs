import ProductModel from "../schemas/product";
import productInterface from "../interfaces/productInterfaces";
import CategoryModel from "../schemas/category";
import { deleteProductImageByProductId, getProductThumb, uploadProductImages } from "./productsImage";
import productImageInterface from "../interfaces/productImage";
import ProductImageModel from "../schemas/productImage";
import categoryInterface from "../interfaces/catagoryInterface";

export const createNewProduct = async (name?: string, price?: number, description?: string, categoryId?: string, files?: string[]): Promise<{ status: boolean, message: string, product?: productInterface, images?: productImageInterface[] }> => {
    try {
        // Create a new product
        if (!name || !price || !description || !categoryId) {
            console.log(name, price, description, categoryId);
            return { status: false, message: "All the fields required" };
        }

        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return { status: false, message: "Category doesn't exists" };
        }
        const product: productInterface = new ProductModel({
            name,
            price,
            description,
            categoryId,
        });
        // Save the product
        await product.save();
        const images: productImageInterface[] = [];
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const temp = await uploadProductImages(files[i], product._id, i === 0 ? "thumb" : "image");
                if (temp.image) images.push(temp.image);
            }
        }

        return { status: true, message: "Product created successfully", product, images };
    } catch (error) {
        return { status: false, message: "Failed to create product" };;
    }
};

export const deleteProduct = async (productId: string): Promise<{ status: boolean, message: string }> => {
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return { status: false, message: "Product doesn't exists" };
        }
        await ProductModel.deleteOne({ _id: productId });
        const v = await deleteProductImageByProductId(productId);
        if (!v.status) throw "";

        return { status: true, message: "Product deleted successfully" };
    }
    catch (err) {
        return { status: false, message: "Failed to delete product" };
    }
}

export const getProductByProductId = async (productId: string): Promise<{ status: boolean, message: string, product?: productInterface, images?: productImageInterface[], category?: categoryInterface | null }> => {
    try {
        const product: productInterface | null = await ProductModel.findById(productId);
        const images: productImageInterface[] | null = await ProductImageModel.find({ productId });
        const category: categoryInterface | null = await CategoryModel.findById(product?.categoryId);
        if (!product) {
            return { status: false, message: "Product doesn't exists" };
        }
        return { status: true, message: "Product retrived successfully", product, images, category };
    } catch (err) {
        return { status: false, message: "Failed to retrived product" };
    }
}

export const getProducts = async (): Promise<{ status: boolean, message: string, products?: { product?: productInterface, images: productImageInterface[] }[] }> => {
    try {
        const product: productInterface[] = await ProductModel.find();
        const products: { product?: productInterface, images: productImageInterface[] }[] = [];
        for (let i = 0; i < product.length; i++) {
            const images = await ProductImageModel.find({ productId: product[i]._id });
            products.push({
                product: product[i],
                images,
            })
        }
        return { status: true, message: "Products retrived successfully", products };
    } catch (err) {
        return { status: false, message: "Failed to retrived product" };
    }
}


export const getProductByCategoryId = async (categoryId: string): Promise<{ status: boolean, message: string, products?: { product: productInterface, thumb: productImageInterface | null }[] }> => {
    try {
        const products: productInterface[] = await ProductModel.find({ categoryId });
        const productList: { product: productInterface, thumb: productImageInterface | null }[] = [];
        for (let i = 0; i < products.length; i++) {
            const thumb: productImageInterface | null = await getProductThumb(products[i]._id);
            productList.push({
                thumb,
                product: products[i]
            })
        }
        return { status: true, message: "Products retrieved successfully", products: productList };
    }
    catch (err) {
        return { status: false, message: "Failed to retrived products" }
    }
}

