// nearbyNowRoutes.ts
import express from 'express';
import { recentReviewsHandler } from '../controllers/nearby-now/recentReviewsHandler';
import { googleReviewsHandler } from '../controllers/nearby-now/googleReviewsHandler';
import { serviceAreaMapHandler } from '../controllers/nearby-now/serviceAreaMapHandler';
import { testimonialsHandler } from '../controllers/nearby-now/testimonialHandler';
import { photoGalleryHandler } from '../controllers/nearby-now/photoGalleryHandler';

const router = express.Router();

// Handler for Recent Reviews
router.post('/recent-reviews', recentReviewsHandler);

// Handler for Google Reviews
router.post('/google-reviews', googleReviewsHandler);

// Handler for Service Area Map
router.post('/service-area-map', serviceAreaMapHandler);

// Handler for Testimonials
router.post('/testimonials', testimonialsHandler);

// Handler for Photo Gallery
router.post('/photo-gallery', photoGalleryHandler);

export default router;
