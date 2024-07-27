/* eslint-disable prettier/prettier */
import { Router } from 'express';
import ListingController from '../controller';
import { Routes } from '@/types';
import validationMiddleware from '@/lib/middlewares/validation.middleware';
import { createListingSchema } from '../validation';

class ListingModule implements Routes {
    public path = '/listings';
    public router = Router();
    public listingController = new ListingController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware({ body: createListingSchema }),
            this.listingController.createListing.bind(this.listingController)

        );
        this.router.get(`${this.path}/listings`, this.listingController.getListings.bind(this.listingController));
        this.router.get(`${this.path}/listings/:id`, this.listingController.getSingleListing.bind(this.listingController));
    }
}

export default ListingModule;
