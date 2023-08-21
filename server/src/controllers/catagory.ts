import categoryInterface from "../interfaces/catagoryInterface";
import CategoryModel from "../schemas/category";
import ProductModel from "../schemas/product";
export const createCategory = async (name: string | null, logo: string | null): Promise<{ status: boolean, message: string, category?: categoryInterface }> => {
    try {
        if (!name) {
            return ({ status: false, message: 'Name is required' });
        }
        // Check if logo is uploaded
        if (!logo) {
            return ({ status: false, message: 'Logo is required' });
        }
        // Create a new category
        const category = new CategoryModel({
            name,
            logo,
        });
        // Save the category
        await category.save();
        return ({ status: true, message: 'Category created successfully', category });
    } catch (error) {
        return ({ status: false, message: 'Failed to create category' });
    }
}




export const deleteCategoryById = async (categoryId: string | null): Promise<{ status: boolean, message: string }> => {
    try {
        if (!categoryId) {
            return { status: false, message: "Categoryid is required" }
        }
        await CategoryModel.deleteOne({ _id: categoryId });
        await ProductModel.deleteMany({ categoryId: categoryId })
        return { status: true, message: "Category deleted successfully" }
    }
    catch (err) {
        return { status: false, message: "Failed to delete category" }
    }

}

export const getCategoryById = async (categoryId: string): Promise<{ status: boolean, message: string, category?: categoryInterface }> => {
    try {
        const category: categoryInterface | null = await CategoryModel.findById(categoryId);
        if (!category) {
            return { status: false, message: "Category doesn't exists", category: undefined };
        }
        return { status: true, message: "Category retrived successfully", category };
    } catch (error) {
        return { status: false, message: "Failed to retrive category", category: undefined };
    }
}

export const getAllCategories = async (): Promise<{ status: boolean, message: string, categories: categoryInterface[] }> => {
    try {
        const categories: categoryInterface[] = await CategoryModel.find();
        return { status: true, message: "Categories retrived successfully", categories };
    }
    catch (err) {
        return { status: false, message: "Categories retrived failed", categories: [] }
    }
}

export const updateCategory = async (categoryId: string, name?: string, logo?: string): Promise<{ status: boolean, message: string }> => {
    try {
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return { status: false, message: "Category not found!" };
        }
        if (name) {
            category.name = name;
        }
        if (logo) {
            category.logo = logo;
        }
        await category.save();
        return { status: true, message: "Category updated successfully" }

    } catch (err) {
        return { status: false, message: "Failed to update category" };
    }
}