import { Schema, model } from 'mongoose';
import bannerInterface from '../interfaces/banner';



const bannerSchema: Schema = new Schema({
    path: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
});

const BannerModel = model<bannerInterface>('Banner', bannerSchema);

export default BannerModel;