import crypto from 'crypto';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '@/core/config';

// Cloudinary configuration
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export const uploadImagesToCloudinary = async (images: string[]): Promise<string[]> => {
    const uploadedImages = await Promise.all(images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image, {
            folder: 'listings',
        });
        return result.secure_url;
    }));
    return uploadedImages;
};
export function sanitize(input: any, excludeKeys: string[] = []) {
    if (typeof input === "string") {
        return input.toLowerCase().trim();
    } else if (typeof input === "object" && input !== null) {
        const sanitizedObject: any = {};
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                sanitizedObject[key] = excludeKeys.includes(key) ? input[key] : sanitize(input[key], excludeKeys);
            }
        }
        return sanitizedObject;
    }
    return input;
}

const generateToken = (): { token: string, expiry: Date } => {
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // Token is valid for 1 hour
    return { token, expiry };
};

const isTokenExpired = (expiry: Date): boolean => {
    return new Date() > expiry;
};



export { generateToken, isTokenExpired };