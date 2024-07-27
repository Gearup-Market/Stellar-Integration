/* eslint-disable prettier/prettier */
import { Listing } from './types';
import { HttpException } from '@/core/exceptions/HttpException';
import { ListingModel } from './models/listing';
import { isEmpty } from '@/core/utils/isEmpty';
import { Types } from 'mongoose';
import { logger } from '@/core/utils/logger';
import { uploadImagesToCloudinary } from '@/shared/utils';
import { sanitize } from '@/shared/utils';
import UserModel from '../../modules/authentication/models/users';

class ListingService {
    private listing = ListingModel;

    public async createListing(listingData: any): Promise<Listing> {
        try {
            if (isEmpty(listingData)) throw new HttpException(400, 'Listing data is required');

            const { productName, category, subCategoryDescription, description, listingType, gearCondition, offer, listingsPhoto, user } = listingData;

            // Sanitize inputs
            const sanitizedProductName = sanitize(productName);
            const sanitizedDescription = sanitize(description);

            // Validate listing type and offer
            if (!['renting', 'selling', 'both'].includes(listingType)) {
                throw new HttpException(400, 'Invalid listing type');
            }

            const uploadedPhotos = await uploadImagesToCloudinary(listingsPhoto);
            // Validate user ID
            if (!Types.ObjectId.isValid(user)) {
                throw new HttpException(400, 'Invalid user ID');
            }

            const userExists = await UserModel.findById(user);
            if (!userExists) {
                throw new HttpException(404, 'User not found');
            }

            const newListing = await this.listing.create({
                listingId: new Types.ObjectId().toString(),
                productName: sanitizedProductName,
                category,
                subCategoryDescription,
                description: sanitizedDescription,
                listingType,
                gearCondition,
                offer,
                listingsPhoto: uploadedPhotos,
            });

            return newListing;
        } catch (error) {
            logger.error(`Error creating listing: ${error.message}`);
            throw new HttpException(500, error.message);
        }
    }


    public async getListings(): Promise<Listing[]> {
        try {
            const listings = await this.listing.find();
            return listings;
        } catch (error) {
            logger.error(`Error retrieving listings: ${error.message}`);
            throw new HttpException(500, error.message);
        }
    }

    public async getSingleListing(listingId: string): Promise<Listing> {
        try {
            if (!Types.ObjectId.isValid(listingId)) {
                throw new HttpException(400, 'Invalid listing ID');
            }

            const listing = await this.listing.findById(listingId);
            if (!listing) {
                throw new HttpException(404, 'Listing not found');
            }

            return listing;
        } catch (error) {
            logger.error(`Error retrieving listing: ${error.message}`);
            throw new HttpException(500, error.message);
        }
    }
}

export default ListingService;
