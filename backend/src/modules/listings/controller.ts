/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import ListingService from './service';
import { logger } from '@/core/utils/logger';

class ListingController {
    private listingService = new ListingService();

    public async createListing(req: Request, res: Response, next: NextFunction) {
        try {
            const listingData = req.body;
            // logger.info('ggs boss')
            const newListing = await this.listingService.createListing(listingData);
            res.status(201).json({ data: newListing, message: 'Listing created successfully' });
        } catch (error) {
            next(error);
        }
    }

    public async getListings(req: Request, res: Response, next: NextFunction) {
        try {
            const listings = await this.listingService.getListings();
            res.status(200).json({ data: listings, message: 'Listings retrieved successfully' });
        } catch (error) {
            next(error);
        }
    }

    public async getSingleListing(req: Request, res: Response, next: NextFunction) {
        try {
            const listingId = req.params.id;
            const listing = await this.listingService.getSingleListing(listingId);
            res.status(200).json({ data: listing, message: 'Listing retrieved successfully' });
        } catch (error) {
            next(error);
        }
    }



}

export default ListingController;
