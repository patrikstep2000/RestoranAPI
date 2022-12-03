import { TABLES } from "../constants/Tables";
import db from "../knexfile";
import { MealType } from "../models/Meal";
import IngredientRepo from "./IngredientRepo";

class MenuRepo{
    public static getMealsByRestaurantId = async (id:string): Promise<MealType[]> => {
        return db(TABLES.MEAL + " as m").select({
            ID:"m.ID",
            Name:"m.Name",
            Price:"m.Price",
            Size:"m.Size"
        })
        .join("RestaurantMeal as mr", "mr.MealID", "=", "m.ID")
        .where("mr.RestaurantID", id)
        .then((data:any[]) => {
            return Promise.all(data.map(async m => {
                return {
                    ID:m.ID,
                    Name:m.Name,
                    Price:m.Price,
                    Size:m.Size,
                    Ingredients: await IngredientRepo.getIngredientsByMealId(m.ID)
                }
            }))
        })
    }
}

export default MenuRepo;