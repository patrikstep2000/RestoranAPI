export type MealType={
    ID:number,
    Name:string,
    Price:number,
    Size:number,
    Ingredients:IngredientType[]
}

export type IngredientType={
    ID:number,
    Name:string
}