import bannerInterface from "../interfaces/banner"
import BannerModel from "../schemas/banner"

export const addNewBanner = async (filepath: string): Promise<{ status: boolean, message: string, banner?: bannerInterface }> => {

    try {
        const banner: bannerInterface = new BannerModel({
            path: filepath,
        });
        await banner.save();

        return { status: true, message: "Banner created succefully!", banner };
    }
    catch (err) {
        return { status: false, message: "Failed to create banner" };
    }

}

export const deleteBanner = async (id: string): Promise<{ status: boolean, message: string }> => {
    try {
        await BannerModel.deleteOne({ _id: id });
        return { status: true, message: "Banner removed succesfully" };
    }
    catch (err) {
        return { status: false, message: "Failed to delete banner" };
    }
}

export const changeStatusOfBanner = async (id: string): Promise<{ status: boolean, message: string, banner?: bannerInterface }> => {
    try {
        const banner: bannerInterface | null = await BannerModel.findById(id);
        if (!banner) {
            return { status: false, message: "Banner doesn't exists" };
        }
        banner.active = !banner.active;
        await banner.save();
        return { status: true, message: "Status changed successfully", banner };
    } catch (err) {
        return { status: false, message: "Failed to change status" };
    }
}

export const getAllBanners = async (): Promise<{ status: boolean, message: string, banners?: bannerInterface[] }> => {
    try {
        const banners = await BannerModel.find();
        return { status: true, message: "Banners retrived successfully", banners };
    }
    catch (err) {
        return { status: false, message: "Failed to retrive banners" };
    }
}

export const getActiveBanners = async (): Promise<{ status: boolean, message: string, banners?: bannerInterface[] }> => {
    try {
        const banners = await BannerModel.find({ active: true });
        return { status: true, message: "Banners retrived successfully", banners };
    }
    catch (err) {
        return { status: false, message: "Failed to retrive banners" };
    }
}