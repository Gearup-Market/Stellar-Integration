/* eslint-disable prettier/prettier */
import { Category, Listing, OfferForRent, OfferForSell, SubCategoryDescription } from "../types";
import { Schema, model, Document } from 'mongoose';

const categorySchema = new Schema<Category>({
    type: Map,
    of: String,
});

const subCategoryDescriptionSchema = new Schema<SubCategoryDescription>({
    type: Map,
    of: String,
});

const offerForRentSchema = new Schema<OfferForRent>({
    currency: { type: String, required: true },
    day1Offer: { type: Number, required: true },
    day3Offer: { type: Number, required: true },
    day7Offer: { type: Number, required: true },
    overtimePercentage: { type: Number, required: true },
    totalReplacementValue: { type: Number, required: true },
});

const offerForSellSchema = new Schema<OfferForSell>({
    currency: { type: String, required: true },
    pricing: { type: Number, required: true },
    shipping: {
        shippingOffer: { type: Boolean, required: true },
        offerLocalPickup: { type: Boolean, required: true },
        shippingCosts: { type: Boolean, required: true },
    },
});

const listingSchema = new Schema<Listing>({
    productName: { type: String, required: true },
    category: { type: categorySchema, required: true },
    subCategoryDescription: { type: subCategoryDescriptionSchema, required: true },
    description: { type: String, required: true },
    listingPhotos: { type: [String], required: true },
    listingType: { type: String, enum: ['renting', 'selling', 'both'], required: true },
    gearCondition: {
        type: String,
        enum: ['new', 'like new', 'excellent', 'good', 'well used', 'heavily used', 'for parts'],
        required: true,
    },
    offer: {
        forRent: offerForRentSchema,
        forSell: offerForSellSchema,
        both: { type: Schema.Types.Mixed },
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }

});

const ListingModel = model<Listing>('Listing', listingSchema);

export { ListingModel, Listing };