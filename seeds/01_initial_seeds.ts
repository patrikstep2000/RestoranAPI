import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Reservation").del();
    await knex("RestaurantTable").del();
    await knex("RestaurantMeal").del();
    await knex("MealIngredient").del();
    await knex("Meal").del();
    await knex("Ingredient").del();
    await knex("Restaurant").del();
    await knex("User").del();
    await knex("City").del();
    await knex("Country").del();
    await knex("UserRole").del();

    // Inserts seed entries
    await knex("Country").insert([
        { Name: "Hrvatska" },
        { Name: "Srbija" },
        { Name: "BIH" }
    ]);

    await knex("City").insert([
        { Name: "Zagreb", CountryID:1 },
        { Name: "Beograd", CountryID:2 },
        { Name: "Sarajevo", CountryID:3 }
    ]);

    await knex("UserRole").insert([
        { Name: "User" },
        { Name: "Admin" }
    ]);

    await knex("User").insert([
        { FirstName: "Jole", LastName: "Prekrat",  Email:"jole@prekrat.com", Password: "1234", CityID: 3, RoleID: 1 },
        { FirstName: "Zvone", LastName: "Skuren",  Email:"zvone@skuren.com", Password: "1234", CityID: 2, RoleID: 1 },
        { FirstName: "Patrik", LastName: "Step",  Email:"patrik@step.com", Password: "1234", CityID: 1, RoleID: 2 }
    ]);

    await knex("Tag").insert([
        { Name:"Indijski" },
        { Name:"Kineski" },
        { Name:"Japanski" },
        { Name:"Šri Lanka" }
    ]);

    await knex("Restaurant").insert([
        { Name: "Dubravkin put", CityID: 1, Details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", ShortDetails: "Vrhunski restoran bla bla", TagID: 1 },
        { Name: "McDonalds", CityID: 2, Details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", ShortDetails: "Vrhunski restoran bla bla", TagID: 2 },
        { Name: "Kod Zvoneta", CityID: 3, Details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", ShortDetails: "Vrhunski restoran bla bla", TagID: 3}
    ]);

    await knex("Ingredient").insert([
        { Name: "Sol" },
        { Name: "Šećer" },
        { Name: "Kikiriki" }
    ]);

    await knex("Meal").insert([
        { Name: "Biftek u umaku od gljiva", Price: 119.99, Size: 2 },
        { Name: "Piletina s rižom i curry umakom", Price: 69.99, Size: 2 },
        { Name: "Goveđa juha", Price: 29.99, Size: 2 }
    ]);

    await knex("MealIngredient").insert([
        { Amount: 3, MealID: 1, IngredientID: 1 },
        { Amount: 1, MealID: 2, IngredientID: 1 },
        { Amount: 1, MealID: 2, IngredientID: 2 },
        { Amount: 5, MealID: 2, IngredientID: 3 },
        { Amount: 6, MealID: 3, IngredientID: 1 },
        { Amount: 7, MealID: 3, IngredientID: 2 },
    ]);

    await knex("RestaurantMeal").insert([
        { MealID: 1, RestaurantID: 1 },
        { MealID: 1, RestaurantID: 2 },
        { MealID: 2, RestaurantID: 2 },
        { MealID: 2, RestaurantID: 3 },
        { MealID: 3, RestaurantID: 1 },
        { MealID: 3, RestaurantID: 2 }
    ]);

    await knex("RestaurantTable").insert([
        { NumOfChairs: 4, RestaurantID: 1 },
        { NumOfChairs: 6, RestaurantID: 1 },
        { NumOfChairs: 8, RestaurantID: 1 },
        { NumOfChairs: 4, RestaurantID: 2 },
        { NumOfChairs: 4, RestaurantID: 2 },
        { NumOfChairs: 4, RestaurantID: 3 }
    ]);

    await knex("Reservation").insert([
        { ReservationDate: "2022-12-30 00:38:54.840", Confirmed: true, Canceled: false, TableID: 1, UserID: 1 },
        { ReservationDate: "2022-12-30 00:38:54.840", Confirmed: false, Canceled: false, TableID: 2, UserID: 2 },
        { ReservationDate: "2022-12-30 00:38:54.840", Confirmed: true, Canceled: false, TableID: 5, UserID: 1 }
    ]);
};
