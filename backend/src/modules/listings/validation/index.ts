/* eslint-disable prettier/prettier */
import Joi from 'joi';

export const createListingSchema = Joi.object({
    productName: Joi.string().required(),
    category: Joi.object({
        main: Joi.string().required(),
        sub: Joi.string().required()
    }).required(),
    subCategoryDescription: Joi.object().required(),
    description: Joi.string().required(),
    listingsPhoto: Joi.array().items(Joi.string().uri()).required(),
    listingType: Joi.string().valid('renting', 'selling', 'both').required(),
    gearCondition: Joi.string().valid('new', 'like new', 'excellent', 'good', 'well used', 'heavily used', 'for parts').required(),
    offer: Joi.alternatives().conditional('listingType', {
        switch: [
            {
                is: 'renting',
                then: Joi.object({
                    currency: Joi.string().required(),
                    '1dayOffer': Joi.number().required(),
                    '3daysOffer': Joi.number().required(),
                    '7daysOffer': Joi.number().required(),
                    overtimePercentage: Joi.number().required(),
                    totalReplacementValue: Joi.number().required()
                }).required()
            },
            {
                is: 'selling',
                then: Joi.object({
                    currency: Joi.string().required(),
                    pricing: Joi.number().required(),
                    shipping: Joi.object({
                        shippingOffer: Joi.boolean().required(),
                        offerLocalPickup: Joi.boolean().required(),
                        shippingCosts: Joi.boolean().required()
                    }).required()
                }).required()
            },
            {
                is: 'both',
                then: Joi.object({
                    forRent: Joi.object({
                        currency: Joi.string().required(),
                        '1dayOffer': Joi.number().required(),
                        '3daysOffer': Joi.number().required(),
                        '7daysOffer': Joi.number().required(),
                        overtimePercentage: Joi.number().required(),
                        totalReplacementValue: Joi.number().required()
                    }).required(),
                    forSell: Joi.object({
                        currency: Joi.string().required(),
                        pricing: Joi.number().required(),
                        shipping: Joi.object({
                            shippingOffer: Joi.boolean().required(),
                            offerLocalPickup: Joi.boolean().required(),
                            shippingCosts: Joi.boolean().required()
                        }).required()
                    }).required()
                }).required()
            }
        ]
    }),
    user: Joi.string().required()

});

