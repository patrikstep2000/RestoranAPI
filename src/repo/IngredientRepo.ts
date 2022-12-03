import { TABLES } from "../constants/Tables"
import db from "../knexfile"
import { IngredientType } from "../models/Meal"

class IngredientRepo{
    public static getIngredientsByMealId = async (id:string): Promise<IngredientType[]> => {
        return db(TABLES.INGREDIENT + " as i").select({
            ID:"i.ID",
            Name:"i.Name"
        })
        .join("MealIngredient as mi", "mi.IngredientID", "=", "i.ID")
        .where("mi.MealID", id)
        .then((data:any[]) => {
            return Promise.all(data.map(i => ({
                ID:i.ID,
                Name:i.Name
            })))
        })
    }
}

export default IngredientRepo