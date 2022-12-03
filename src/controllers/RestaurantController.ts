import { Request, Response } from "express"
import { RestaurantType } from "../models/Restaurant";
import RestaurantRepo from "../repo/RestaurantRepo";

class RestaurantController{
    public static getRestaurants =  async (req: Request, res: Response) => {
        try{
            const restaurants = await RestaurantRepo.getRestaurants(req);
            res.status(201).json(restaurants);
        }
        catch (e){
            res.status(400).send("DBError(Joletov error)");   
        }
    }

    public static getRestaurantById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const order = await RestaurantRepo.getRestaurantByID(id);
        if (!order) {
            res.status(400).send("DBError(Joletov error)");
        }
        res.status(200).json(order);
    }
}

export default RestaurantController