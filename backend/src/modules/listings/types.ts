/* eslint-disable prettier/prettier */
import { Schema, model, Document, Types } from 'mongoose';
export interface Category {
    [key: string]: string;
}

export interface SubCategoryDescription {
    [key: string]: string;
}

export interface OfferForRent {
    currency: string;
    day1Offer: number;
    day3Offer: number;
    day7Offer: number;
    overtimePercentage: number;
    totalReplacementValue: number;
}

export interface OfferForSell {
    currency: string;
    pricing: number;
    shipping: {
        shippingOffer: boolean;
        offerLocalPickup: boolean;
        shippingCosts: boolean;
    };
}

export interface OfferBoth extends OfferForRent, OfferForSell { }

export interface Listing extends Document {
    productName: string;
    category: Category;
    subCategoryDescription: SubCategoryDescription;
    description: string;
    listingPhotos: string[];
    listingType: 'renting' | 'selling' | 'both';
    gearCondition: 'new' | 'like new' | 'excellent' | 'good' | 'well used' | 'heavily used' | 'for parts';
    offer: {
        forRent?: OfferForRent;
        forSell?: OfferForSell;
        both?: OfferBoth;
    };
    user: Types.ObjectId
}
