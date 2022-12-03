import { CityType } from "./City"
import { MealType } from "./Meal"
import { TagType } from "./Tag"

export type RestaurantType={
    ID:number,
    Name:string,
    Details:string,
    ShortDetails:string,
    City:CityType,
    Tag:TagType,
    Menu?:MealType[]
}