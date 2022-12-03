import express from 'express';
import RestaurantController from '../controllers/RestaurantController';


const router = express.Router();

router.get("/restaurants", RestaurantController.getRestaurants);

router.get("/restaurant/:id", RestaurantController.getRestaurantById)

export default router;